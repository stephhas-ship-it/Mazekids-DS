import { Inbox } from "lucide-react";
import cn from "../../../utils/cn";
import { formatRelativeTime } from "../../../utils/format";

const toneDot = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/**
 * @param {object} props
 * @param {{id: string, title: string, description?: string, time: string, read: boolean, tone?: "info"|"success"|"warning"|"danger"}[]} props.notifications
 * @param {(notification: object) => void} [props.onNotificationClick]
 */
const NotificationList = ({
  notifications = [],
  onNotificationClick,
  emptyMessage = "You're all caught up.",
  className = "",
  ...rest
}) => {
  if (notifications.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 px-4 py-10 text-center",
          className,
        )}
        {...rest}
      >
        <Inbox size={20} className="text-ink-muted" aria-hidden="true" />
        <p className="font-accent text-sm text-ink">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={cn("flex flex-col", className)} {...rest}>
      {notifications.map((n) => (
        <li key={n.id}>
          <button
            type="button"
            onClick={() => {
              onNotificationClick?.(n);
              n.onSelect?.(n);
            }}
            className={cn(
              "flex w-full items-start gap-2.5 border-b border-border px-4 py-3 text-left",
              "last:border-b-0 hover:bg-surface-1",
              !n.read && "bg-primary-subtle/40",
            )}
          >
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                n.read ? "bg-transparent" : (toneDot[n.tone] ?? toneDot.info),
              )}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "block truncate text-sm",
                  n.read ? "text-ink-secondary" : "font-medium text-ink",
                )}
              >
                {n.title}
                {!n.read && <span className="sr-only"> (unread)</span>}
              </span>
              {n.description && (
                <span className="mt-0.5 block truncate text-xs text-ink-muted">
                  {n.description}
                </span>
              )}
            </span>
            <span className="mt-0.5 shrink-0 text-[11px] tabular-nums text-ink-muted">
              {formatRelativeTime(n.time)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
