/* smoke.test.jsx — renders every component with minimal props.
   Catches broken exports, missing imports, and render-time crashes.
   Chart components are import-checked only (Chart.js needs a real
   canvas, which jsdom doesn't provide). */
import { describe, it, expect } from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import {
  Button, StatusBadge, Avatar, CategoryTag, Skeleton, SkeletonStatCard,
  SkeletonTableRows, EmptyState, Badge, Field, Input, Textarea, Select,
  Checkbox, SearchInput, DateField, Modal, Drawer, Tooltip, ActionsMenu,
  ToastProvider, ConfirmDialog, DataTable, Pagination, BulkActionsBar,
  StatCard, FilterBar, Tabs, TabPanel, PageHeader, Breadcrumb, ProgressBar,
  Switch, RadioGroup, Alert, Banner, DateRangeField, Stack, Inline, Box,
  Spinner, DescriptionList, Combobox, MultiSelect, FileUpload, Stepper,
  AppShell, ThemeProvider, ThemeToggle,
  NotificationBell, NotificationList, RichTextEditor, RichTextContent,
} from "../src/index.js";
import * as barrel from "../src/index.js";

const wrap = (ui) => (
  <ThemeProvider>
    <ToastProvider>{ui}</ToastProvider>
  </ThemeProvider>
);

const cases = [
  ["Button", <Button>Save</Button>],
  ["Button destructive", <Button variant="destructive">Delete</Button>],
  ["StatusBadge", <StatusBadge status="Paid" />],
  ["Avatar", <Avatar name="Priya Mehta" />],
  ["CategoryTag", <CategoryTag label="Utilities" index={0} />],
  ["Skeleton", <Skeleton className="h-4 w-20" />],
  ["SkeletonStatCard", <SkeletonStatCard />],
  ["SkeletonTableRows", <SkeletonTableRows rows={2} cols={3} />],
  ["EmptyState", <EmptyState title="Nothing here yet" />],
  ["Badge", <Badge count={3} />],
  ["Field+Input", <Field label="Vendor" error="Required"><Input /></Field>],
  ["Textarea", <Textarea />],
  ["Select", <Select options={[{ value: "a", label: "A" }]} value="a" onValueChange={() => {}} />],
  ["Checkbox", <Checkbox checked onCheckedChange={() => {}} label="Agree" />],
  ["SearchInput", <SearchInput onSearch={() => {}} />],
  ["DateField", <DateField value="2026-04-01" onChange={() => {}} />],
  ["Modal", <Modal open onOpenChange={() => {}} title="Edit expense" />],
  ["Drawer", <Drawer open onOpenChange={() => {}} title="Detail" />],
  ["ConfirmDialog", <ConfirmDialog open onOpenChange={() => {}} title="Delete EXP-1?" confirmLabel="Delete expense" onConfirm={() => {}} />],
  ["Tooltip", <Tooltip label="Hint"><button>i</button></Tooltip>],
  ["ActionsMenu", <ActionsMenu items={[{ label: "Edit", onSelect: () => {} }]} />],
  ["DataTable", <DataTable columns={[{ key: "a", header: "A", cell: (r) => r.a }]} rows={[{ a: 1 }]} rowKey={(r) => r.a} />],
  ["DataTable states", <DataTable columns={[{ key: "a", header: "A", cell: (r) => r.a }]} rows={[]} rowKey={(r) => r.a} loading />],
  ["Pagination", <Pagination page={1} pageCount={3} onPageChange={() => {}} pageSize={10} onPageSizeChange={() => {}} totalLabel="30 records" />],
  ["BulkActionsBar", <BulkActionsBar selectedCount={2} totalCount={9} onSelectAllPages={() => {}} onClear={() => {}} />],
  ["StatCard", <StatCard label="This month" value="₹3,86,100" delta="+29.6%" />],
  ["FilterBar", <FilterBar><span /></FilterBar>],
  ["Tabs", <Tabs tabs={[{ value: "t1", label: "One" }]} value="t1" onValueChange={() => {}}><TabPanel value="t1">x</TabPanel></Tabs>],
  ["PageHeader", <PageHeader title="Expenses" breadcrumb={[{ label: "Billing", href: "/b" }, { label: "Expenses" }]} />],
  ["Breadcrumb", <Breadcrumb items={[{ label: "Billing", href: "/b" }, { label: "Expenses" }]} />],
  ["ProgressBar", <ProgressBar value={40} label="Budget used" />],
  ["Switch", <Switch checked onCheckedChange={() => {}} label="Active" />],
  ["RadioGroup", <RadioGroup options={[{ value: "a", label: "A" }]} value="a" onValueChange={() => {}} />],
  ["Alert", <Alert tone="info" title="Heads up">Body</Alert>],
  ["Banner", <Banner tone="warning" onDismiss={() => {}}>Fee changes 1 April</Banner>],
  ["DateRangeField", <DateRangeField from="2026-04-01" to="2026-04-30" onChange={() => {}} />],
  ["Stack", <Stack><span /></Stack>],
  ["Inline", <Inline><span /></Inline>],
  ["Box", <Box><span /></Box>],
  ["Spinner", <Spinner />],
  ["DescriptionList", <DescriptionList items={[{ label: "Vendor", value: "BESCOM" }]} />],
  ["Combobox", <Combobox loadOptions={async () => []} value={null} onChange={() => {}} />],
  ["MultiSelect", <MultiSelect options={[{ value: "a", label: "A" }]} value={["a"]} onChange={() => {}} />],
  ["FileUpload", <FileUpload files={[]} onFilesChange={() => {}} />],
  ["Stepper", <Stepper steps={[{ label: "Details" }, { label: "Fees" }]} current={1} onStepClick={() => {}} />],
  ["ThemeToggle", <ThemeToggle />],
  ["NotificationList", <NotificationList notifications={[{ id: "1", title: "Fee received", time: new Date(), read: false }]} />],
  ["NotificationList empty", <NotificationList notifications={[]} />],
  ["NotificationBell", <NotificationBell notifications={[{ id: "1", title: "Fee received", time: new Date(), read: false }]} onMarkAllRead={() => {}} />],
  ["RichTextEditor", <RichTextEditor value="<p>Hello</p>" onChange={() => {}} />],
  ["RichTextContent", <RichTextContent html="<h3>Notice</h3><p>Body</p>" />],
  ["AppShell", <AppShell nav={[{ label: "Dashboard", href: "/" }]} role="center_admin" activeHref="/" onNavigate={() => {}} userName="Priya" userRoleLabel="Admin"><div /></AppShell>],
];

describe("smoke: every component renders", () => {
  it.each(cases)("%s", (_name, ui) => {
    const { unmount } = render(wrap(ui));
    unmount();
  });
});

describe("barrel", () => {
  it("chart components are exported", () => {
    expect(barrel.TrendLine).toBeTypeOf("function");
    expect(barrel.MoneyBars).toBeTypeOf("function");
    expect(barrel.Donut).toBeTypeOf("function");
    expect(barrel.chartTheme.categoricalPalette).toBeTypeOf("function");
  });
  it("utilities are exported", () => {
    expect(barrel.inr(386100)).toContain("3,86,100");
    expect(barrel.cn("a", false && "b")).toBe("a");
    expect(barrel.can("center_admin", "billing")).toBeTypeOf("boolean");
    expect(barrel.formatRelativeTime(new Date())).toBe("just now");
  });
});
