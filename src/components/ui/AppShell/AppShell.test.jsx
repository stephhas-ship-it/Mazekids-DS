import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppShell from "./AppShell";
import visibleNav from "./visibleNav";

const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Billing", href: "/billing", permission: "billing" },
  { label: "Staff", href: "/staff", permission: "manage_staff" },
];

describe("visibleNav", () => {
  it("keeps unrestricted items for every role", () => {
    expect(visibleNav(NAV, "teacher").map((i) => i.label)).toEqual(["Dashboard"]);
  });

  it("keeps permitted items for the role", () => {
    expect(visibleNav(NAV, "center_admin").map((i) => i.label)).toEqual([
      "Dashboard",
      "Billing",
      "Staff",
    ]);
  });

  it("filters children too", () => {
    const nested = [
      {
        label: "Billing",
        children: [
          { label: "Expenses", href: "/e", permission: "billing" },
          { label: "Payroll", href: "/p", permission: "manage_staff" },
        ],
      },
    ];
    expect(visibleNav(nested, "coordinator")[0].children).toEqual([]);
  });
});

describe("AppShell", () => {
  it("renders children in the main landmark", () => {
    render(
      <AppShell nav={NAV} role="internal_admin" activeHref="/" onNavigate={() => {}}>
        <p>Dashboard content</p>
      </AppShell>,
    );
    expect(screen.getByRole("main").textContent).toContain("Dashboard content");
  });

  it("offers a skip link before the chrome", () => {
    render(
      <AppShell nav={NAV} role="internal_admin" activeHref="/" onNavigate={() => {}} />,
    );
    expect(screen.getByRole("link", { name: "Skip to content" })).toBeTruthy();
  });

  it("hides nav a role cannot reach", () => {
    render(
      <AppShell nav={NAV} role="teacher" activeHref="/" onNavigate={() => {}} />,
    );
    expect(screen.queryByRole("button", { name: "Billing" })).toBeNull();
  });

  it("navigates from a sidebar item", () => {
    const onNavigate = vi.fn();
    render(
      <AppShell nav={NAV} role="internal_admin" activeHref="/" onNavigate={onNavigate} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Billing" }));
    expect(onNavigate).toHaveBeenCalledWith("/billing");
  });
});
