import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders nothing without items", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("links every item except the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Billing", href: "/billing" },
          { label: "Expenses" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Billing" })).toBeTruthy();
    expect(screen.getByText("Expenses").getAttribute("aria-current")).toBe("page");
  });
});
