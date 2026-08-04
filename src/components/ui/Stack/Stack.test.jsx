import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stack from "./Stack";

describe("Stack", () => {
  it("renders children in a vertical flex column", () => {
    render(
      <Stack data-testid="stack">
        <span>One</span>
      </Stack>,
    );
    const classes = screen.getByTestId("stack").className.split(/\s+/);
    expect(classes).toContain("flex-col");
    expect(classes).toContain("gap-4");
  });

  it("maps the space prop onto the scale", () => {
    render(<Stack space={8} data-testid="stack" />);
    expect(screen.getByTestId("stack").className.split(/\s+/)).toContain("gap-8");
  });

  it("renders as the requested element", () => {
    render(<Stack as="section" data-testid="stack" />);
    expect(screen.getByTestId("stack").tagName).toBe("SECTION");
  });
});
