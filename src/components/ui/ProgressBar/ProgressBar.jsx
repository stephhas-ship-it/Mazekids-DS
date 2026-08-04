/**
 * @param {object} props
 * @param {number} props.value
 * @param {number} [props.max]
 * @param {number} [props.catIndex]  Category colour index, matching CategoryTag
 */
const ProgressBar = ({
  value,
  max = 100,
  label,
  valueLabel,
  catIndex = 0,
  className = "",
  ...rest
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const varName =
    catIndex >= 0 && catIndex < 5 ? `--cat-${catIndex + 1}` : "--cat-6";

  return (
    <div className={className} {...rest}>
      {(label || valueLabel) && (
        <div className="mb-1 flex items-baseline justify-between text-sm">
          <span className="text-ink-secondary">{label}</span>
          <span className="font-medium tabular-nums text-ink">
            {valueLabel ?? value}
          </span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-pill border border-border bg-surface-1"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-pill transition-[width]"
          style={{ width: `${pct}%`, background: `var(${varName})` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
