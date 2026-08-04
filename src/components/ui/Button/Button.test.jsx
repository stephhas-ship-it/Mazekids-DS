import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("spreads rest props onto the button", () => {
    render(<Button data-testid="export" aria-label="Export" size="icon" />);
    expect(screen.getByTestId("export").getAttribute("aria-label")).toBe(
      "Export",
    );
  });

  it("keeps the label while loading and disables the button", () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole("button", { name: /Save/ });
    expect(btn.disabled).toBe(true);
  });

  it("lets className override a conflicting variant class", () => {
    render(<Button className="bg-surface-1">Save</Button>);
    const classes = screen.getByRole("button").className.split(/\s+/);
    expect(classes).toContain("bg-surface-1");
    expect(classes).not.toContain("bg-primary");
  });
});
