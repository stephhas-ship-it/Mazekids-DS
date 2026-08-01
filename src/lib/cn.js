/* cn.js — merge class names, resolving Tailwind conflicts.
   Used by every variant component. */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));
