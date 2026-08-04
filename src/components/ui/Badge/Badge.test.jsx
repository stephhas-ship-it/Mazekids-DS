import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders the count", () => {
    render(<Badge count={3} />);
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("renders nothing at zero or null", () => {
    const { container, rerender } = render(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
    rerender(<Badge count={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("caps the display at max", () => {
    render(<Badge count={120} max={99} />);
    expect(screen.getByText("99+")).toBeTruthy();
  });
});
