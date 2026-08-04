import { Check } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{label: string}[]} props.steps
 * @param {number} props.current  0-based; the parent owns step state
 * @param {(index: number) => void} [props.onStepClick]  Completed steps only
 */
const Stepper = ({ steps = [], current, onStepClick, className = "", ...rest }) => (
  <ol
    className={cn("flex items-center gap-2", className)}
    aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]?.label ?? ""}`}
    {...rest}
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
              clickable ? "cursor-pointer hover:bg-surface-1" : "cursor-default",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                done && "bg-primary text-white",
                active && "bg-primary-subtle text-primary ring-2 ring-primary/40",
                !done &&
                  !active &&
                  "border border-border-strong bg-surface-1 text-ink-muted",
              )}
              aria-hidden="true"
            >
              {done ? <Check size={13} /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden truncate text-sm sm:block",
                active
                  ? "font-medium text-ink"
                  : done
                    ? "text-ink-secondary"
                    : "text-ink-muted",
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

export default Stepper;
