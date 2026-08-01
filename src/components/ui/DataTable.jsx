/* DataTable.jsx — THE workhorse. Carries billing, staff, admissions, payroll.
   Gridded (warm hairlines), comfortable density, bulk-select, right-aligned
   tabular amounts, and built-in loading / empty / error states.

   Generic over the row type:
     <DataTable rows={expenses} columns={cols} rowKey={(r) => r.id} />                       */
import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { Checkbox } from "./form";
import { Skeleton, EmptyState } from "./primitives";

export function DataTable({
  columns,
  rows,
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
  stickyHeader, // pair with a max-height/overflow container for long lists
  className,
}) {
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

  const colCount = columns.length + (selectable ? 1 : 0);

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-2",
        stickyHeader ? "overflow-auto" : "overflow-hidden",
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead className={cn(stickyHeader && "sticky top-0 z-10 bg-surface-2")}>
          <tr>
            {selectable && (
              <th className="w-10 border-b border-r border-border px-3 py-3.5">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c, i) => {
              const active = sort?.key === c.key;
              const nextDir = active && sort?.dir === "asc" ? "desc" : "asc";
              return (
                <th
                  key={c.key}
                  style={c.width ? { width: c.width } : undefined}
                  aria-sort={
                    active
                      ? sort.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={cn(
                    "border-b border-border px-3.5 py-3.5 text-left text-[12.5px] font-medium text-ink-muted",
                    i < columns.length - 1 && "border-r",
                    c.numeric && "text-right",
                  )}
                >
                  {c.sortable && onSortChange ? (
                    <button
                      onClick={() => onSortChange({ key: c.key, dir: nextDir })}
                      className={cn(
                        "inline-flex items-center gap-1 hover:text-ink",
                        active && "text-primary",
                      )}
                    >
                      {c.header}
                      <span aria-hidden="true">
                        {active ? (
                          sort.dir === "asc" ? (
                            <ArrowUp size={12} />
                          ) : (
                            <ArrowDown size={12} />
                          )
                        ) : (
                          <ChevronsUpDown size={12} className="opacity-50" />
                        )}
                      </span>
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(4)].map((_, r) => (
              <tr key={r}>
                {selectable && (
                  <td className="border-b border-r border-border px-3 py-4">
                    <Skeleton className="h-[15px] w-[15px]" />
                  </td>
                )}
                {columns.map((c, i) => (
                  <td
                    key={c.key}
                    className={cn(
                      "border-b border-border px-3.5 py-4",
                      i < columns.length - 1 && "border-r",
                    )}
                  >
                    <Skeleton className="h-4 w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan={colCount}>
                <EmptyState title="Couldn't load records" description={error} />
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={colCount}>
                <EmptyState
                  title={emptyTitle}
                  description={emptyDescription}
                  action={emptyAction}
                />
              </td>
            </tr>
          ) : (
            rows.map((row) => {
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
                    sel.has(k) ? "bg-primary-subtle/60" : "hover:bg-surface-1",
                  )}
                >
                  {selectable && (
                    <td
                      className="border-b border-r border-border px-3 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={sel.has(k)}
                        onCheckedChange={() => toggleOne(k)}
                      />
                    </td>
                  )}
                  {columns.map((c, i) => (
                    <td
                      key={c.key}
                      className={cn(
                        "border-b border-border px-3.5 py-4 text-ink-secondary",
                        i < columns.length - 1 && "border-r",
                        c.numeric && "text-right tabular-nums text-ink",
                      )}
                    >
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Pagination ---------- */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  totalLabel,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
}) {
  if (pageCount <= 1 && !totalLabel && !onPageSizeChange) return null;
  return (
    <div className="flex items-center justify-between px-1 py-3 text-sm text-ink-muted">
      <div className="flex items-center gap-3">
        <span>{totalLabel}</span>
        {onPageSizeChange && (
          <label className="flex items-center gap-1.5">
            <span className="text-xs">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-control border border-border-strong bg-surface-2 px-1.5 py-0.5 text-xs text-ink"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-control px-2.5 py-1 hover:bg-surface-1 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>
        {[...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
            className={cn(
              "min-w-[30px] rounded-control px-2 py-1",
              page === i + 1 ? "bg-primary text-white" : "hover:bg-surface-1",
            )}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="rounded-control px-2.5 py-1 hover:bg-surface-1 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ---------- BulkActionsBar — acts on a DataTable selection ----------
   Renders only when something is selected. Handles the "select all
   across pages" pattern: when every visible row is selected but more
   exist, offers to extend the selection to all matching records.

   <BulkActionsBar
     selectedCount={sel.size}
     totalCount={filteredTotal}
     onSelectAllPages={() => setSel(allIds)}
     onClear={() => setSel(new Set())}
   >
     <Button variant="secondary" size="sm">Export</Button>
     <Button variant="destructive" size="sm">Delete</Button>
   </BulkActionsBar> */
export function BulkActionsBar({
  selectedCount,
  totalCount,
  onSelectAllPages,
  onClear,
  children,
  className,
}) {
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
    >
      <span className="font-medium tabular-nums">
        {selectedCount} selected
      </span>
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
}
