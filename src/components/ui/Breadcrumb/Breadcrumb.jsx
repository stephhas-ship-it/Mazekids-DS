import * as React from "react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{label: string, href?: string}[]} props.items  The last item is the current page
 */
const Breadcrumb = ({ items, className = "", ...rest }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      className={cn("text-[12.5px] text-ink-muted", className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {items.map((b, i) => (
        <React.Fragment key={b.label}>
          {i > 0 && <span className="mx-1.5">›</span>}
          {b.href ? (
            <a href={b.href} className="hover:text-primary">
              {b.label}
            </a>
          ) : (
            <span className="text-ink-secondary" aria-current="page">
              {b.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
