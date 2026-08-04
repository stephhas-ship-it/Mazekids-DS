import cn from "../../../utils/cn";

// Shared by Input, Textarea, Select, SearchInput and DateField so every
// control in the system has one border, height and focus ring.
const inputClasses = (invalid) =>
  cn(
    "h-9 w-full rounded-input border bg-surface-2 px-3 text-sm text-ink",
    "placeholder:text-ink-muted transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-strong",
    "disabled:opacity-50 disabled:bg-surface-1",
    invalid ? "border-danger" : "border-border-strong",
  );

export default inputClasses;
