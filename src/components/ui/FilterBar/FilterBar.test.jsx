import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  it("renders its children", () => {
    render(
      <FilterBar>
        <button type="button">This month</button>
      </FilterBar>,
    );
    expect(screen.getByRole("button", { name: "This month" })).toBeTruthy();
  });
});
