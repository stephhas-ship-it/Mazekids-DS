/* charts/theme.js — the data-viz rules, in code. Works with Chart.js or
   Recharts. Rules:
   - single-series trend → one forest hue
   - two-series money    → forest (in) + gold (owed)
   - true categories     → the fixed brand set, in order
   - grid: warm khaki hairlines, never cold grey

   FLEXIBLE COLORS: every color here is resolved LIVE from the CSS
   tokens in src/styles/tokens.css (--chart-*, --cat-*). Change the
   token → charts recolor on the next render. The hex values below
   are only SSR/test fallbacks. Never hardcode a chart color.       */

const FALLBACKS = {
  '--chart-series-1': '#4A6B2E',
  '--chart-series-1-fill': 'rgba(74,107,46,0.12)',
  '--chart-series-2': '#E0A32E',
  '--chart-grid': '#ECE7D8',
  '--chart-tick': '#8F8C7D',
  '--chart-slice-border': '#FFFFFF',
  '--cat-1': '#4A6B2E',
  '--cat-2': '#E0A32E',
  '--cat-3': '#C6633B',
  '--cat-4': '#4F8A78',
  '--cat-5': '#C77B92',
  '--cat-6': '#D8D1B0',
};

/** Resolve a CSS custom property from :root (respects data-theme). */
export function cssVar(name) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (v) return v;
  }
  return FALLBACKS[name] || '#000000';
}

/* Resolved at access time via getters, so theme/token changes are
   picked up whenever a chart is (re)built. */
export const chartColors = {
  get forest() { return cssVar('--chart-series-1'); },
  get forestFill() { return cssVar('--chart-series-1-fill'); },
  get gold() { return cssVar('--chart-series-2'); },
  get terracotta() { return cssVar('--cat-3'); },
  get sage() { return cssVar('--cat-4'); },
  get rose() { return cssVar('--cat-5'); },
  get grid() { return cssVar('--chart-grid'); },
  get tick() { return cssVar('--chart-tick'); },
};

/** Fixed categorical order — matches CategoryTag. 6th+ should aggregate to "Other". */
export const categoricalPalette = () => [
  cssVar('--cat-1'),
  cssVar('--cat-2'),
  cssVar('--cat-3'),
  cssVar('--cat-4'),
  cssVar('--cat-5'),
];

/* ---- Chart.js helpers ---- */
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
  { label: 'Collected', data: collected, backgroundColor: chartColors.forest, borderRadius: 4 },
  { label: 'Pending', data: pending, backgroundColor: chartColors.gold, borderRadius: 4 },
];

export const doughnutDataset = (data) => ({
  data,
  backgroundColor: categoricalPalette().slice(0, data.length),
  borderColor: cssVar('--chart-slice-border'),
  borderWidth: 2,
});
