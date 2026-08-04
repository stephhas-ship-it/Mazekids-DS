import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title as the page heading", () => {
    render(<PageHeader title="Expenses" />);
    expect(screen.getByRole("heading", { level: 1, name: "Expenses" })).toBeTruthy();
  });

  it("renders breadcrumb, subtitle and actions", () => {
    render(
      <PageHeader
        title="Expenses"
        subtitle="March 2026"
        breadcrumb={[{ label: "Billing", href: "/billing" }, { label: "Expenses" }]}
        actions={<button type="button">Add expense</button>}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByText("March 2026")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Add expense" })).toBeTruthy();
  });
});
