import { twMerge } from "tailwind-merge";

// twMerge already flattens arrays and drops falsy values, so no clsx needed.
const cn = (...inputs) => twMerge(inputs);

export default cn;
