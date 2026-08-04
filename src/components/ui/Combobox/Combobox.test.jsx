import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Combobox from "./Combobox";

const OPTIONS = [
  { value: "s1", label: "Anu Menon" },
  { value: "s2", label: "Arjun Rao" },
];

describe("Combobox", () => {
  it("renders a combobox input", () => {
    render(<Combobox loadOptions={async () => []} placeholder="Search students…" />);
    const box = screen.getByRole("combobox");
    expect(box.getAttribute("aria-expanded")).toBe("false");
    expect(box.getAttribute("aria-autocomplete")).toBe("list");
  });

  it("loads and lists options after the debounce", async () => {
    const loadOptions = vi.fn(async () => OPTIONS);
    render(<Combobox loadOptions={loadOptions} delay={0} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "an" } });

    await waitFor(() => expect(screen.getByText("Anu Menon")).toBeTruthy());
    expect(loadOptions).toHaveBeenCalledWith("an");
  });

  it("selects an option on click", async () => {
    const onChange = vi.fn();
    render(
      <Combobox loadOptions={async () => OPTIONS} onChange={onChange} delay={0} />,
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "an" } });
    await waitFor(() => screen.getByText("Anu Menon"));

    fireEvent.click(screen.getByText("Anu Menon"));
    expect(onChange).toHaveBeenCalledWith(OPTIONS[0]);
  });

  it("shows the empty message when nothing matches", async () => {
    render(<Combobox loadOptions={async () => []} delay={0} emptyMessage="No matches." />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "zzz" } });
    await waitFor(() => expect(screen.getByText("No matches.")).toBeTruthy());
  });

  it("clears the current selection", () => {
    const onChange = vi.fn();
    render(
      <Combobox
        loadOptions={async () => OPTIONS}
        value={OPTIONS[0]}
        onChange={onChange}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Clear selection: Anu Menon" }),
    );
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
