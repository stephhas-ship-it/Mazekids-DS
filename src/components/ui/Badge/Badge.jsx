import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {number} props.count  Nothing renders at 0 or null
 * @param {number} [props.max]  Caps the display at "{max}+" so layouts hold
 * @param {"neutral"|"primary"|"warning"|"danger"} [props.tone]
 */
const Badge = ({ count, max = 99, tone = "neutral", className = "", ...rest }) => {
  if (count == null || count <= 0) return null;

  const toneClasses = {
    neutral: "bg-primary-subtle text-primary",
    primary: "bg-primary text-white",
    warning: "bg-warning-bg text-warning-fg",
    danger: "bg-danger-bg text-danger-fg",
  };

  return (
    <span
      className={cn(
        "inline-flex min-w-[18px] items-center justify-center rounded-pill px-1.5",
        "text-[11px] font-semibold leading-[18px] tabular-nums",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {count > max ? `${max}+` : String(count)}
    </span>
  );
};

export default Badge;
