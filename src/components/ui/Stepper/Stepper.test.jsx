import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Stepper from "./Stepper";

const STEPS = [{ label: "Details" }, { label: "Guardians" }, { label: "Fees" }];

describe("Stepper", () => {
  it("marks the current step", () => {
    render(<Stepper steps={STEPS} current={1} />);
    expect(
      screen.getByRole("button", { name: /Guardians/ }).getAttribute("aria-current"),
    ).toBe("step");
  });

  it("lets you jump back to a completed step only", () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={STEPS} current={1} onStepClick={onStepClick} />);

    expect(screen.getByRole("button", { name: /Fees/ }).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /Details/ }));
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it("announces position in the list", () => {
    render(<Stepper steps={STEPS} current={0} />);
    expect(screen.getByRole("list").getAttribute("aria-label")).toBe(
      "Step 1 of 3: Details",
    );
  });
});
