import cn from "../../../utils/cn";
import { PAD } from "../../../utils/spacing";

/**
 * @param {object} props
 * @param {0|1|2} [props.surface]  Token surface level
 * @param {boolean} [props.bordered]
 * @param {"control"|"input"|"card"} [props.rounded]
 * @param {0|1|2|3|4|6|8} [props.padding]
 */
const Box = ({
  surface,
  bordered,
  rounded = "card",
  padding = 4,
  className = "",
  children,
  as: Tag = "div",
  ...rest
}) => (
  <Tag
    className={cn(
      surface === 0 && "bg-surface-0",
      surface === 1 && "bg-surface-1",
      surface === 2 && "bg-surface-2",
      bordered && "border border-border",
      rounded === "control" && "rounded-control",
      rounded === "input" && "rounded-input",
      rounded === "card" && "rounded-card",
      PAD[padding],
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Box;
