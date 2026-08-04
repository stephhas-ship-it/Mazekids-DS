import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RichTextContent from "./RichTextContent";

describe("RichTextContent", () => {
  it("renders saved HTML", () => {
    render(<RichTextContent html="<p>Fees are due on <strong>1 April</strong>.</p>" />);
    expect(screen.getByText("1 April")).toBeTruthy();
  });

  it("renders empty content without crashing", () => {
    const { container } = render(<RichTextContent html="" />);
    expect(container.firstChild.textContent).toBe("");
  });
});
