import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {"info"|"success"|"warning"|"danger"} [props.tone]
 * @param {string} [props.title]
 * @param {React.ReactNode} [props.action]
 */
const Alert = ({
  tone = "info",
  title,
  children,
  action,
  className = "",
  ...rest
}) => {
  const toneClasses = {
    info: "border-info/25 bg-info-bg text-info-fg",
    success: "border-success/25 bg-success-bg text-success-fg",
    warning: "border-warning/25 bg-warning-bg text-warning-fg",
    danger: "border-danger/25 bg-danger-bg text-danger-fg",
  };

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-input border px-4 py-3 text-sm",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        {title && <div className="font-medium">{title}</div>}
        {children && (
          <div className={cn(title && "mt-0.5", "opacity-90")}>{children}</div>
        )}
      </div>
      {action}
    </div>
  );
};

export default Alert;
