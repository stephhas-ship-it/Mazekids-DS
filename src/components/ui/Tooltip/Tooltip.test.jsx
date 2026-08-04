import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("renders its trigger", () => {
    render(
      <Tooltip label="Export as CSV">
        <button type="button">Export</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Export" })).toBeTruthy();
  });
});
