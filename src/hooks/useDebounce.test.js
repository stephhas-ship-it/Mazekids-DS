import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("anu", 400));
    expect(result.current).toBe("anu");
  });

  it("waits for the delay before updating", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 400), {
      initialProps: { v: "a" },
    });

    rerender({ v: "ab" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(400));
    expect(result.current).toBe("ab");
  });

  it("keeps only the last value in a burst", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 400), {
      initialProps: { v: "a" },
    });

    rerender({ v: "ab" });
    act(() => vi.advanceTimersByTime(200));
    rerender({ v: "abc" });
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("abc");
  });
});
