import * as RadixSwitch from "@radix-ui/react-switch";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {boolean} [props.checked]
 * @param {(checked: boolean) => void} [props.onCheckedChange]
 * @param {string} [props.label]
 */
const Switch = ({
  checked,
  onCheckedChange,
  label,
  disabled,
  id,
  className = "",
  ...rest
}) => (
  <label
    className={cn(
      "inline-flex items-center gap-2.5",
      disabled && "opacity-50",
      className,
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
      {...rest}
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

export default Switch;
