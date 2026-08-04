import * as React from "react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {"primary"|"secondary"|"ghost"|"danger"|"destructive"} [props.variant]
 * @param {"sm"|"md"|"lg"|"icon"} [props.size]
 * @param {boolean} [props.loading]  Shows spinner, keeps label (no layout shift)
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...rest
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-control transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary:
      "bg-surface-2 text-primary border border-border-strong hover:bg-primary-subtle",
    ghost: "bg-transparent text-ink-secondary hover:bg-surface-1",
    danger: "bg-danger text-white hover:brightness-95",
    destructive: "bg-danger text-white hover:brightness-95",
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-5 text-base",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
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
};

export default Button;
