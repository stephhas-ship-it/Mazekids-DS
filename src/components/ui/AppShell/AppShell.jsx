import * as React from "react";
import { PanelLeftClose, PanelLeft, Menu as MenuIcon } from "lucide-react";
import cn from "../../../utils/cn";
import Avatar from "../Avatar/Avatar";
import SidebarNav from "./SidebarNav";
import MobileNav from "./MobileNav";
import visibleNav from "./visibleNav";

/**
 * @param {object} props
 * @param {{label: string, href?: string, permission?: string, children?: object[]}[]} props.nav
 * @param {string} props.role  Filters nav through the permission matrix
 * @param {React.ReactNode} [props.topRight]  ThemeToggle, NotificationBell
 */
const AppShell = ({
  nav = [],
  role,
  activeHref,
  onNavigate,
  userName,
  userRoleLabel,
  topRight,
  children,
  ...rest
}) => {
  const items = visibleNav(nav, role);
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-surface-0" {...rest}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-control focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-border bg-surface-2 transition-[width] md:flex print:hidden",
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
          <SidebarNav
            items={items}
            activeHref={activeHref}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
        </nav>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="m-2.5 flex items-center gap-2 rounded-input px-3 py-2 text-left text-sm text-ink-muted hover:bg-surface-1 hover:text-ink"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3 md:px-6 print:hidden">
          <button
            type="button"
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
                <div className="text-[11px] text-ink-muted">{userRoleLabel}</div>
              </div>
            </div>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4 py-5 outline-none md:px-6 md:py-6"
        >
          {children}
        </main>
      </div>

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        items={items}
        activeHref={activeHref}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default AppShell;
