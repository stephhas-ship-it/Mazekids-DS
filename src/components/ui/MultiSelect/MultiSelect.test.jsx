import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelect from "./MultiSelect";

const OPTIONS = [
  { value: "b1", label: "Toddlers" },
  { value: "b2", label: "Nursery" },
];

describe("MultiSelect", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(<MultiSelect options={OPTIONS} placeholder="Select batches" />);
    expect(screen.getByText("Select batches")).toBeTruthy();
  });

  it("opens the listbox and reports a toggled value", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect options={OPTIONS} onChange={onChange} aria-label="Batches" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Batches" }));
    fireEvent.click(screen.getByRole("option", { name: "Toddlers" }));
    expect(onChange).toHaveBeenCalledWith(["b1"]);
  });

  it("renders a removable chip per selected value", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect options={OPTIONS} value={["b1"]} onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove Toddlers" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
