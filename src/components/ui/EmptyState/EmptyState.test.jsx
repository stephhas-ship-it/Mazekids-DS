import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title as a heading", () => {
    render(<EmptyState title="Nothing here yet" />);
    expect(screen.getByRole("heading", { name: "Nothing here yet" })).toBeTruthy();
  });

  it("renders the description and action when given", () => {
    render(
      <EmptyState
        title="No expenses"
        description="Record your first expense."
        action={<button type="button">Add expense</button>}
      />,
    );
    expect(screen.getByText("Record your first expense.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Add expense" })).toBeTruthy();
  });
});
