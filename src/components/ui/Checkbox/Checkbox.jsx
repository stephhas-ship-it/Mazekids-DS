import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {boolean|"indeterminate"} [props.checked]
 * @param {(checked: boolean) => void} [props.onCheckedChange]
 * @param {string} [props.label]
 */
const Checkbox = ({
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
      "inline-flex items-center gap-2",
      disabled && "opacity-50",
      className,
    )}
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
      {...rest}
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

export default Checkbox;
