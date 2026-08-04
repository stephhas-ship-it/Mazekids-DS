import { Sprout } from "lucide-react";
import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.action]  Usually a <Button>
 */
// font-accent is reserved for designated special moments — this is the only
// shipped component allowed to use the accent face.
const EmptyState = ({ title, description, action, className = "", ...rest }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center px-6 py-14 text-center",
      className,
    )}
    {...rest}
  >
    <div
      className="mb-3 flex h-12 w-12 items-center justify-center rounded-card bg-primary-subtle text-primary"
      aria-hidden="true"
    >
      <Sprout size={22} />
    </div>
    <h3 className="font-accent text-lg text-ink">{title}</h3>
    {description && (
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
