import { describe, it, expect } from "vitest";
import {
  cssVar,
  chartColors,
  categoricalPalette,
  chartJsScales,
  lineDataset,
  moneyBarDatasets,
  doughnutDataset,
} from "./chartTheme";

describe("cssVar", () => {
  it("falls back when the token is unset", () => {
    expect(cssVar("--chart-series-1")).toBeTruthy();
  });

  it("returns a value for an unknown token rather than undefined", () => {
    expect(typeof cssVar("--not-a-token")).toBe("string");
  });
});

describe("chartColors", () => {
  it("resolves on every read so a theme flip is picked up", () => {
    expect(typeof chartColors.forest).toBe("string");
    expect(typeof chartColors.grid).toBe("string");
  });
});

describe("categoricalPalette", () => {
  it("returns the five fixed categories in order", () => {
    expect(categoricalPalette().length).toBe(5);
  });
});

describe("chart.js helpers", () => {
  it("hides the x grid and keeps the y grid", () => {
    const scales = chartJsScales();
    expect(scales.x.grid.display).toBe(false);
    expect(scales.y.beginAtZero).toBe(true);
  });

  it("builds a filled single-series line", () => {
    const ds = lineDataset([1, 2, 3]);
    expect(ds.fill).toBe(true);
    expect(ds.data).toEqual([1, 2, 3]);
  });

  it("builds two labelled money series", () => {
    const ds = moneyBarDatasets([1], [2]);
    expect(ds.map((d) => d.label)).toEqual(["Collected", "Pending"]);
  });

  it("colours only as many slices as there is data", () => {
    expect(doughnutDataset([1, 2]).backgroundColor.length).toBe(2);
  });
});
