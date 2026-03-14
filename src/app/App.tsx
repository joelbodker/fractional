import { useCallback } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SessionProvider } from "./SessionContext";
import { AppProvider, useApp } from "./AppContext";
import { LogoReveal } from "./components/LogoReveal";

function AppContent() {
  const { showLogoReveal, setShowLogoReveal } = useApp();

  const handleSplashComplete = useCallback(() => {
    setShowLogoReveal(false);
  }, [setShowLogoReveal]);

  if (showLogoReveal) {
    return (
      <LogoReveal
        onComplete={handleSplashComplete}
        onBeginClick={() => {
          sessionStorage.setItem("redirectAfterSplash", "/practice");
          setShowLogoReveal(false);
        }}
      />
    );
  }

  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
