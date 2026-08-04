import cn from "../../../utils/cn";

const TONE = {
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  neutral: "bg-primary-subtle text-primary",
};

// Extend this map to add a status; never give a status its own colour —
// this map is what keeps billing, admissions and payroll speaking one language.
const STATUS_TONE = {
  Recorded: "success",
  Paid: "success",
  Approved: "success",
  Active: "success",
  Pending: "warning",
  Awaiting: "warning",
  "In review": "info",
  "Under review": "info",
  Overdue: "danger",
  Rejected: "danger",
  Failed: "danger",
  Draft: "neutral",
  Archived: "neutral",
  Inactive: "neutral",
};

/**
 * @param {object} props
 * @param {string} props.status  Key of the status map; unknown values render neutral
 */
const StatusBadge = ({ status, className = "", ...rest }) => {
  const tone = STATUS_TONE[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium",
        TONE[tone],
        className,
      )}
      {...rest}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
