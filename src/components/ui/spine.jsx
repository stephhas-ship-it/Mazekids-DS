/* spine.jsx — StatCard, FilterBar, Tabs, PageHeader. */
import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn";
import { Skeleton } from "./primitives";

/* ---------- StatCard — the canonical KPI anatomy: label, value, delta ---------- */
/* deltaTone defaults to "success" for the common "+X%" case — but a
   delta is not always good news. Pass the tone that matches the meaning:
   "warning" for pending counts, "danger" for overdue/negative moves. */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "success",
  loading,
}) {
  const tones = {
    success: "bg-success-bg text-success-fg",
    warning: "bg-warning-bg text-warning-fg",
    danger: "bg-danger-bg text-danger-fg",
    neutral: "bg-primary-subtle text-primary",
  };
  return (
    <div className="rounded-card border border-border bg-surface-2 p-4">
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
                tones[deltaTone],
              )}
            >
              {delta}
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- FilterBar — composition slot for filters + search ---------- */
export function FilterBar({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2.5 rounded-card border border-border bg-surface-2 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Tabs (Radix) ---------- */
export function Tabs({ tabs, value, onValueChange, children }) {
  return (
    <RadixTabs.Root value={value} onValueChange={onValueChange}>
      <RadixTabs.List className="flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <RadixTabs.Trigger
            key={t.value}
            value={t.value}
            className={cn(
              "relative px-3.5 py-2 text-sm text-ink-muted outline-none transition-colors",
              "hover:text-ink data-[state=active]:font-medium data-[state=active]:text-primary",
              "data-[state=active]:after:absolute data-[state=active]:after:inset-x-1 data-[state=active]:after:-bottom-px",
              "data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary",
            )}
          >
            {t.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}
export function TabPanel({ value, children }) {
  return (
    <RadixTabs.Content value={value} className="pt-4 outline-none">
      {children}
    </RadixTabs.Content>
  );
}

/* ---------- Breadcrumb — standalone; PageHeader composes it ---------- */
export function Breadcrumb({ items, className }) {
  if (!items || items.length === 0) return null;
  return (
    <nav
      className={cn("text-[12.5px] text-ink-muted", className)}
      aria-label="Breadcrumb"
    >
      {items.map((b, i) => (
        <React.Fragment key={b.label}>
          {i > 0 && <span className="mx-1.5">›</span>}
          {b.href ? (
            <a href={b.href} className="hover:text-primary">
              {b.label}
            </a>
          ) : (
            <span className="text-ink-secondary" aria-current="page">
              {b.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ---------- PageHeader — the one canonical pattern ---------- */
export function PageHeader({ icon, breadcrumb, title, subtitle, actions }) {
  return (
    <header className="mb-6">
      <Breadcrumb items={breadcrumb} className="mb-2" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-card bg-primary-subtle text-xl">
              {icon}
            </div>
          )}
          <div>
            <h1 className="font-display text-[26px] font-semibold leading-tight text-ink">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-ink-muted">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
