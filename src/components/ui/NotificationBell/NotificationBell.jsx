import * as Popover from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import cn from "../../../utils/cn";
import Badge from "../Badge/Badge";
import NotificationList from "../NotificationList/NotificationList";

/**
 * @param {object} props
 * @param {object[]} props.notifications
 * @param {() => void} [props.onMarkAllRead]
 * @param {() => void} [props.onViewAll]
 */
const NotificationBell = ({
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  onViewAll,
  className = "",
  ...rest
}) => {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={
            unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
          }
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-control",
            "text-ink-secondary hover:bg-surface-1 hover:text-ink",
            className,
          )}
          {...rest}
        >
          <Bell size={16} />
          {unread > 0 && (
            <Badge
              count={unread}
              max={9}
              tone="danger"
              className="absolute -right-1 -top-1"
            />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 w-[min(92vw,360px)] overflow-hidden rounded-card border border-border",
            "bg-surface-2 shadow-popover focus:outline-none",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-sm font-medium text-ink">Notifications</span>
            {unread > 0 && onMarkAllRead && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            <NotificationList
              notifications={notifications}
              onNotificationClick={onNotificationClick}
            />
          </div>
          {onViewAll && notifications.length > 0 && (
            <button
              type="button"
              onClick={onViewAll}
              className="w-full border-t border-border px-4 py-2.5 text-center text-xs font-medium text-primary hover:bg-surface-1"
            >
              View all notifications
            </button>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default NotificationBell;
