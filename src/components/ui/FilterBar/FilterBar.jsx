import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {React.ReactNode} props.children  Filter controls and a SearchInput
 */
const FilterBar = ({ children, className = "", ...rest }) => (
  <div
    className={cn(
      "flex flex-wrap items-center gap-2.5 rounded-card border border-border bg-surface-2 p-3",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

export default FilterBar;
