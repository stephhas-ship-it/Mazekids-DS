import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DateRangeField from "./DateRangeField";

describe("DateRangeField", () => {
  it("labels both ends of the range", () => {
    render(<DateRangeField />);
    expect(screen.getByLabelText("From date")).toBeTruthy();
    expect(screen.getByLabelText("To date")).toBeTruthy();
  });

  it("keeps the other end when one changes", () => {
    const onChange = vi.fn();
    render(<DateRangeField to="2026-03-31" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("From date"), {
      target: { value: "2026-03-01" },
    });
    expect(onChange).toHaveBeenCalledWith({
      from: "2026-03-01",
      to: "2026-03-31",
    });
  });
});
