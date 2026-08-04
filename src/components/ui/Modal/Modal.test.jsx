import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders nothing while closed", () => {
    render(<Modal open={false} onOpenChange={() => {}} title="Edit expense" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders a labelled dialog when open", () => {
    render(<Modal open onOpenChange={() => {}} title="Edit expense" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeTruthy();
    expect(screen.getByText("Edit expense")).toBeTruthy();
  });

  it("closes on Escape", () => {
    const onOpenChange = vi.fn();
    render(<Modal open onOpenChange={onOpenChange} title="Edit expense" />);
    fireEvent.keyDown(document.activeElement ?? document.body, {
      key: "Escape",
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders footer content", () => {
    render(
      <Modal
        open
        onOpenChange={() => {}}
        title="Edit expense"
        footer={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });
});
