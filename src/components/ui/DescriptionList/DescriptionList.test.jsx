import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DescriptionList from "./DescriptionList";

describe("DescriptionList", () => {
  it("renders each label and value", () => {
    render(
      <DescriptionList
        items={[
          { label: "Vendor", value: "BESCOM" },
          { label: "Amount", value: "₹18,500" },
        ]}
      />,
    );
    expect(screen.getByText("Vendor")).toBeTruthy();
    expect(screen.getByText("BESCOM")).toBeTruthy();
  });

  it("falls back to an em dash for a missing value", () => {
    render(<DescriptionList items={[{ label: "Notes", value: null }]} />);
    expect(screen.getByText("—")).toBeTruthy();
  });
});
