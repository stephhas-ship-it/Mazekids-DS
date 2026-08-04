import cn from "../../../utils/cn";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {{label: string, href?: string}[]} [props.breadcrumb]
 * @param {React.ReactNode} [props.actions]
 */
const PageHeader = ({
  icon,
  breadcrumb,
  title,
  subtitle,
  actions,
  className = "",
  ...rest
}) => (
  <header className={cn("mb-6", className)} {...rest}>
    <Breadcrumb items={breadcrumb} className="mb-2" />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="flex h-11 w-11 items-center justify-center rounded-card bg-primary-subtle text-xl"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-display text-[26px] font-semibold leading-tight text-ink">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  </header>
);

export default PageHeader;
