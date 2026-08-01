/* layout.jsx — layout primitives, mirroring ADS's Box / Stack / Inline layer.
   These give humans AND AI tools a constrained vocabulary for composition:
   instead of ad-hoc flex divs, screens are built from Stack (vertical),
   Inline (horizontal), and Box (token-managed container).
   Space values map to the 4px scale: 1=4px 2=8px 3=12px 4=16px 6=24px 8=32px. */
import * as React from "react";
import { cn } from "../../lib/cn";

const GAP = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
};
const PAD = {
  0: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  6: "p-6",
  8: "p-8",
};

/* ---------- Stack — vertical flow ---------- */
export function Stack({
  space = 4,
  align,
  className,
  children,
  as: Tag = "div",
}) {
  return (
    <Tag
      className={cn(
        "flex flex-col",
        GAP[space],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- Inline — horizontal flow, wraps by default ---------- */
export function Inline({
  space = 2,
  align = "center",
  justify,
  wrap = true,
  className,
  children,
  as: Tag = "div",
}) {
  return (
    <Tag
      className={cn(
        "flex",
        wrap && "flex-wrap",
        GAP[space],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "baseline" && "items-baseline",
        justify === "start" && "justify-start",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- Box — token-managed container ---------- */
export function Box({
  surface,
  bordered,
  rounded = "card",
  padding = 4,
  className,
  children,
  as: Tag = "div",
}) {
  return (
    <Tag
      className={cn(
        surface === 0 && "bg-surface-0",
        surface === 1 && "bg-surface-1",
        surface === 2 && "bg-surface-2",
        bordered && "border border-border",
        rounded === "control" && "rounded-control",
        rounded === "input" && "rounded-input",
        rounded === "card" && "rounded-card",
        PAD[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- Spinner — standalone loading indicator ---------- */
export function Spinner({ size = 16, className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size }}
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary",
        className,
      )}
    />
  );
}

/* ---------- DescriptionList — detail views (student profile, invoice) ----------
   <DescriptionList
     items={[
       { label: "Vendor", value: "BESCOM" },
       { label: "Amount", value: inr(18500) },
     ]}
     columns={2}
   /> */
export function DescriptionList({ items, columns = 1, className }) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-3",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <dt className="text-xs font-medium text-ink-muted">{item.label}</dt>
          <dd className="text-sm text-ink">{item.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
