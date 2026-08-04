import cn from "../../../utils/cn";
import Input from "../Input/Input";

/**
 * @param {object} props
 * @param {string} [props.from]  ISO yyyy-mm-dd
 * @param {string} [props.to]  ISO yyyy-mm-dd
 * @param {(range: {from?: string, to?: string}) => void} [props.onChange]
 */
const DateRangeField = ({ from, to, onChange, className = "", ...rest }) => (
  <div className={cn("inline-flex items-center gap-2", className)} {...rest}>
    <Input
      type="date"
      value={from ?? ""}
      onChange={(ev) => onChange?.({ from: ev.target.value || undefined, to })}
      aria-label="From date"
      className="w-40"
    />
    <span className="text-sm text-ink-muted">to</span>
    <Input
      type="date"
      value={to ?? ""}
      onChange={(ev) => onChange?.({ from, to: ev.target.value || undefined })}
      aria-label="To date"
      className="w-40"
    />
  </div>
);

export default DateRangeField;
