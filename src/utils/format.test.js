import { describe, it, expect, vi, afterEach } from "vitest";
import {
  inr,
  inrPrecise,
  formatDate,
  formatDateLong,
  formatRelativeDays,
  formatRelativeTime,
} from "./format";

afterEach(() => vi.useRealTimers());

describe("inr", () => {
  it("groups in lakhs with no paise", () => {
    expect(inr(386100)).toBe("₹3,86,100");
  });

  it("handles zero", () => {
    expect(inr(0)).toBe("₹0");
  });
});

describe("inrPrecise", () => {
  it("keeps two decimals", () => {
    expect(inrPrecise(386100.5)).toBe("₹3,86,100.50");
  });
});

describe("formatDate", () => {
  it("renders dd-mm-yyyy", () => {
    expect(formatDate(new Date(2026, 2, 17))).toBe("17-03-2026");
  });

  it("zero-pads single digits", () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe("05-01-2026");
  });

  it("accepts an ISO string", () => {
    expect(formatDate("2026-03-17T00:00:00")).toBe("17-03-2026");
  });
});

describe("formatDateLong", () => {
  it("renders the readable table form", () => {
    expect(formatDateLong(new Date(2026, 2, 17))).toBe("17 Mar 2026");
  });
});

describe("formatRelativeDays", () => {
  it("reads forward and backward", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 17));
    expect(formatRelativeDays(new Date(2026, 2, 19))).toBe("in 2 days");
    expect(formatRelativeDays(new Date(2026, 2, 14))).toBe("3 days ago");
  });
});

describe("formatRelativeTime", () => {
  it("steps from just now through hours to days", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 17, 12, 0, 0));
    expect(formatRelativeTime(new Date(2026, 2, 17, 12, 0, 0))).toBe("just now");
    expect(formatRelativeTime(new Date(2026, 2, 17, 11, 55, 0))).toBe("5m ago");
    expect(formatRelativeTime(new Date(2026, 2, 17, 10, 0, 0))).toBe("2h ago");
    expect(formatRelativeTime(new Date(2026, 2, 14, 12, 0, 0))).toBe("3 days ago");
  });
});
