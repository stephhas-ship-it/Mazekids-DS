import * as React from "react";
import { X } from "lucide-react";
import cn from "../../../utils/cn";
import Spinner from "../Spinner/Spinner";
import { listboxClass, optionClass } from "./listboxClasses";

/**
 * @param {object} props
 * @param {(query: string) => Promise<{value: string, label: string, hint?: string}[]>} props.loadOptions
 * @param {{value: string, label: string}|null} [props.value]
 * @param {(option: object|null) => void} [props.onChange]
 * @param {number} [props.delay]  Debounce before loadOptions runs
 */
// Hand-rolled on the WAI-ARIA combobox pattern: Radix Select can't type-ahead
// over hundreds of records.
const Combobox = ({
  loadOptions,
  value,
  onChange,
  placeholder = "Type to search…",
  emptyMessage = "No matches.",
  delay = 250,
  disabled,
  className = "",
  "aria-label": ariaLabel,
  ...rest
}) => {
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
          if (seq !== requestSeq.current) return;
          setOptions(opts ?? []);
          setActiveIndex(opts?.length ? 0 : -1);
        })
        .catch(() => seq === requestSeq.current && setOptions([]))
        .finally(() => seq === requestSeq.current && setLoading(false));
    },
    [loadOptions],
  );

  const handleInput = (e) => {
    setQuery(e.target.value);
    setOpen(true);
    clearTimeout(timer.current);
    const q = e.target.value;
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

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)} {...rest}>
      {value && !open ? (
        <div className="flex h-9 items-center justify-between rounded-input border border-border-strong bg-surface-2 px-3 text-sm text-ink">
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
                className={optionClass(
                  i === activeIndex,
                  value?.value === opt.value,
                )}
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
};

export default Combobox;
