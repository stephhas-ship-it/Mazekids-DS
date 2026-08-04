import * as React from "react";
import cn from "../../../utils/cn";
import inputClasses from "../Input/inputClasses";

/**
 * @param {object} props
 * @param {boolean} [props.invalid]  Switches the border to the danger token
 */
const Textarea = React.forwardRef(({ invalid, className = "", ...rest }, ref) => (
  <textarea
    ref={ref}
    className={cn(inputClasses(invalid), "h-auto min-h-[88px] py-2", className)}
    {...rest}
  />
));

Textarea.displayName = "Textarea";

export default Textarea;
