import { Sun, Moon } from "lucide-react";
import cn from "../../../utils/cn";
import useTheme from "../../../hooks/useTheme";

/**
 * @param {object} props
 * @param {string} [props.className]  Drop into AppShell's topRight slot
 */
const ThemeToggle = ({ className = "", ...rest }) => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-control",
        "text-ink-secondary transition-colors duration-fast",
        "hover:bg-surface-1 hover:text-ink",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
        className,
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      {...rest}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
