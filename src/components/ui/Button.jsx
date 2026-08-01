/* Button.jsx — the template. Every component follows this shape:
   CVA for variants + sizes, tokens for color, cn() to allow overrides.
   Copy this pattern for StatCard, FilterBar, DataTable, etc. */
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-control transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
    "disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary:
          "bg-surface-2 text-primary border border-border-strong hover:bg-primary-subtle",
        ghost: "bg-transparent text-ink-secondary hover:bg-surface-1",
        danger: "bg-danger text-white hover:brightness-95",
        destructive: "bg-danger text-white hover:brightness-95", // alias of danger
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-9 w-9 p-0", // icon-only (Export ▾, table header actions)
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  loading,
  children,
  disabled,
  ...props
}) {
  if (
    typeof process !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    size === "icon" &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    // Icon-only buttons have no visible text — a label is not optional.
    console.warn(
      'Button: size="icon" requires an aria-label (or aria-labelledby).',
    );
  }
  return (
    <button
      className={cn(button({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

/* Usage:
   <Button>+ Add expense</Button>
   <Button variant="secondary">Export</Button>
   <Button variant="ghost" size="sm">Cancel</Button>
   <Button variant="destructive">Delete expense</Button>
   <Button size="icon" aria-label="Export"><Download size={16} /></Button>
*/
