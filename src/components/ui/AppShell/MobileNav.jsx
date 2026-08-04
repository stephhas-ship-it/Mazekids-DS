import cn from "../../../utils/cn";
import Drawer from "../Drawer/Drawer";

const linkClass = (active, nested) =>
  cn(
    "flex w-full items-center rounded-input py-2 text-left text-sm",
    nested ? "pl-9 pr-3" : "gap-2.5 px-3",
    active
      ? "bg-primary font-medium text-white"
      : "text-ink-secondary hover:bg-primary-subtle hover:text-primary",
  );

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {object[]} props.items  Already permission-filtered
 */
const MobileNav = ({ open, onOpenChange, items, activeHref, onNavigate }) => {
  const go = (href) => {
    onNavigate(href);
    onOpenChange(false);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title="Menu"
      width="max-w-[280px]"
    >
      <nav aria-label="Main">
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => go(item.href)}
                className={linkClass(item.href === activeHref, false)}
              >
                {item.label}
              </button>
              {item.children && (
                <ul className="space-y-0.5">
                  {item.children.map((c) => (
                    <li key={c.label}>
                      <button
                        type="button"
                        onClick={() => go(c.href)}
                        className={linkClass(c.href === activeHref, true)}
                      >
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
};

export default MobileNav;
