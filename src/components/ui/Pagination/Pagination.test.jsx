import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders nothing for a single page with no extras", () => {
    const { container } = render(
      <Pagination page={1} pageCount={1} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("marks the current page", () => {
    render(<Pagination page={2} pageCount={3} onPageChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Page 2" }).getAttribute("aria-current"),
    ).toBe("page");
  });

  it("disables previous on the first page and next on the last", () => {
    const { rerender } = render(
      <Pagination page={1} pageCount={3} onPageChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "Previous page" }).disabled).toBe(true);

    rerender(<Pagination page={3} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Next page" }).disabled).toBe(true);
  });

  it("reports the requested page", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
