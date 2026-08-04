import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RichTextEditor from "./RichTextEditor";

describe("RichTextEditor", () => {
  it("renders a labelled editing surface", () => {
    render(<RichTextEditor value="<p>Hello</p>" aria-label="Circular body" />);
    expect(screen.getByLabelText("Circular body")).toBeTruthy();
  });

  it("renders a structural-only toolbar", () => {
    render(<RichTextEditor value="" />);
    const toolbar = screen.getByRole("toolbar", { name: "Formatting" });
    expect(toolbar).toBeTruthy();
    expect(screen.getByRole("button", { name: "Bold" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Heading" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /colou?r/i })).toBeNull();
  });
});
