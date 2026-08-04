import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("renders and spreads rest props", () => {
    render(<Textarea aria-label="Notes" rows={4} />);
    expect(screen.getByLabelText("Notes")).toBeTruthy();
  });

  it("shows the danger border when invalid", () => {
    render(<Textarea invalid aria-label="Notes" />);
    expect(screen.getByLabelText("Notes").className).toContain("border-danger");
  });
});
