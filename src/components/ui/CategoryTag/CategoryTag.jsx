import cn from "../../../utils/cn";

const CATEGORY_VARS = ["--cat-1", "--cat-2", "--cat-3", "--cat-4", "--cat-5"];

/**
 * @param {object} props
 * @param {string} props.label
 * @param {number} props.index  Stable creation-order index; 6th+ folds to the "other" colour
 */
const CategoryTag = ({ label, index = 0, className = "", ...rest }) => {
  const varName =
    index >= 0 && index < CATEGORY_VARS.length
      ? CATEGORY_VARS[index]
      : "--cat-6";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface-1 px-2.5 py-0.5 text-xs text-ink-secondary",
        className,
      )}
      {...rest}
    >
      <i
        className="h-2 w-2 rounded-full"
        style={{ background: `var(${varName})` }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
};

export default CategoryTag;
