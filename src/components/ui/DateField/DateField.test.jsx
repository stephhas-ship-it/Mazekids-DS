import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DateField from "./DateField";

describe("DateField", () => {
  it("renders the native date control", () => {
    render(<DateField aria-label="Due date" />);
    expect(screen.getByLabelText("Due date").type).toBe("date");
  });

  it("echoes the value in dd-mm-yyyy", () => {
    render(<DateField value="2026-03-17" aria-label="Due date" />);
    expect(screen.getByText("17-03-2026")).toBeTruthy();
  });

  it("reports the raw ISO value on change", () => {
    const onChange = vi.fn();
    render(<DateField onChange={onChange} aria-label="Due date" />);
    fireEvent.change(screen.getByLabelText("Due date"), {
      target: { value: "2026-04-01" },
    });
    expect(onChange).toHaveBeenCalledWith("2026-04-01");
  });
});
