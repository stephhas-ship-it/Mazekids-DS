// Hex here are SSR/test fallbacks only — live values come from the CSS
// tokens in src/styles/tokens.css, so charts follow a token change.
const FALLBACKS = {
  "--chart-series-1": "#4A6B2E",
  "--chart-series-1-fill": "rgba(74,107,46,0.12)",
  "--chart-series-2": "#E0A32E",
  "--chart-grid": "#ECE7D8",
  "--chart-tick": "#8F8C7D",
  "--chart-slice-border": "#FFFFFF",
  "--cat-1": "#4A6B2E",
  "--cat-2": "#E0A32E",
  "--cat-3": "#C6633B",
  "--cat-4": "#4F8A78",
  "--cat-5": "#C77B92",
  "--cat-6": "#D8D1B0",
};

export const cssVar = (name) => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    if (v) return v;
  }
  return FALLBACKS[name] ?? FALLBACKS["--chart-tick"];
};

// Getters, not values: each read re-resolves so a theme flip is picked up
// the next time a chart is built.
export const chartColors = {
  get forest() {
    return cssVar("--chart-series-1");
  },
  get forestFill() {
    return cssVar("--chart-series-1-fill");
  },
  get gold() {
    return cssVar("--chart-series-2");
  },
  get terracotta() {
    return cssVar("--cat-3");
  },
  get sage() {
    return cssVar("--cat-4");
  },
  get rose() {
    return cssVar("--cat-5");
  },
  get grid() {
    return cssVar("--chart-grid");
  },
  get tick() {
    return cssVar("--chart-tick");
  },
};

// Fixed categorical order, matching CategoryTag. A 6th category aggregates
// to "Other" rather than inventing a colour.
export const categoricalPalette = () => [
  cssVar("--cat-1"),
  cssVar("--cat-2"),
  cssVar("--cat-3"),
  cssVar("--cat-4"),
  cssVar("--cat-5"),
];

export const chartJsScales = () => ({
  x: {
    grid: { display: false },
    border: { display: false },
    ticks: { color: chartColors.tick, font: { size: 11 } },
  },
  y: {
    grid: { color: chartColors.grid },
    border: { display: false },
    ticks: { color: chartColors.tick, font: { size: 11 } },
    beginAtZero: true,
  },
});

export const lineDataset = (data) => ({
  data,
  borderColor: chartColors.forest,
  backgroundColor: chartColors.forestFill,
  fill: true,
  tension: 0.4,
  borderWidth: 2,
  pointRadius: 0,
  pointHoverRadius: 4,
});

export const moneyBarDatasets = (collected, pending) => [
  {
    label: "Collected",
    data: collected,
    backgroundColor: chartColors.forest,
    borderRadius: 4,
  },
  {
    label: "Pending",
    data: pending,
    backgroundColor: chartColors.gold,
    borderRadius: 4,
  },
];

export const doughnutDataset = (data) => ({
  data,
  backgroundColor: categoricalPalette().slice(0, data.length),
  borderColor: cssVar("--chart-slice-border"),
  borderWidth: 2,
});
