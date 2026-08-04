import cn from "../../../utils/cn";
import Checkbox from "../Checkbox/Checkbox";
import Skeleton from "../Skeleton/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

const cellClass = (c, i, count) =>
  cn(
    "border-b border-border px-3.5 py-4 text-ink-secondary",
    i < count - 1 && "border-r",
    c.numeric && "text-right tabular-nums text-ink",
  );

/**
 * @param {object} props
 * @param {object[]} props.rows
 * @param {(row: object) => string} props.rowKey
 */
const DataTableBody = ({
  columns,
  rows,
  rowKey,
  loading,
  error,
  emptyTitle,
  emptyDescription,
  emptyAction,
  selectable,
  selected,
  onToggleOne,
  onRowClick,
}) => {
  const colCount = columns.length + (selectable ? 1 : 0);

  if (loading) {
    return (
      <tbody>
        {[...Array(4)].map((_, r) => (
          <tr key={r}>
            {selectable && (
              <td className="border-b border-r border-border px-3 py-4">
                <Skeleton className="h-[15px] w-[15px]" />
              </td>
            )}
            {columns.map((c, i) => (
              <td key={c.key} className={cellClass(c, i, columns.length)}>
                <Skeleton className="h-4 w-3/4" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (error || rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={colCount}>
            {error ? (
              <EmptyState title="Couldn't load records" description={error} />
            ) : (
              <EmptyState
                title={emptyTitle}
                description={emptyDescription}
                action={emptyAction}
              />
            )}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => {
        const k = rowKey(row);
        return (
          <tr
            key={k}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onKeyDown={
              onRowClick
                ? (e) => {
                    if (
                      (e.key === "Enter" || e.key === " ") &&
                      e.target === e.currentTarget
                    ) {
                      e.preventDefault();
                      onRowClick(row);
                    }
                  }
                : undefined
            }
            className={cn(
              "group last:[&>td]:border-b-0",
              onRowClick && "cursor-pointer",
              selected.has(k) ? "bg-primary-subtle/60" : "hover:bg-surface-1",
            )}
          >
            {selectable && (
              <td
                className="border-b border-r border-border px-3 py-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selected.has(k)}
                  onCheckedChange={() => onToggleOne(k)}
                  aria-label={`Select row ${k}`}
                />
              </td>
            )}
            {columns.map((c, i) => (
              <td key={c.key} className={cellClass(c, i, columns.length)}>
                {c.cell(row)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default DataTableBody;
