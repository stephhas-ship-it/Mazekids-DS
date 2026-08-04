import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchInput from "./SearchInput";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("SearchInput", () => {
  it("renders a searchbox with an accessible name", () => {
    render(<SearchInput placeholder="Search students…" />);
    expect(screen.getByRole("searchbox", { name: "Search students…" })).toBeTruthy();
  });

  it("debounces onSearch instead of firing per keystroke", () => {
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} delay={250} />);
    const box = screen.getByRole("searchbox");

    fireEvent.change(box, { target: { value: "an" } });
    fireEvent.change(box, { target: { value: "anu" } });
    expect(onSearch).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(250));
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("anu");
  });

  it("clears immediately without waiting for the debounce", () => {
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} delay={250} />);
    const box = screen.getByRole("searchbox");

    fireEvent.change(box, { target: { value: "anu" } });
    act(() => vi.advanceTimersByTime(250));
    onSearch.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onSearch).toHaveBeenCalledWith("");
  });
});
