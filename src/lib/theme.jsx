/* theme.jsx — light/dark switching: ThemeProvider + useTheme + ThemeToggle. Because every component reads semantic
   tokens, this provider restyles the entire product by setting one
   attribute. Persists the choice; respects OS preference on first load. */
import * as React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeCtx = React.createContext(null);

const KEY = "mazekids-theme";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage unavailable — fall through */
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = React.useCallback((t) => setThemeState(t), []);
  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/* ---------- ThemeToggle — drop into AppShell's topRight slot ---------- */
export function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={
        "flex h-8 w-8 items-center justify-center rounded-control " +
        "text-ink-secondary transition-colors duration-fast " +
        "hover:bg-surface-1 hover:text-ink " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary " +
        className
      }
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
