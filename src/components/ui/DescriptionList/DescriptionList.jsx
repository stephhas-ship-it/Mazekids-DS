import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {{label: string, value: React.ReactNode}[]} props.items
 * @param {1|2|3} [props.columns]
 */
const DescriptionList = ({ items = [], columns = 1, className = "", ...rest }) => (
  <dl
    className={cn(
      "grid gap-x-8 gap-y-3",
      columns === 2 && "sm:grid-cols-2",
      columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
    {...rest}
  >
    {items.map((item) => (
      <div key={item.label} className="flex flex-col gap-0.5">
        <dt className="text-xs font-medium text-ink-muted">{item.label}</dt>
        <dd className="text-sm text-ink">{item.value ?? "—"}</dd>
      </div>
    ))}
  </dl>
);

export default DescriptionList;
