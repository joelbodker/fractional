import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type AppContextValue = {
  showLogoReveal: boolean;
  setShowLogoReveal: (show: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [showLogoReveal, setShowLogoRevealState] = useState(true);
  const setShowLogoReveal = useCallback((show: boolean) => setShowLogoRevealState(show), []);

  return (
    <AppContext.Provider value={{ showLogoReveal, setShowLogoReveal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
