import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("shows the first two initials", () => {
    render(<Avatar name="Priya Raghavan" data-testid="avatar" />);
    expect(screen.getByTestId("avatar").textContent).toBe("PR");
  });

  it("renders without crashing on an empty name", () => {
    render(<Avatar name="" data-testid="avatar" />);
    expect(screen.getByTestId("avatar").textContent).toBe("");
  });

  it("ignores double spaces rather than reading undefined", () => {
    render(<Avatar name="Anu  Menon" data-testid="avatar" />);
    expect(screen.getByTestId("avatar").textContent).toBe("AM");
  });
});
