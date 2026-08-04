import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import cn from "../../../utils/cn";
import Checkbox from "../Checkbox/Checkbox";

/**
 * @param {object} props
 * @param {{key: string, header: string, sortable?: boolean, numeric?: boolean, width?: string}[]} props.columns
 * @param {{key: string, dir: "asc"|"desc"}} [props.sort]
 */
const DataTableHeader = ({
  columns,
  selectable,
  allSelected,
  someSelected,
  onToggleAll,
  sort,
  onSortChange,
  sticky,
}) => (
  <thead className={cn(sticky && "sticky top-0 z-10 bg-surface-2")}>
    <tr>
      {selectable && (
        <th
          scope="col"
          className="w-10 border-b border-r border-border px-3 py-3.5"
        >
          <Checkbox
            checked={allSelected ? true : someSelected ? "indeterminate" : false}
            onCheckedChange={onToggleAll}
            aria-label="Select all rows"
          />
        </th>
      )}
      {columns.map((c, i) => {
        const active = sort?.key === c.key;
        const nextDir = active && sort?.dir === "asc" ? "desc" : "asc";
        return (
          <th
            key={c.key}
            scope="col"
            style={c.width ? { width: c.width } : undefined}
            aria-sort={
              active
                ? sort.dir === "asc"
                  ? "ascending"
                  : "descending"
                : c.sortable && onSortChange
                  ? "none"
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
                type="button"
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
);

export default DataTableHeader;
