import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ActionsMenu from "./ActionsMenu";

describe("ActionsMenu", () => {
  it("renders a labelled trigger", () => {
    render(<ActionsMenu items={[{ label: "Edit", onSelect: () => {} }]} />);
    const trigger = screen.getByRole("button", { name: "Row actions" });
    expect(trigger).toBeTruthy();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
  });

  it("accepts a custom trigger", () => {
    render(
      <ActionsMenu
        items={[{ label: "Edit", onSelect: () => {} }]}
        trigger={<button type="button">More</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "More" })).toBeTruthy();
  });
});
