import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {string} props.name  Full name; the first two initials are shown
 */
const Avatar = ({ name = "", className = "", ...rest }) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
        "bg-primary-subtle text-xs font-semibold text-primary",
        className,
      )}
      aria-hidden="true"
      {...rest}
    >
      {initials}
    </span>
  );
};

export default Avatar;
