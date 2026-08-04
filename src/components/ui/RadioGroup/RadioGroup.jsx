import * as RadixRadio from "@radix-ui/react-radio-group";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options
 * @param {string} [props.value]
 * @param {(value: string) => void} [props.onValueChange]
 */
const RadioGroup = ({
  value,
  onValueChange,
  options = [],
  disabled,
  className = "",
  ...rest
}) => (
  <RadixRadio.Root
    value={value}
    onValueChange={onValueChange}
    disabled={disabled}
    className={cn("flex flex-col gap-2", className)}
    {...rest}
  >
    {options.map((o) => (
      <label
        key={o.value}
        className="inline-flex cursor-pointer items-center gap-2"
      >
        <RadixRadio.Item
          value={o.value}
          className={cn(
            "h-[15px] w-[15px] rounded-full border-[1.5px] border-border-strong bg-surface-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            "data-[state=checked]:border-primary",
          )}
        >
          <RadixRadio.Indicator className="flex h-full w-full items-center justify-center after:block after:h-[7px] after:w-[7px] after:rounded-full after:bg-primary" />
        </RadixRadio.Item>
        <span className="text-sm text-ink-secondary">{o.label}</span>
      </label>
    ))}
  </RadixRadio.Root>
);

export default RadioGroup;
