import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
  it("renders nothing while closed", () => {
    render(<Drawer open={false} onOpenChange={() => {}} title="Menu" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders its title and children when open", () => {
    render(
      <Drawer open onOpenChange={() => {}} title="Expense detail">
        <p>EXP-2026-002</p>
      </Drawer>,
    );
    expect(screen.getByText("Expense detail")).toBeTruthy();
    expect(screen.getByText("EXP-2026-002")).toBeTruthy();
  });

  it("closes from the close button", () => {
    const onOpenChange = vi.fn();
    render(<Drawer open onOpenChange={onOpenChange} title="Menu" />);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
