import * as React from "react";
import { ChevronsUpDown, X, Check } from "lucide-react";
import cn from "../../../utils/cn";
import { listboxClass, optionClass } from "../Combobox/listboxClasses";

/**
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options
 * @param {string[]} [props.value]  Selected option values
 * @param {(values: string[]) => void} [props.onChange]
 */
const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select…",
  disabled,
  className = "",
  "aria-label": ariaLabel,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const id = React.useId();
  const selectedSet = new Set(value);

  const toggle = (v) => {
    const next = new Set(selectedSet);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    onChange?.([...next]);
  };

  const remove = (v) => onChange?.(value.filter((x) => x !== v));

  React.useEffect(() => {
    const onDoc = (e) =>
      rootRef.current && !rootRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selectedOptions = options.filter((o) => selectedSet.has(o.value));

  return (
    <div ref={rootRef} className={cn("relative", className)} {...rest}>
      <div
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-input border",
          "border-border-strong bg-surface-2 px-2 py-1.5 text-sm",
          "focus-within:border-primary",
          disabled && "opacity-50",
        )}
      >
        {selectedOptions.map((o) => (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            onClick={() => remove(o.value)}
            aria-label={`Remove ${o.label}`}
            className="inline-flex items-center gap-1 rounded-pill bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/10"
          >
            {o.label}
            <X size={12} aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && value.length > 0) {
              e.preventDefault();
              remove(value[value.length - 1]);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-label={ariaLabel ?? placeholder}
          className="flex min-w-16 flex-1 items-center justify-between gap-2 px-1 text-left outline-none"
        >
          {selectedOptions.length === 0 && (
            <span className="text-ink-muted">{placeholder}</span>
          )}
          <ChevronsUpDown
            size={14}
            className="ml-auto shrink-0 text-ink-muted"
            aria-hidden="true"
          />
        </button>
      </div>
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-multiselectable="true"
          className={listboxClass}
        >
          {options.map((o) => {
            const isSel = selectedSet.has(o.value);
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={isSel}
                onClick={() => toggle(o.value)}
                className={optionClass(false, isSel)}
              >
                <span className="truncate">{o.label}</span>
                {isSel && (
                  <Check size={14} className="text-primary" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
