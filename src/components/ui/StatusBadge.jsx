/* StatusBadge.jsx — the status taxonomy, in code.
   Every app status resolves to one of five tones. Add new statuses to the
   map below; NEVER give a status a new color. This is what keeps billing,
   admissions, staff, and payroll speaking one visual language. */
import { cn } from "../../lib/cn";

const TONE = {
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  neutral: "bg-primary-subtle text-primary",
};

/* Map real product statuses → tone. Extend here as modules grow. */
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

export function StatusBadge({ status }) {
  const tone = STATUS_TONE[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium",
        TONE[tone],
      )}
    >
      {status}
    </span>
  );
}

/* Usage:
   <StatusBadge status="Recorded" />
   <StatusBadge status="Overdue" />
*/
