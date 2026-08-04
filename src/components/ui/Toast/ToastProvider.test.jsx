import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import ToastProvider from "./ToastProvider";
import useToast from "../../../hooks/useToast";

const wrapper = ({ children }) => <ToastProvider>{children}</ToastProvider>;

describe("ToastProvider", () => {
  it("renders its children", () => {
    render(
      <ToastProvider>
        <p>Dashboard</p>
      </ToastProvider>,
    );
    expect(screen.getByText("Dashboard")).toBeTruthy();
  });

  it("shows a pushed toast", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.push({ title: "Expense recorded.", tone: "success" });
    });
    expect(screen.getByText("Expense recorded.")).toBeTruthy();
  });

  it("dismisses a toast by id", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    let id;
    act(() => {
      id = result.current.push({ title: "Saving…" });
    });
    expect(screen.getByText("Saving…")).toBeTruthy();
    act(() => result.current.dismiss(id));
    expect(screen.queryByText("Saving…")).toBeNull();
  });

  it("gives each toast a distinct id", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    let first;
    let second;
    act(() => {
      first = result.current.push({ title: "One" });
      second = result.current.push({ title: "Two" });
    });
    expect(first).not.toBe(second);
  });
});
