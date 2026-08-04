import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("exposes the value to assistive tech", () => {
    render(<ProgressBar value={40} label="Toddlers" />);
    const bar = screen.getByRole("progressbar", { name: "Toddlers" });
    expect(bar.getAttribute("aria-valuenow")).toBe("40");
  });

  it("clamps the fill between 0 and 100 percent", () => {
    const { container, rerender } = render(<ProgressBar value={250} max={100} />);
    expect(container.querySelector("[role=progressbar] > div").style.width).toBe("100%");

    rerender(<ProgressBar value={-20} max={100} />);
    expect(container.querySelector("[role=progressbar] > div").style.width).toBe("0%");
  });
});
