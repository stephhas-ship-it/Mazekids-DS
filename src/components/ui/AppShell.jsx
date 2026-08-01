/* AppShell.jsx — sidebar (collapsible groups) + top bar. Build once.
   Nav items carry a `permission`; the shell filters them by the current
   role via can() — one system, permission-gated. */
import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Menu as MenuIcon,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { can } from "../../lib/permissions";
import { Avatar } from "./primitives";
import { Drawer } from "./overlays";

function visible(items, role) {
  return items
    .filter((i) => !i.permission || can(role, i.permission))
    .map((i) =>
      i.children ? { ...i, children: visible(i.children, role) } : i,
    );
}

export function AppShell({
  nav,
  role,
  activeHref,
  onNavigate,
  userName,
  userRoleLabel,
  topRight,
  children,
}) {
  const items = visible(nav, role);
  const [open, setOpen] = React.useState({});
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const renderItem = (item, depth = 0) => {
    const hasKids = !!item.children?.length;
    const isOpen = open[item.label] ?? true;
    const active = item.href === activeHref;
    return (
      <li key={item.label}>
        <button
          onClick={() =>
            hasKids
              ? setOpen((p) => ({ ...p, [item.label]: !isOpen }))
              : onNavigate(item.href)
          }
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-input px-3 py-2 text-left text-sm transition-colors",
            depth > 0 && "pl-9",
            active
              ? "bg-primary font-medium text-white"
              : "text-ink-secondary hover:bg-primary-subtle hover:text-primary",
          )}
        >
          {item.icon && <span aria-hidden="true">{item.icon}</span>}
          {!collapsed && <span className="flex-1">{item.label}</span>}
          {!collapsed && hasKids && (
            <span className="opacity-60">
              {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
          )}
        </button>
        {hasKids && isOpen && !collapsed && (
          <ul className="mt-0.5 space-y-0.5">
            {item.children.map((c) => renderItem(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex min-h-screen bg-surface-0">
      {/* Keyboard users skip the whole sidebar/top bar with one Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-control focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      {/* Sidebar */}
      <aside
        className={cn(
          "print:hidden hidden shrink-0 flex-col border-r border-border bg-surface-2 transition-[width] md:flex",
          collapsed ? "w-[64px]" : "w-60",
        )}
      >
        <div className="flex items-center gap-2.5 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-input bg-primary font-display text-lg font-semibold text-white">
            M
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-[15px] font-semibold text-ink">
                MazeKids
              </div>
              <div className="text-[11px] text-ink-muted">{userRoleLabel}</div>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto px-2.5 pb-4" aria-label="Main">
          <ul className="space-y-0.5">{items.map((i) => renderItem(i))}</ul>
        </nav>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="m-2.5 flex items-center gap-2 rounded-input px-3 py-2 text-left text-sm text-ink-muted hover:bg-surface-1 hover:text-ink"
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <PanelLeft size={15} />
          ) : (
            <>
              <PanelLeftClose size={15} /> Collapse
            </>
          )}
        </button>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="print:hidden flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3 md:px-6">
          <button
            className="rounded-control p-1.5 text-ink-secondary hover:bg-surface-1 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <MenuIcon size={18} />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            {topRight}
            <div className="flex items-center gap-2">
              <Avatar name={userName} />
              <div className="leading-tight">
                <div className="text-sm font-medium text-ink">{userName}</div>
                <div className="text-[11px] text-ink-muted">
                  {userRoleLabel}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 px-4 py-5 outline-none md:px-6 md:py-6">
          {children}
        </main>
      </div>

      {/* Mobile navigation drawer */}
      <Drawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        title="Menu"
        width="max-w-[280px]"
      >
        <nav aria-label="Main">
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    onNavigate(item.href);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-input px-3 py-2 text-left text-sm",
                    item.href === activeHref
                      ? "bg-primary font-medium text-white"
                      : "text-ink-secondary hover:bg-primary-subtle hover:text-primary",
                  )}
                >
                  {item.label}
                </button>
                {item.children && (
                  <ul className="space-y-0.5">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <button
                          onClick={() => {
                            onNavigate(c.href);
                            setMobileOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center rounded-input py-2 pl-9 pr-3 text-left text-sm",
                            c.href === activeHref
                              ? "bg-primary font-medium text-white"
                              : "text-ink-secondary hover:bg-primary-subtle hover:text-primary",
                          )}
                        >
                          {c.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
