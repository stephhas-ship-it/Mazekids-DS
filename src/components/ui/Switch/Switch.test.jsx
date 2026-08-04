import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "./Switch";

describe("Switch", () => {
  it("renders with its label", () => {
    render(<Switch label="Email receipts" />);
    expect(screen.getByRole("switch", { name: "Email receipts" })).toBeTruthy();
  });

  it("reports the new state", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Email receipts" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
