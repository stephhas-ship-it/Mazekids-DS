import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import cn from "../../../utils/cn";
import inputClasses from "../Input/inputClasses";

/**
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options
 * @param {string} [props.value]
 * @param {(value: string) => void} [props.onValueChange]
 * @param {boolean} [props.invalid]
 */
const Select = ({
  value,
  onValueChange,
  placeholder,
  options = [],
  disabled,
  invalid,
  className = "",
  ...rest
}) => (
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
      {...rest}
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

export default Select;
