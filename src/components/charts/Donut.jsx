import { doughnutDataset } from "../../utils/chartTheme";
import useChart from "./useChart";

/**
 * @param {object} props
 * @param {string[]} props.labels
 * @param {number[]} props.data  Categories, in the fixed brand order
 * @param {string} props.ariaLabel
 */
const Donut = ({ labels, data, height = 150, ariaLabel }) => {
  const ref = useChart({
    type: "doughnut",
    data: { labels, datasets: [doughnutDataset(data)] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      plugins: { legend: { display: false } },
    },
  });

  return (
    <div className="relative" style={{ height }}>
      <canvas ref={ref} role="img" aria-label={ariaLabel} />
    </div>
  );
};

export default Donut;
