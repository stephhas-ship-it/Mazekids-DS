import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders with its label", () => {
    render(<Checkbox label="Select all" />);
    expect(screen.getByRole("checkbox", { name: "Select all" })).toBeTruthy();
  });

  it("reports true when toggled on", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Paid" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("supports the indeterminate state", () => {
    render(<Checkbox label="Select all" checked="indeterminate" />);
    expect(
      screen.getByRole("checkbox").getAttribute("data-state"),
    ).toBe("indeterminate");
  });
});
