import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {number} props.selectedCount  Nothing renders at 0
 * @param {number} [props.totalCount]  Enables the "select all N records" offer
 * @param {() => void} [props.onSelectAllPages]
 * @param {() => void} [props.onClear]
 */
const BulkActionsBar = ({
  selectedCount,
  totalCount,
  onSelectAllPages,
  onClear,
  children,
  className = "",
  ...rest
}) => {
  if (!selectedCount) return null;

  const partial =
    totalCount != null && onSelectAllPages && selectedCount < totalCount;

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-input border border-border",
        "bg-primary-subtle px-4 py-2.5 text-sm text-ink",
        className,
      )}
      {...rest}
    >
      <span className="font-medium tabular-nums">{selectedCount} selected</span>
      {partial && (
        <button
          type="button"
          onClick={onSelectAllPages}
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Select all {totalCount} records
        </button>
      )}
      <div className="ml-auto flex items-center gap-2">
        {children}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-control px-2 py-1 text-ink-muted hover:bg-surface-2 hover:text-ink"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;
