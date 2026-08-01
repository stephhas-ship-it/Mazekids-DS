/* Charts.jsx — React chart components with the brand rules baked in.
   - TrendLine:  single series → one forest hue
   - MoneyBars:  two series → forest (collected) + gold (pending)
   - Donut:      categories → the fixed brand palette
   Warm khaki gridlines; charts belong on white cards (surface-2). */
import * as React from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
} from "chart.js";
import {
  chartJsScales,
  lineDataset,
  moneyBarDatasets,
  doughnutDataset,
} from "../../charts/theme";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
);

/* Charts resolve their colors from CSS variables at build time, so they
   must rebuild when the theme flips. This hook watches <html data-theme>
   directly (MutationObserver) rather than useTheme(), so charts recolor
   even when rendered outside a <ThemeProvider>. */
function useThemeVersion() {
  const [version, setVersion] = React.useState(0);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setVersion((v) => v + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return version;
}

function useChart(config) {
  const ref = React.useRef(null);
  const themeVersion = useThemeVersion();
  React.useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, config);
    return () => chart.destroy();
    // Recreate when data identity OR theme changes. The theme bump
    // re-renders the component first, so the datasets/scales passed in
    // have already re-resolved the CSS variables for the new theme.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config.data), themeVersion]);
  return ref;
}

const frame = (height) => ({ position: "relative", height });

export function TrendLine({ labels, data, height = 180, ariaLabel }) {
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
    <div style={frame(height)}>
      <canvas ref={ref} role="img" aria-label={ariaLabel} />
    </div>
  );
}

export function MoneyBars({
  labels,
  collected,
  pending,
  height = 180,
  ariaLabel,
}) {
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
    <div style={frame(height)}>
      <canvas ref={ref} role="img" aria-label={ariaLabel} />
    </div>
  );
}

export function Donut({ labels, data, height = 150, ariaLabel }) {
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
    <div style={frame(height)}>
      <canvas ref={ref} role="img" aria-label={ariaLabel} />
    </div>
  );
}
