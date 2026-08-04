import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Box from "./Box";

describe("Box", () => {
  it("applies surface, border and radius tokens", () => {
    render(<Box surface={2} bordered rounded="card" data-testid="box" />);
    const classes = screen.getByTestId("box").className.split(/\s+/);
    expect(classes).toContain("bg-surface-2");
    expect(classes).toContain("border-border");
    expect(classes).toContain("rounded-card");
  });

  it("maps padding onto the scale", () => {
    render(<Box padding={6} data-testid="box" />);
    expect(screen.getByTestId("box").className.split(/\s+/)).toContain("p-6");
  });
});
