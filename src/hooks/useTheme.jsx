import * as React from "react";

const ThemeCtx = React.createContext(null);

const KEY = "mazekids-theme";

const readInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage blocked (private mode, embedded webview) — fall back to OS
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = React.useState(readInitialTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      // storage blocked — the attribute above still themes this session
    }
  }, [theme]);

  const setTheme = React.useCallback((t) => setThemeState(t), []);
  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

const useTheme = () => {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
};

export default useTheme;
