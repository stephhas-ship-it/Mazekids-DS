import cn from "../../../utils/cn";

// Shared by Combobox and MultiSelect so both popovers sit and highlight alike.
export const listboxClass =
  "absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-input border " +
  "border-border bg-surface-2 py-1 shadow-popover";

export const optionClass = (active, selected) =>
  cn(
    "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
    active ? "bg-primary-subtle text-primary" : "text-ink",
    selected && "font-medium",
  );
