import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

const OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
];

describe("RadioGroup", () => {
  it("renders one radio per option", () => {
    render(<RadioGroup options={OPTIONS} />);
    expect(screen.getAllByRole("radio").length).toBe(2);
  });

  it("reports the chosen value", () => {
    const onValueChange = vi.fn();
    render(<RadioGroup options={OPTIONS} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "UPI" }));
    expect(onValueChange).toHaveBeenCalledWith("upi");
  });
});
