import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "../../../hooks/useTheme";

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

describe("ThemeToggle", () => {
  it("labels the action, not the current state", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: /Switch to (light|dark) mode/ })).toBeTruthy();
  });

  it("flips the document theme attribute", () => {
    renderToggle();
    const before = document.documentElement.dataset.theme;
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).not.toBe(before);
  });
});
