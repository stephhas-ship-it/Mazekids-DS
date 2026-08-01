/* combobox.jsx — Combobox (async type-ahead) + MultiSelect (tag chips).
   For picking a student / parent / vendor out of hundreds of records —
   the case Radix Select can't cover. Hand-rolled on the WAI-ARIA
   combobox pattern; look from tokens.

   Combobox:
     <Combobox
       loadOptions={async (q) => searchStudents(q)}  // -> [{value,label,hint?}]
       value={student} onChange={setStudent}
       placeholder="Search students…"
     />
   MultiSelect:
     <MultiSelect options={BATCHES} value={ids} onChange={setIds} /> */
import * as React from "react";
import { ChevronsUpDown, X, Check } from "lucide-react";
import { cn } from "../../lib/cn";
import { Spinner } from "./layout";

const listboxClass =
  "absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-input border " +
  "border-border bg-surface-2 py-1 shadow-popover";
const optionClass = (active, selected) =>
  cn(
    "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
    active ? "bg-primary-subtle text-primary" : "text-ink",
    selected && "font-medium",
  );

/* ---------- Combobox (async autocomplete, single value) ---------- */
export function Combobox({
  loadOptions, // async (query) => options; debounced internally
  value, // {value,label} | null
  onChange,
  placeholder = "Type to search…",
  emptyMessage = "No matches.",
  delay = 250,
  disabled,
  className,
  "aria-label": ariaLabel,
}) {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const timer = React.useRef(null);
  const requestSeq = React.useRef(0);
  const id = React.useId();

  const runSearch = React.useCallback(
    (q) => {
      const seq = ++requestSeq.current;
      setLoading(true);
      Promise.resolve(loadOptions(q))
        .then((opts) => {
          if (seq !== requestSeq.current) return; // stale response — drop
          setOptions(opts ?? []);
          setActiveIndex(opts?.length ? 0 : -1);
        })
        .catch(() => seq === requestSeq.current && setOptions([]))
        .finally(() => seq === requestSeq.current && setLoading(false));
    },
    [loadOptions],
  );

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    setOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => runSearch(q), delay);
  };

  const select = (opt) => {
    onChange?.(opt);
    setQuery("");
    setOpen(false);
    setOptions([]);
  };

  const clear = () => {
    onChange?.(null);
    setQuery("");
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      runSearch(query);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open && options[activeIndex]) {
      e.preventDefault();
      select(options[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    const onDoc = (e) =>
      rootRef.current && !rootRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      clearTimeout(timer.current);
    };
  }, []);

  // When reopening over an existing value, put focus in the search box.
  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {value && !open ? (
        <div className="flex h-9 items-center justify-between rounded-input border border-border-strong bg-surface-2 px-3 text-sm text-ink">
          {/* Click the label to search again — the value stays until a
              new option is chosen (or the × clears it). */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setOpen(true);
              runSearch("");
            }}
            className="min-w-0 flex-1 truncate text-left hover:text-primary"
            aria-label={`Change selection: ${value.label}`}
          >
            {value.label}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={disabled}
            aria-label={`Clear selection: ${value.label}`}
            className="ml-2 rounded-control p-0.5 text-ink-muted hover:bg-surface-1 hover:text-ink"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-label={ariaLabel ?? placeholder}
          value={query}
          onChange={handleInput}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className="h-9 w-full rounded-input border border-border-strong bg-surface-2 px-3 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
        />
      )}
      {open && (
        <ul id={`${id}-listbox`} role="listbox" className={listboxClass}>
          {loading ? (
            <li className="flex items-center gap-2 px-3 py-2 text-sm text-ink-muted">
              <Spinner size={13} /> Searching…
            </li>
          ) : options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink-muted">{emptyMessage}</li>
          ) : (
            options.map((opt, i) => (
              <li
                key={opt.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={value?.value === opt.value}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(opt)}
                className={optionClass(i === activeIndex, value?.value === opt.value)}
              >
                <span className="truncate">{opt.label}</span>
                {opt.hint && (
                  <span className="ml-3 shrink-0 text-xs text-ink-muted">
                    {opt.hint}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/* ---------- MultiSelect (static options, tag chips) ---------- */
export function MultiSelect({
  options, // [{value,label}]
  value = [], // array of option values
  onChange,
  placeholder = "Select…",
  disabled,
  className,
  "aria-label": ariaLabel,
}) {
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
    <div ref={rootRef} className={cn("relative", className)}>
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
            // keyboard flow: Backspace pops the last chip
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
        <ul id={`${id}-listbox`} role="listbox" aria-multiselectable="true" className={listboxClass}>
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
                {isSel && <Check size={14} className="text-primary" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
