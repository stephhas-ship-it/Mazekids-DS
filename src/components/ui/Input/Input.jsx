import * as React from "react";
import cn from "../../../utils/cn";
import inputClasses from "./inputClasses";

/**
 * @param {object} props
 * @param {boolean} [props.invalid]  Switches the border to the danger token
 */
const Input = React.forwardRef(({ invalid, className = "", ...rest }, ref) => (
  <input
    ref={ref}
    className={cn(inputClasses(invalid), className)}
    {...rest}
  />
));

Input.displayName = "Input";

export default Input;
