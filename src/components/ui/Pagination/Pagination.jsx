import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {number} props.page  1-based
 * @param {number} props.pageCount
 * @param {(page: number) => void} props.onPageChange
 * @param {number[]} [props.pageSizeOptions]
 */
const Pagination = ({
  page,
  pageCount,
  onPageChange,
  totalLabel,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
  className = "",
  ...rest
}) => {
  if (pageCount <= 1 && !totalLabel && !onPageSizeChange) return null;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex items-center justify-between px-1 py-3 text-sm text-ink-muted",
        className,
      )}
      {...rest}
    >
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
          type="button"
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
            type="button"
            onClick={() => onPageChange(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
            aria-label={`Page ${i + 1}`}
            className={cn(
              "min-w-[30px] rounded-control px-2 py-1",
              page === i + 1 ? "bg-primary text-white" : "hover:bg-surface-1",
            )}
          >
            {i + 1}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="rounded-control px-2.5 py-1 hover:bg-surface-1 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
