import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import cn from "../../../utils/cn";
import inputClasses from "../Input/inputClasses";
import useDebounce from "../../../hooks/useDebounce";

/**
 * @param {object} props
 * @param {(query: string) => void} [props.onSearch]  Fires after `delay` ms of quiet
 * @param {(query: string) => void} [props.onChange]  Fires on every keystroke
 * @param {number} [props.delay]
 */
const SearchInput = ({
  placeholder = "Search…",
  defaultValue = "",
  delay = 250,
  onSearch,
  onChange,
  className = "",
  "aria-label": ariaLabel,
  ...rest
}) => {
  const [value, setValue] = React.useState(defaultValue);
  const inputRef = React.useRef(null);
  const debounced = useDebounce(value, delay);
  const lastEmitted = React.useRef(defaultValue);

  React.useEffect(() => {
    if (debounced === lastEmitted.current) return;
    lastEmitted.current = debounced;
    onSearch?.(debounced);
  }, [debounced, onSearch]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  // Clearing is an explicit action, so it skips the debounce entirely.
  const clear = () => {
    setValue("");
    onChange?.("");
    lastEmitted.current = "";
    onSearch?.("");
    inputRef.current?.focus();
  };

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
        {...rest}
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
};

export default SearchInput;
