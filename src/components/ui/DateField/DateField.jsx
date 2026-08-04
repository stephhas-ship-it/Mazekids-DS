import cn from "../../../utils/cn";
import inputClasses from "../Input/inputClasses";
import { formatDate } from "../../../utils/format";

/**
 * @param {object} props
 * @param {string} [props.value]  ISO yyyy-mm-dd, as the native picker expects
 * @param {(value: string) => void} [props.onChange]
 */
// The native picker follows the OS locale, so the dd-mm-yyyy value is echoed
// below it — that format is the product rule regardless of OS.
const DateField = ({ value, onChange, min, max, className = "", ...rest }) => {
  const formatted = value ? formatDate(new Date(`${value}T00:00:00`)) : null;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <input
        type="date"
        value={value ?? ""}
        min={min}
        max={max}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputClasses(false)}
        {...rest}
      />
      {formatted && (
        <span className="text-xs text-ink-muted" aria-hidden="true">
          {formatted}
        </span>
      )}
    </div>
  );
};

export default DateField;
