import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "./Select";

const OPTIONS = [
  { value: "utilities", label: "Utilities" },
  { value: "rent", label: "Rent" },
];

describe("Select", () => {
  it("renders a combobox trigger with the placeholder", () => {
    render(
      <Select options={OPTIONS} placeholder="Pick a category" aria-label="Category" />,
    );
    expect(screen.getByLabelText("Category")).toBeTruthy();
    expect(screen.getByText("Pick a category")).toBeTruthy();
  });

  it("shows the selected option label", () => {
    render(<Select options={OPTIONS} value="rent" aria-label="Category" />);
    expect(screen.getByText("Rent")).toBeTruthy();
  });
});
