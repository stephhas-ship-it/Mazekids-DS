import * as RadixTooltip from "@radix-ui/react-tooltip";

/**
 * @param {object} props
 * @param {React.ReactNode} props.label  Tooltip content
 * @param {React.ReactNode} props.children  The trigger element
 */
const Tooltip = ({ label, children, ...rest }) => (
  <RadixTooltip.Provider delayDuration={250}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={6}
          className="z-50 rounded-control bg-ink px-2.5 py-1 text-xs text-surface-0 shadow-md"
          {...rest}
        >
          {label}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
