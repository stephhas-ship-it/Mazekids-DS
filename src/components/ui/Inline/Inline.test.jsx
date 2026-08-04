import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Inline from "./Inline";

describe("Inline", () => {
  it("wraps by default", () => {
    render(<Inline data-testid="inline" />);
    expect(screen.getByTestId("inline").className.split(/\s+/)).toContain("flex-wrap");
  });

  it("can be told not to wrap", () => {
    render(<Inline wrap={false} data-testid="inline" />);
    expect(screen.getByTestId("inline").className.split(/\s+/)).not.toContain("flex-wrap");
  });

  it("applies justify", () => {
    render(<Inline justify="between" data-testid="inline" />);
    expect(screen.getByTestId("inline").className.split(/\s+/)).toContain("justify-between");
  });
});
