import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToast from "./useToast";
import ToastProvider from "../components/ui/Toast/ToastProvider";

const wrapper = ({ children }) => <ToastProvider>{children}</ToastProvider>;

describe("useToast", () => {
  it("throws outside a provider", () => {
    expect(() => renderHook(() => useToast())).toThrow(
      /must be used inside <ToastProvider>/,
    );
  });

  it("exposes the toast API", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.push).toBe("function");
    expect(typeof result.current.dismiss).toBe("function");
    expect(typeof result.current.promise).toBe("function");
  });

  it("resolves through promise() and returns the value", async () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    let value;
    await act(async () => {
      value = await result.current.promise(Promise.resolve(7), {
        loading: "Saving…",
        success: "Saved.",
        error: "Failed.",
      });
    });
    expect(value).toBe(7);
  });

  it("rethrows through promise() so callers can handle failure", async () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    await act(async () => {
      await expect(
        result.current.promise(Promise.reject(new Error("nope")), {
          success: "Saved.",
          error: "Failed.",
        }),
      ).rejects.toThrow("nope");
    });
  });
});
