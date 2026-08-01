/* form.jsx — inputs and fields. Every control ships with label, help,
   error, and disabled states (definition of done). Radix supplies
   Select/Checkbox behaviour; tokens supply the look. */
import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { ChevronDown, Check, Minus, Search as SearchIcon, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatDate } from "../../lib/format";

/* ---------- Field wrapper: label + control + help/error ----------
   A11y contract: Field owns the wiring. It clones its (single-element)
   child control with `id`, `aria-invalid`, and `aria-describedby`
   pointing at the error/help text, so screen readers announce the
   message WITH the input, not detached from it. */
export function Field({ label, htmlFor, error, help, required, children }) {
  const autoId = React.useId();
  const controlId = htmlFor ?? `${autoId}-control`;
  const messageId = `${autoId}-message`;
  const hasMessage = Boolean(error || help);

  const control =
    React.isValidElement(children) && !Array.isArray(children)
      ? React.cloneElement(children, {
          id: children.props.id ?? controlId,
          "aria-invalid": error ? true : children.props["aria-invalid"],
          "aria-describedby":
            [children.props["aria-describedby"], hasMessage ? messageId : null]
              .filter(Boolean)
              .join(" ") || undefined,
        })
      : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={controlId} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {control}
      {error ? (
        <p id={messageId} className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      ) : help ? (
        <p id={messageId} className="text-xs text-ink-muted">
          {help}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Input ---------- */
const inputClasses = (invalid) =>
  cn(
    "h-9 w-full rounded-input border bg-surface-2 px-3 text-sm text-ink",
    "placeholder:text-ink-muted transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-strong",
    "disabled:opacity-50 disabled:bg-surface-1",
    invalid ? "border-danger" : "border-border-strong",
  );

export const Input = React.forwardRef(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputClasses(invalid), className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

/* ---------- Textarea ---------- */
export const Textarea = React.forwardRef(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        inputClasses(invalid),
        "h-auto min-h-[88px] py-2",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

/* ---------- Select (Radix) ---------- */
export function Select({
  value,
  onValueChange,
  placeholder,
  options,
  disabled,
  invalid,
  className,
}) {
  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        className={cn(
          inputClasses(invalid),
          "inline-flex items-center justify-between gap-2 data-[placeholder]:text-ink-muted",
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-ink-muted">
          <ChevronDown size={14} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-input border border-border bg-surface-2 shadow-popover"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className={cn(
                  "flex cursor-pointer select-none items-center rounded-control px-2.5 py-1.5 text-sm text-ink-secondary outline-none",
                  "data-[highlighted]:bg-primary-subtle data-[highlighted]:text-primary",
                  "data-[state=checked]:font-medium data-[state=checked]:text-primary",
                )}
              >
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

/* ---------- Checkbox (Radix) ---------- */
export function Checkbox({ checked, onCheckedChange, label, disabled, id }) {
  return (
    <label
      className={cn("inline-flex items-center gap-2", disabled && "opacity-50")}
    >
      <RadixCheckbox.Root
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(c) => onCheckedChange?.(c === true)}
        className={cn(
          "flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border-[1.5px] border-border-strong bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
          "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        )}
      >
        <RadixCheckbox.Indicator className="text-white">
          {checked === "indeterminate" ? (
            <Minus size={10} strokeWidth={3} />
          ) : (
            <Check size={10} strokeWidth={3} />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && <span className="text-sm text-ink-secondary">{label}</span>}
    </label>
  );
}

/* ---------- SearchInput — debounced list-screen search ----------
   <SearchInput placeholder="Search students…" onSearch={setQuery} />
   onSearch fires after `delay` ms of quiet; onChange (if given) fires
   every keystroke. Clear button resets and refocuses. */
export function SearchInput({
  placeholder = "Search…",
  defaultValue = "",
  delay = 250,
  onSearch,
  onChange,
  className,
  "aria-label": ariaLabel,
  ...props
}) {
  const [value, setValue] = React.useState(defaultValue);
  const inputRef = React.useRef(null);
  const timer = React.useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onChange?.(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch?.(v), delay);
  };
  const clear = () => {
    setValue("");
    onChange?.("");
    clearTimeout(timer.current);
    onSearch?.("");
    inputRef.current?.focus();
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={cn(inputClasses(false), "pl-9", value && "pr-8")}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-control p-1 text-ink-muted hover:bg-surface-1 hover:text-ink"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

/* ---------- DateField — single date, dd-mm-yyyy display rule ----------
   Native picker for input (reliable on mobile); the formatted value is
   echoed below the control so what users SEE follows the format spec
   even where the OS picker doesn't. Pairs with DateRangeField. */
export function DateField({ value, onChange, min, max, className, ...props }) {
  // Uses the system formatter (lib/format.js) — the dd-mm-yyyy rule
  // this component exists to enforce.
  const formatted = value ? formatDate(new Date(value + "T00:00:00")) : null;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <input
        type="date"
        value={value ?? ""}
        min={min}
        max={max}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputClasses(false)}
        {...props}
      />
      {formatted && (
        <span className="text-xs text-ink-muted" aria-hidden="true">
          {formatted}
        </span>
      )}
    </div>
  );
}
