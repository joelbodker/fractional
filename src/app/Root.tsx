import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSession } from "./SessionContext";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const { problems, startSession } = useSession();
  const [isReady, setIsReady] = useState(false);
  // Prevents the re-triggered effect (caused by the navigate below) from
  // hitting the redirect-to-home guard while problems.length is still 0.
  const splashHandledRef = useRef(false);

  useEffect(() => {
    const fromSplash = sessionStorage.getItem("redirectAfterSplash");

    if (fromSplash === "/practice") {
      // Splash flow: mark handled, start session, then navigate so the router
      // (which started at "/") actually moves to "/practice".
      splashHandledRef.current = true;
      sessionStorage.removeItem("redirectAfterSplash");
      startSession();
      navigate("/practice", { replace: true });
      setIsReady(true);
      return;
    }

    // If the navigate above re-triggered this effect, skip the redirect guard.
    if (splashHandledRef.current) {
      setIsReady(true);
      return;
    }

    // Normal flow: guard against deep-links without an active session.
    if (location.pathname !== "/" && problems.length === 0) {
      navigate("/", { replace: true });
    }
    setIsReady(true);
  }, [location.pathname, problems.length, navigate, startSession]);

  if (!isReady) return null;

  return <Outlet />;
}
