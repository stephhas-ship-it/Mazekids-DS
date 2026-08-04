import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {string} props.label  Doubles as aria-label and tooltip title
 * @param {boolean} [props.active]
 */
const ToolbarButton = ({ onClick, active, disabled, label, children }) => (
  <button
    type="button"
    // Prevent the mousedown from stealing the editor's selection.
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    aria-pressed={active}
    title={label}
    className={cn(
      "flex h-7 w-7 items-center justify-center rounded-control",
      active
        ? "bg-primary-subtle text-primary"
        : "text-ink-secondary hover:bg-surface-1 hover:text-ink",
      "disabled:pointer-events-none disabled:opacity-40",
    )}
  >
    {children}
  </button>
);

export default ToolbarButton;
