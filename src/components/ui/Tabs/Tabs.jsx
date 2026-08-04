import * as RadixTabs from "@radix-ui/react-tabs";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{value: string, label: string}[]} props.tabs
 * @param {string} props.value
 * @param {(value: string) => void} props.onValueChange
 */
const Tabs = ({ tabs = [], value, onValueChange, children, ...rest }) => (
  <RadixTabs.Root value={value} onValueChange={onValueChange} {...rest}>
    <RadixTabs.List className="flex gap-1 border-b border-border">
      {tabs.map((t) => (
        <RadixTabs.Trigger
          key={t.value}
          value={t.value}
          className={cn(
            "relative px-3.5 py-2 text-sm text-ink-muted outline-none transition-colors",
            "hover:text-ink data-[state=active]:font-medium data-[state=active]:text-primary",
            "data-[state=active]:after:absolute data-[state=active]:after:inset-x-1 data-[state=active]:after:-bottom-px",
            "data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary",
          )}
        >
          {t.label}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
    {children}
  </RadixTabs.Root>
);

export default Tabs;
