import { describe, it, expect } from "vitest";
import * as barrel from "../src/index.js";

// The barrel is the package's public contract — a rename or a dropped export
// breaks every consumer, so the name list is asserted explicitly.
const COMPONENTS = [
  "Button",
  "StatusBadge",
  "Avatar",
  "CategoryTag",
  "Skeleton",
  "SkeletonStatCard",
  "SkeletonTableRows",
  "EmptyState",
  "Badge",
  "Field",
  "Input",
  "Textarea",
  "Select",
  "Checkbox",
  "SearchInput",
  "DateField",
  "DateRangeField",
  "Modal",
  "ConfirmDialog",
  "Drawer",
  "Tooltip",
  "ActionsMenu",
  "ToastProvider",
  "DataTable",
  "Pagination",
  "BulkActionsBar",
  "StatCard",
  "FilterBar",
  "Tabs",
  "TabPanel",
  "Breadcrumb",
  "PageHeader",
  "ProgressBar",
  "Switch",
  "RadioGroup",
  "Alert",
  "Banner",
  "Stack",
  "Inline",
  "Box",
  "Spinner",
  "DescriptionList",
  "Combobox",
  "MultiSelect",
  "FileUpload",
  "Stepper",
  "NotificationBell",
  "NotificationList",
  "RichTextEditor",
  "RichTextContent",
  "AppShell",
  "ThemeProvider",
  "ThemeToggle",
  "TrendLine",
  "MoneyBars",
  "Donut",
];

const HOOKS = ["useTheme", "useToast", "useDebounce"];
const UTILS = [
  "cn",
  "can",
  "ROLE_LABELS",
  "inr",
  "inrPrecise",
  "formatDate",
  "formatDateLong",
  "formatRelativeDays",
  "formatRelativeTime",
];

describe("public barrel", () => {
  it.each(COMPONENTS)("exports %s as a component", (name) => {
    expect(typeof barrel[name]).toMatch(/function|object/);
  });

  it.each(HOOKS)("exports %s as a hook", (name) => {
    expect(typeof barrel[name]).toBe("function");
  });

  it.each(UTILS)("exports %s", (name) => {
    expect(barrel[name]).toBeDefined();
  });

  it("exposes the chart theme namespace", () => {
    expect(typeof barrel.chartTheme.cssVar).toBe("function");
  });

  it("exports nothing undefined", () => {
    const undefinedExports = Object.entries(barrel)
      .filter(([, v]) => v === undefined)
      .map(([k]) => k);
    expect(undefinedExports).toEqual([]);
  });
});
