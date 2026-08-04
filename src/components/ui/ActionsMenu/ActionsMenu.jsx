import * as Menu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{label: string, onSelect: () => void, danger?: boolean}[]} props.items
 * @param {React.ReactNode} [props.trigger]  Defaults to a labelled kebab button
 */
const ActionsMenu = ({ items = [], trigger, ...rest }) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      {trigger ?? (
        <button
          type="button"
          className="rounded-control px-2 py-1 text-border-strong hover:bg-surface-1 hover:text-ink-secondary"
          aria-label="Row actions"
        >
          <MoreHorizontal size={16} />
        </button>
      )}
    </Menu.Trigger>
    <Menu.Portal>
      <Menu.Content
        align="end"
        sideOffset={4}
        className="z-50 min-w-[150px] rounded-input border border-border bg-surface-2 p-1 shadow-popover"
        {...rest}
      >
        {items.map((it) => (
          <Menu.Item
            key={it.label}
            onSelect={it.onSelect}
            className={cn(
              "cursor-pointer select-none rounded-control px-2.5 py-1.5 text-sm outline-none",
              it.danger
                ? "text-danger-fg data-[highlighted]:bg-danger-bg"
                : "text-ink-secondary data-[highlighted]:bg-primary-subtle data-[highlighted]:text-primary",
            )}
          >
            {it.label}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Portal>
  </Menu.Root>
);

export default ActionsMenu;
