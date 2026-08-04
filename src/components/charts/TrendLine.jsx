import { chartJsScales, lineDataset } from "../../utils/chartTheme";
import useChart from "./useChart";

/**
 * @param {object} props
 * @param {string[]} props.labels
 * @param {number[]} props.data  Single series — one forest hue
 * @param {string} props.ariaLabel  Charts are images to assistive tech
 */
const TrendLine = ({ labels, data, height = 180, ariaLabel }) => {
  const ref = useChart({
    type: "line",
    data: { labels, datasets: [lineDataset(data)] },
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

export default TrendLine;
