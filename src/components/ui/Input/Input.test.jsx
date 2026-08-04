import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders and spreads rest props", () => {
    render(<Input placeholder="Vendor name" aria-label="Vendor" />);
    expect(screen.getByLabelText("Vendor")).toBeTruthy();
  });

  it("shows the danger border when invalid", () => {
    render(<Input invalid aria-label="Amount" />);
    expect(screen.getByLabelText("Amount").className).toContain("border-danger");
  });

  it("lets className override the base width", () => {
    render(<Input className="w-40" aria-label="From date" />);
    const classes = screen.getByLabelText("From date").className.split(/\s+/);
    expect(classes).toContain("w-40");
    expect(classes).not.toContain("w-full");
  });
});
