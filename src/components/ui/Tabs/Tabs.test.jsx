import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";
import TabPanel from "./TabPanel";

const TABS = [
  { value: "all", label: "All" },
  { value: "overdue", label: "Overdue" },
];

describe("Tabs", () => {
  it("renders a tab per entry and shows the active panel", () => {
    render(
      <Tabs tabs={TABS} value="all" onValueChange={() => {}}>
        <TabPanel value="all">All expenses</TabPanel>
        <TabPanel value="overdue">Overdue only</TabPanel>
      </Tabs>,
    );
    expect(screen.getAllByRole("tab").length).toBe(2);
    expect(screen.getByText("All expenses")).toBeTruthy();
    expect(screen.queryByText("Overdue only")).toBeNull();
  });

  it("reports the selected tab value", () => {
    const onValueChange = vi.fn();
    render(
      <Tabs tabs={TABS} value="all" onValueChange={onValueChange}>
        <TabPanel value="all">All expenses</TabPanel>
      </Tabs>,
    );
    // Radix activates a tab on mousedown, not click.
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Overdue" }));
    expect(onValueChange).toHaveBeenCalledWith("overdue");
  });
});
