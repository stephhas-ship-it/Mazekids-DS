import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTheme, { ThemeProvider } from "./useTheme";

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

beforeEach(() => window.localStorage.clear());

describe("useTheme", () => {
  it("throws outside a provider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      /must be used inside <ThemeProvider>/,
    );
  });

  it("sets the theme attribute on the document", () => {
    renderHook(() => useTheme(), { wrapper });
    expect(["light", "dark"]).toContain(document.documentElement.dataset.theme);
  });

  it("switches and persists the choice", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("mazekids-theme")).toBe("dark");
  });

  it("restores a saved choice on mount", () => {
    window.localStorage.setItem("mazekids-theme", "dark");
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("dark");
  });
});
