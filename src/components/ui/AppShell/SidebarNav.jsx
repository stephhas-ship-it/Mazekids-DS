import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{label: string, href?: string, icon?: React.ReactNode, children?: object[]}[]} props.items
 * @param {string} props.activeHref
 * @param {boolean} [props.collapsed]  Hides labels, keeps icons
 */
const SidebarNav = ({ items, activeHref, onNavigate, collapsed }) => {
  const [open, setOpen] = React.useState({});

  const renderItem = (item, depth = 0) => {
    const hasKids = Boolean(item.children?.length);
    const isOpen = open[item.label] ?? true;
    const active = item.href === activeHref;

    return (
      <li key={item.label}>
        <button
          type="button"
          onClick={() =>
            hasKids
              ? setOpen((p) => ({ ...p, [item.label]: !isOpen }))
              : onNavigate(item.href)
          }
          aria-current={active ? "page" : undefined}
          aria-expanded={hasKids ? isOpen : undefined}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-input px-3 py-2 text-left text-sm transition-colors",
            depth > 0 && "pl-9",
            active
              ? "bg-primary font-medium text-white"
              : "text-ink-secondary hover:bg-primary-subtle hover:text-primary",
          )}
        >
          {item.icon && <span aria-hidden="true">{item.icon}</span>}
          {!collapsed && <span className="flex-1">{item.label}</span>}
          {!collapsed && hasKids && (
            <span className="opacity-60" aria-hidden="true">
              {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
          )}
        </button>
        {hasKids && isOpen && !collapsed && (
          <ul className="mt-0.5 space-y-0.5">
            {item.children.map((c) => renderItem(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return <ul className="space-y-0.5">{items.map((i) => renderItem(i))}</ul>;
};

export default SidebarNav;
