import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("shows the title, consequence and confirm label", () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete EXP-2026-002?"
        confirmLabel="Delete expense"
      />,
    );
    expect(screen.getByText("Delete EXP-2026-002?")).toBeTruthy();
    expect(screen.getByText("This can't be undone.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete expense" })).toBeTruthy();
  });

  it("calls onConfirm from the confirm button", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete?"
        confirmLabel="Delete expense"
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete expense" }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("closes from the cancel button", () => {
    const onOpenChange = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Delete?"
        confirmLabel="Delete expense"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disables the confirm button while loading", () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete?"
        confirmLabel="Delete expense"
        loading
      />,
    );
    expect(
      screen.getByRole("button", { name: /Delete expense/ }).disabled,
    ).toBe(true);
  });
});
