import cn from "../../../utils/cn";
import Skeleton from "../Skeleton/Skeleton";

/**
 * @param {object} props
 * @param {string} props.label
 * @param {React.ReactNode} props.value
 * @param {string} [props.delta]
 * @param {"success"|"warning"|"danger"|"neutral"} [props.deltaTone]  A delta is not always good news
 */
const StatCard = ({
  label,
  value,
  delta,
  deltaTone = "success",
  loading,
  className = "",
  ...rest
}) => {
  const toneClasses = {
    success: "bg-success-bg text-success-fg",
    warning: "bg-warning-bg text-warning-fg",
    danger: "bg-danger-bg text-danger-fg",
    neutral: "bg-primary-subtle text-primary",
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-2 p-4",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <>
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="mt-2.5 h-7 w-32" />
          <Skeleton className="mt-2.5 h-4 w-14" />
        </>
      ) : (
        <>
          <div className="text-[12.5px] text-ink-muted">{label}</div>
          <div className="mt-0.5 font-display text-2xl font-[900] tabular-nums text-ink">
            {value}
          </div>
          {delta && (
            <span
              className={cn(
                "mt-2 inline-block rounded-pill px-2 py-0.5 text-[11px] font-medium",
                toneClasses[deltaTone],
              )}
            >
              {delta}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;
