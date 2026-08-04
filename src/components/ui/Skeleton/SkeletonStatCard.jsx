import cn from "../../../utils/cn";
import Skeleton from "./Skeleton";

/**
 * @param {object} props
 * @param {string} [props.className]
 */
const SkeletonStatCard = ({ className = "", ...rest }) => (
  <div
    className={cn(
      "rounded-card border border-border bg-surface-2 p-4",
      className,
    )}
    {...rest}
  >
    <Skeleton className="h-3 w-20" />
    <Skeleton className="mt-2.5 h-7 w-28" />
    <Skeleton className="mt-2 h-3 w-16" />
  </div>
);

export default SkeletonStatCard;
