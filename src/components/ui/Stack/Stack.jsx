import cn from "../../../utils/cn";
import { GAP } from "../../../utils/spacing";

/**
 * @param {object} props
 * @param {0|1|2|3|4|6|8} [props.space]
 * @param {"start"|"center"|"end"} [props.align]
 * @param {string} [props.as]  Element tag, defaults to div
 */
const Stack = ({
  space = 4,
  align,
  className = "",
  children,
  as: Tag = "div",
  ...rest
}) => (
  <Tag
    className={cn(
      "flex flex-col",
      GAP[space],
      align === "start" && "items-start",
      align === "center" && "items-center",
      align === "end" && "items-end",
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Stack;
