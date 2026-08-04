import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Collected" value="₹3,86,100" />);
    expect(screen.getByText("Collected")).toBeTruthy();
    expect(screen.getByText("₹3,86,100")).toBeTruthy();
  });

  it("tones the delta by meaning, not sign", () => {
    render(<StatCard label="Overdue" value="12" delta="+3" deltaTone="danger" />);
    expect(screen.getByText("+3").className).toContain("bg-danger-bg");
  });

  it("renders skeletons while loading", () => {
    const { container } = render(<StatCard label="Collected" value="x" loading />);
    expect(container.querySelectorAll(".animate-pulse").length).toBe(3);
  });
});
