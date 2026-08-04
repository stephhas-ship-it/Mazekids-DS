import { chartJsScales, moneyBarDatasets } from "../../utils/chartTheme";
import useChart from "./useChart";

/**
 * @param {object} props
 * @param {string[]} props.labels
 * @param {number[]} props.collected  Forest series
 * @param {number[]} props.pending  Gold series
 * @param {string} props.ariaLabel
 */
const MoneyBars = ({ labels, collected, pending, height = 180, ariaLabel }) => {
  const ref = useChart({
    type: "bar",
    data: { labels, datasets: moneyBarDatasets(collected, pending) },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: chartJsScales(),
    },
  });

  return (
    <div className="relative" style={{ height }}>
      <canvas ref={ref} role="img" aria-label={ariaLabel} />
    </div>
  );
};

export default MoneyBars;
