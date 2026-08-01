/* notifications.jsx — NotificationBell (top-bar trigger + popover) and
   NotificationList (the list itself, reusable in a page or Drawer).
   Behavior from Radix Popover; look from tokens.

   Notification shape:
     { id, title, description?, time, read, tone?, onSelect? }
   tone: "info" | "success" | "warning" | "danger" (dot color; default info)

   <NotificationBell
     notifications={items}
     onMarkAllRead={markAll}
     onNotificationClick={(n) => { markRead(n.id); go(n.href); }}
   /> */
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Bell, Inbox } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { Badge } from "./primitives";

const toneDot = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/* ---------- NotificationList — standalone list ---------- */
export function NotificationList({
  notifications = [],
  onNotificationClick,
  emptyMessage = "You're all caught up.",
  className,
}) {
  if (notifications.length === 0) {
    return (
      <div className={cn("flex flex-col items-center gap-2 px-4 py-10 text-center", className)}>
        <Inbox size={20} className="text-ink-muted" aria-hidden="true" />
        <p className="font-accent text-sm text-ink">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <ul className={cn("flex flex-col", className)}>
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
}

/* ---------- NotificationBell — AppShell topRight trigger ---------- */
export function NotificationBell({
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  onViewAll,
  className,
}) {
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
}
