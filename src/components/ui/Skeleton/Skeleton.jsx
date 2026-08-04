import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {string} [props.className]  Size it with height/width utilities
 */
const Skeleton = ({ className = "", ...rest }) => (
  <div
    className={cn("animate-pulse rounded-control bg-border/60", className)}
    aria-hidden="true"
    {...rest}
  />
);

export default Skeleton;
