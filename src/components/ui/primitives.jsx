/* primitives.jsx — small shared pieces used across the system. */
import * as React from "react";
import { Sprout } from "lucide-react";
import { cn } from "../../lib/cn";

/* ---------- Avatar — initials on brand-subtle circle ---------- */
export function Avatar({ name, className }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
        "bg-primary-subtle text-xs font-semibold text-primary",
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/* ---------- CategoryTag — fixed categorical palette, 6th+ folds to Other ---------- */
const CATEGORY_VARS = ["--cat-1", "--cat-2", "--cat-3", "--cat-4", "--cat-5"];

/** Assign category colors by stable index (order of creation), never ad hoc. */
export function CategoryTag({ label, index }) {
  const varName =
    index < CATEGORY_VARS.length ? CATEGORY_VARS[index] : "--cat-6";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface-1 px-2.5 py-0.5 text-xs text-ink-secondary">
      <i
        className="h-2 w-2 rounded-full"
        style={{ background: `var(${varName})` }}
        aria-hidden="true"
      />

      {label}
    </span>
  );
}

/* ---------- Skeleton — loading placeholder ---------- */
export function Skeleton({ className }) {
  return (
    <div
      className={cn("animate-pulse rounded-control bg-border/60", className)}
      aria-hidden="true"
    />
  );
}

/* ---------- EmptyState — friendly, on-brand blank slate ---------- */
export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-card bg-primary-subtle text-primary"
        aria-hidden="true"
      >
        <Sprout size={22} />
      </div>
      {/* Fredoka (font-accent): EmptyState is a designated "special
          moment" — the only shipped component that uses the accent face. */}
      <h3 className="font-accent text-lg text-ink">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ---------- Badge — count pill for nav items and tabs ----------
   "Approvals · 3". tone="danger" for overdue counts. Caps display at
   max ("99+") so layouts never break. */
export function Badge({ count, max = 99, tone = "neutral", className }) {
  if (count == null || count <= 0) return null;
  const display = count > max ? `${max}+` : String(count);
  return (
    <span
      className={cn(
        "inline-flex min-w-[18px] items-center justify-center rounded-pill px-1.5",
        "text-[11px] font-semibold leading-[18px] tabular-nums",
        tone === "danger" && "bg-danger-bg text-danger-fg",
        tone === "warning" && "bg-warning-bg text-warning-fg",
        tone === "primary" && "bg-primary text-white",
        tone === "neutral" && "bg-primary-subtle text-primary",
        className,
      )}
    >
      {display}
    </span>
  );
}

/* ---------- Skeleton presets — assembled loading states ----------
   Stop hand-building shimmer layouts per screen. */
export function SkeletonStatCard({ className }) {
  return (
    <div className={cn("rounded-card border border-border bg-surface-2 p-4", className)}>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-2.5 h-7 w-28" />
      <Skeleton className="mt-2 h-3 w-16" />
    </div>
  );
}

export function SkeletonTableRows({ rows = 5, cols = 4, className }) {
  return (
    <div className={cn("flex flex-col", className)} aria-hidden="true">
      {[...Array(rows)].map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-border px-4 py-3.5 last:border-0">
          {[...Array(cols)].map((_, c) => (
            <Skeleton key={c} className={cn("h-3.5", c === 0 ? "w-1/4" : "flex-1")} />
          ))}
        </div>
      ))}
    </div>
  );
}
