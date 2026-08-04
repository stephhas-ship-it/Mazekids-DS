import cn from "../../../utils/cn";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";

/**
 * @param {object} props
 * @param {{key: string, header: string, cell: (row: object) => React.ReactNode, sortable?: boolean, numeric?: boolean}[]} props.columns
 * @param {object[]} props.rows
 * @param {(row: object) => string} props.rowKey
 * @param {boolean} [props.stickyHeader]  Pair with a max-height overflow container
 */
const DataTable = ({
  columns,
  rows = [],
  rowKey,
  loading,
  error,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  emptyAction,
  selectable,
  selected,
  onSelectedChange,
  onRowClick,
  sort,
  onSortChange,
  stickyHeader,
  className = "",
  ...rest
}) => {
  const sel = selected ?? new Set();
  const allKeys = rows.map(rowKey);
  const allSelected = rows.length > 0 && allKeys.every((k) => sel.has(k));
  const someSelected = allKeys.some((k) => sel.has(k));

  const toggleAll = () =>
    onSelectedChange?.(allSelected ? new Set() : new Set(allKeys));

  const toggleOne = (k) => {
    const next = new Set(sel);
    if (next.has(k)) next.delete(k);
    else next.add(k);
    onSelectedChange?.(next);
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-2",
        stickyHeader ? "overflow-auto" : "overflow-hidden",
        className,
      )}
      {...rest}
    >
      <table className="w-full border-collapse text-sm">
        <DataTableHeader
          columns={columns}
          selectable={selectable}
          allSelected={allSelected}
          someSelected={someSelected}
          onToggleAll={toggleAll}
          sort={sort}
          onSortChange={onSortChange}
          sticky={stickyHeader}
        />
        <DataTableBody
          columns={columns}
          rows={rows}
          rowKey={rowKey}
          loading={loading}
          error={error}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyAction={emptyAction}
          selectable={selectable}
          selected={sel}
          onToggleOne={toggleOne}
          onRowClick={onRowClick}
        />
      </table>
    </div>
  );
};

export default DataTable;
