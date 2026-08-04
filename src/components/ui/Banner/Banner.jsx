import { X } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {"info"|"success"|"warning"|"danger"|"neutral"} [props.tone]
 * @param {() => void} [props.onDismiss]  Renders the dismiss button when given
 */
// Page-level: sits above PageHeader and announces a page- or org-wide
// condition. Alert is the inline, contextual, block-level sibling.
const Banner = ({
  tone = "info",
  children,
  action,
  onDismiss,
  className = "",
  ...rest
}) => {
  const toneClasses = {
    info: "bg-info-bg text-info-fg border-info/30",
    warning: "bg-warning-bg text-warning-fg border-warning/30",
    danger: "bg-danger-bg text-danger-fg border-danger/30",
    success: "bg-success-bg text-success-fg border-success/30",
    neutral: "bg-primary-subtle text-primary border-border",
  };

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex items-center gap-3 rounded-input border px-4 py-2.5 text-sm",
        toneClasses[tone] ?? toneClasses.info,
        className,
      )}
      {...rest}
    >
      <div className="min-w-0 flex-1 [&_a]:font-medium [&_a]:underline">
        {children}
      </div>
      {action}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notice"
          className="shrink-0 rounded-control p-1 opacity-70 hover:bg-ink/10 hover:opacity-100"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default Banner;
