import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {number} [props.size]  Pixel box; inline style is required for a dynamic value
 */
const Spinner = ({ size = 16, className = "", ...rest }) => (
  <span
    role="status"
    aria-label="Loading"
    style={{ width: size, height: size }}
    className={cn(
      "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary",
      className,
    )}
    {...rest}
  />
);

export default Spinner;
