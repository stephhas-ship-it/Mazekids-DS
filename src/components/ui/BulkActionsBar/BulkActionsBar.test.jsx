import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BulkActionsBar from "./BulkActionsBar";

describe("BulkActionsBar", () => {
  it("renders nothing when nothing is selected", () => {
    const { container } = render(<BulkActionsBar selectedCount={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows the selected count", () => {
    render(<BulkActionsBar selectedCount={3} />);
    expect(screen.getByText("3 selected")).toBeTruthy();
  });

  it("offers select-all-pages only on a partial selection", () => {
    const { rerender } = render(
      <BulkActionsBar
        selectedCount={2}
        totalCount={40}
        onSelectAllPages={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "Select all 40 records" })).toBeTruthy();

    rerender(
      <BulkActionsBar
        selectedCount={40}
        totalCount={40}
        onSelectAllPages={() => {}}
      />,
    );
    expect(screen.queryByRole("button", { name: /Select all/ })).toBeNull();
  });

  it("clears the selection", () => {
    const onClear = vi.fn();
    render(<BulkActionsBar selectedCount={2} onClear={onClear} />);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalled();
  });
});
