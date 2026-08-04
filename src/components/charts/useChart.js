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

// Watches <html data-theme> directly rather than useTheme(), so charts recolour
// even when rendered outside a ThemeProvider.
const useThemeVersion = () => {
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
};

const useChart = (config) => {
  const ref = React.useRef(null);
  const themeVersion = useThemeVersion();
  const dataKey = JSON.stringify(config.data);
  const configRef = React.useRef(config);
  configRef.current = config;

  React.useEffect(() => {
    if (!ref.current) return undefined;
    const chart = new Chart(ref.current, configRef.current);
    return () => chart.destroy();
  }, [dataKey, themeVersion]);

  return ref;
};

export default useChart;
