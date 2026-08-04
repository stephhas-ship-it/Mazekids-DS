import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner", () => {
  it("renders its content", () => {
    render(<Banner>Fee structure changes on 1 April.</Banner>);
    expect(screen.getByText("Fee structure changes on 1 April.")).toBeTruthy();
  });

  it("shows a dismiss button only when onDismiss is given", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<Banner>Notice</Banner>);
    expect(screen.queryByRole("button", { name: "Dismiss notice" })).toBeNull();

    rerender(<Banner onDismiss={onDismiss}>Notice</Banner>);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notice" }));
    expect(onDismiss).toHaveBeenCalled();
  });
});
