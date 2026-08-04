import cn from "../../../utils/cn";
import { GAP } from "../../../utils/spacing";

/**
 * @param {object} props
 * @param {0|1|2|3|4|6|8} [props.space]
 * @param {"start"|"center"|"end"|"baseline"} [props.align]
 * @param {"start"|"center"|"end"|"between"} [props.justify]
 * @param {boolean} [props.wrap]
 */
const Inline = ({
  space = 2,
  align = "center",
  justify,
  wrap = true,
  className = "",
  children,
  as: Tag = "div",
  ...rest
}) => (
  <Tag
    className={cn(
      "flex",
      wrap && "flex-wrap",
      GAP[space],
      align === "start" && "items-start",
      align === "center" && "items-center",
      align === "end" && "items-end",
      align === "baseline" && "items-baseline",
      justify === "start" && "justify-start",
      justify === "center" && "justify-center",
      justify === "end" && "justify-end",
      justify === "between" && "justify-between",
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Inline;
