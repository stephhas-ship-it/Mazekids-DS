import cn from "../../../utils/cn";
import Skeleton from "./Skeleton";

/**
 * @param {object} props
 * @param {number} [props.rows]
 * @param {number} [props.cols]
 */
const SkeletonTableRows = ({ rows = 5, cols = 4, className = "", ...rest }) => (
  <div className={cn("flex flex-col", className)} aria-hidden="true" {...rest}>
    {[...Array(rows)].map((_, r) => (
      <div
        key={r}
        className="flex gap-4 border-b border-border px-4 py-3.5 last:border-0"
      >
        {[...Array(cols)].map((_, c) => (
          <Skeleton
            key={c}
            className={cn("h-3.5", c === 0 ? "w-1/4" : "flex-1")}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonTableRows;
