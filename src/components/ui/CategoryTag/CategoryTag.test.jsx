import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryTag from "./CategoryTag";

describe("CategoryTag", () => {
  it("renders its label", () => {
    render(<CategoryTag label="Utilities" index={0} />);
    expect(screen.getByText("Utilities")).toBeTruthy();
  });

  it("uses the indexed category variable", () => {
    render(<CategoryTag label="Rent" index={2} data-testid="tag" />);
    const dot = screen.getByTestId("tag").querySelector("i");
    expect(dot.style.background).toContain("--cat-3");
  });

  it("folds a 6th category onto the shared other colour", () => {
    render(<CategoryTag label="Misc" index={9} data-testid="tag" />);
    const dot = screen.getByTestId("tag").querySelector("i");
    expect(dot.style.background).toContain("--cat-6");
  });
});
