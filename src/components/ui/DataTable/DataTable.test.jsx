import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

const COLUMNS = [
  { key: "id", header: "ID", cell: (r) => r.id, sortable: true },
  { key: "amount", header: "Amount", cell: (r) => r.amount, numeric: true },
];
const ROWS = [
  { id: "EXP-1", amount: 1800 },
  { id: "EXP-2", amount: 2400 },
];
const rowKey = (r) => r.id;

describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={rowKey} />);
    expect(screen.getByText("EXP-1")).toBeTruthy();
    expect(screen.getByText("EXP-2")).toBeTruthy();
  });

  it("uses column-scoped header cells", () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={rowKey} />);
    expect(
      screen.getAllByRole("columnheader").every((th) => th.getAttribute("scope") === "col"),
    ).toBe(true);
  });

  it("exposes sortable headers as buttons with aria-sort", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        columns={COLUMNS}
        rows={ROWS}
        rowKey={rowKey}
        sort={{ key: "id", dir: "asc" }}
        onSortChange={onSortChange}
      />,
    );
    const header = screen.getByRole("columnheader", { name: /ID/ });
    expect(header.getAttribute("aria-sort")).toBe("ascending");

    fireEvent.click(screen.getByRole("button", { name: /ID/ }));
    expect(onSortChange).toHaveBeenCalledWith({ key: "id", dir: "desc" });
  });

  it("renders the loading state", () => {
    const { container } = render(
      <DataTable columns={COLUMNS} rows={[]} rowKey={rowKey} loading />,
    );
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders the empty state", () => {
    render(
      <DataTable
        columns={COLUMNS}
        rows={[]}
        rowKey={rowKey}
        emptyTitle="No expenses yet"
      />,
    );
    expect(screen.getByText("No expenses yet")).toBeTruthy();
  });

  it("renders the error state", () => {
    render(
      <DataTable
        columns={COLUMNS}
        rows={[]}
        rowKey={rowKey}
        error="Network unreachable"
      />,
    );
    expect(screen.getByText("Couldn't load records")).toBeTruthy();
    expect(screen.getByText("Network unreachable")).toBeTruthy();
  });

  it("selects every row from the header checkbox", () => {
    const onSelectedChange = vi.fn();
    render(
      <DataTable
        columns={COLUMNS}
        rows={ROWS}
        rowKey={rowKey}
        selectable
        selected={new Set()}
        onSelectedChange={onSelectedChange}
      />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectedChange).toHaveBeenCalledWith(new Set(["EXP-1", "EXP-2"]));
  });
});
