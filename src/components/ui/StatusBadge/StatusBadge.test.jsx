import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the status text", () => {
    render(<StatusBadge status="Paid" />);
    expect(screen.getByText("Paid")).toBeTruthy();
  });

  it("maps a known status to its tone", () => {
    render(<StatusBadge status="Overdue" />);
    expect(screen.getByText("Overdue").className).toContain("bg-danger-bg");
  });

  it("falls back to neutral for an unknown status", () => {
    render(<StatusBadge status="Something new" />);
    expect(screen.getByText("Something new").className).toContain(
      "bg-primary-subtle",
    );
  });
});
