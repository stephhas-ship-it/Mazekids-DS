/* stepper.jsx — Stepper for multi-step flows (admissions is the canonical
   case: Details → Guardians → Fees → Review). Completed steps are
   clickable to jump back; future steps are not (validate forward, revisit
   freely). Pure display + navigation — the parent owns step state.

   <Stepper
     steps={[{ label: "Details" }, { label: "Guardians" }, { label: "Fees" }]}
     current={1}
     onStepClick={setStep}
   /> */
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export function Stepper({ steps, current, onStepClick, className }) {
  return (
    <ol
      className={cn("flex items-center gap-2", className)}
      aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]?.label ?? ""}`}
    >
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = done && onStepClick;
        return (
          <li key={step.label} className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              disabled={!clickable}
              onClick={clickable ? () => onStepClick(i) : undefined}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-control px-1.5 py-1 text-left",
                clickable && "cursor-pointer hover:bg-surface-1",
                !clickable && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  done && "bg-primary text-white",
                  active && "bg-primary-subtle text-primary ring-2 ring-primary/40",
                  !done && !active && "bg-surface-1 text-ink-muted border border-border-strong",
                )}
                aria-hidden="true"
              >
                {done ? <Check size={13} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden truncate text-sm sm:block",
                  active ? "font-medium text-ink" : done ? "text-ink-secondary" : "text-ink-muted",
                )}
              >
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px min-w-4 flex-1",
                  i < current ? "bg-primary" : "bg-border-strong",
                )}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
