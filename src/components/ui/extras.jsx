/* extras.jsx — components the audit surfaced as missing against the
   prototype: ProgressBar (Program Distribution), Switch + RadioGroup
   (Settings screens), Alert (inline banners/callouts). */
import * as React from "react";
import { X } from "lucide-react";
import * as RadixSwitch from "@radix-ui/react-switch";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";
import { Input } from "./form";

/* ---------- ProgressBar — used by Program Distribution and any % metric ---------- */
export function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  catIndex = 0,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const varName =
    catIndex >= 0 && catIndex < 5 ? `--cat-${catIndex + 1}` : "--cat-6";
  return (
    <div>
      {(label || valueLabel) && (
        <div className="mb-1 flex items-baseline justify-between text-sm">
          <span className="text-ink-secondary">{label}</span>
          <span className="tabular-nums font-medium text-ink">
            {valueLabel ?? value}
          </span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-1 border border-border"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-pill transition-[width]"
          style={{ width: `${pct}%`, background: `var(${varName})` }}
        />
      </div>
    </div>
  );
}

/* ---------- Switch (Radix) — settings toggles ---------- */
export function Switch({ checked, onCheckedChange, label, disabled, id }) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5",
        disabled && "opacity-50",
      )}
    >
      <RadixSwitch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "h-5 w-9 rounded-pill border border-border-strong bg-surface-1 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        )}
      >
        <RadixSwitch.Thumb
          className={cn(
            "block h-4 w-4 translate-x-0.5 rounded-full bg-[var(--white)] shadow-sm transition-transform",
            "data-[state=checked]:translate-x-[18px]",
          )}
        />
      </RadixSwitch.Root>
      {label && <span className="text-sm text-ink-secondary">{label}</span>}
    </label>
  );
}

/* ---------- RadioGroup (Radix) ---------- */
export function RadioGroup({
  value,
  onValueChange,
  options,
  disabled,
  className,
}) {
  return (
    <RadixRadio.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={cn("flex flex-col gap-2", className)}
    >
      {options.map((o) => (
        <label
          key={o.value}
          className="inline-flex cursor-pointer items-center gap-2"
        >
          <RadixRadio.Item
            value={o.value}
            className={cn(
              "h-[15px] w-[15px] rounded-full border-[1.5px] border-border-strong bg-surface-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              "data-[state=checked]:border-primary",
            )}
          >
            <RadixRadio.Indicator className="flex h-full w-full items-center justify-center after:block after:h-[7px] after:w-[7px] after:rounded-full after:bg-primary" />
          </RadixRadio.Item>
          <span className="text-sm text-ink-secondary">{o.label}</span>
        </label>
      ))}
    </RadixRadio.Root>
  );
}

/* ---------- Alert — inline banner using the status taxonomy ---------- */
export function Alert({ tone = "info", title, children, action }) {
  const tones = {
    info: "border-info/25 bg-info-bg text-info-fg",
    success: "border-success/25 bg-success-bg text-success-fg",
    warning: "border-warning/25 bg-warning-bg text-warning-fg",
    danger: "border-danger/25 bg-danger-bg text-danger-fg",
  };
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3 rounded-input border px-4 py-3 text-sm",
        tones[tone],
      )}
    >
      <div className="min-w-0 flex-1">
        {title && <div className="font-medium">{title}</div>}
        {children && (
          <div className={cn(title && "mt-0.5", "opacity-90")}>{children}</div>
        )}
      </div>
      {action}
    </div>
  );
}

/* ---------- DateRangeField — composed from native date inputs.
   Upgrade to a popover calendar only when a second screen demands it. */
export function DateRangeField({ from, to, onChange, className }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Input
        type="date"
        value={from ?? ""}
        onChange={(ev) =>
          onChange?.({ from: ev.target.value || undefined, to })
        }
        aria-label="From date"
        className="w-40"
      />

      <span className="text-sm text-ink-muted">to</span>
      <Input
        type="date"
        value={to ?? ""}
        onChange={(ev) =>
          onChange?.({ from, to: ev.target.value || undefined })
        }
        aria-label="To date"
        className="w-40"
      />
    </div>
  );
}

/* ---------- Banner — page-level persistent notice ----------
   Sits at the top of a page's content area, full width, above PageHeader.
   Unlike Alert (inline, block-level, contextual), a Banner announces a
   page- or org-wide condition and can be dismissible.
   <Banner tone="warning" onDismiss={hide}>
     Fee structure changes on 1 April. <a href="/fees">Review changes</a>
   </Banner> */
const bannerTones = {
  info: "bg-info-bg text-info-fg border-info/30",
  warning: "bg-warning-bg text-warning-fg border-warning/30",
  danger: "bg-danger-bg text-danger-fg border-danger/30",
  success: "bg-success-bg text-success-fg border-success/30",
  neutral: "bg-primary-subtle text-primary border-border",
};

export function Banner({ tone = "info", children, action, onDismiss, className }) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex items-center gap-3 rounded-input border px-4 py-2.5 text-sm",
        bannerTones[tone] ?? bannerTones.info,
        className,
      )}
    >
      <div className="min-w-0 flex-1 [&_a]:font-medium [&_a]:underline">
        {children}
      </div>
      {action}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notice"
          className="shrink-0 rounded-control p-1 opacity-70 hover:bg-ink/10 hover:opacity-100"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
