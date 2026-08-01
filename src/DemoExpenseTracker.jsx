/* DemoExpenseTracker.jsx — proof + documentation. This rebuilds the Expense
   Tracker screen ENTIRELY from system components — the Phase 1 "definition of
   done". Use it as the reference for how everything composes. Delete freely
   once real screens exist. */
import * as React from "react";
import {
  AppShell,
  ThemeProvider,
  ThemeToggle,
  NotificationBell,
  PageHeader,
  Button,
  StatCard,
  FilterBar,
  Input,
  Select,
  DataTable,
  Pagination,
  StatusBadge,
  CategoryTag,
  Avatar,
  ActionsMenu,
  Modal,
  Field,
  ToastProvider,
  useToast,
  inr,
  formatDateLong,
} from "./index";

const EXPENSES = [
  {
    id: "EXP-2026-001",
    date: "2026-03-17",
    category: "Utilities",
    catIndex: 0,
    vendor: "BESCOM",
    amount: 18500,
    status: "Recorded",
  },
  {
    id: "EXP-2026-002",
    date: "2026-03-16",
    category: "Maintenance",
    catIndex: 1,
    vendor: "Jain Hardware",
    amount: 120000,
    status: "Pending",
  },
  {
    id: "EXP-2026-004",
    date: "2026-03-14",
    category: "Transport",
    catIndex: 3,
    vendor: "ABC Transport",
    amount: 28500,
    status: "Overdue",
  },
];

const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Admissions Center", href: "/admissions", permission: "admissions" },
  { label: "Students Center", href: "/students", permission: "students" },
  {
    label: "Billings & Accounts",
    href: "/billing",
    permission: "billing",
    children: [
      {
        label: "Expense Tracker",
        href: "/billing/expenses",
        permission: "billing",
      },
      {
        label: "Payroll",
        href: "/billing/payroll",
        permission: "manage_staff",
      },
    ],
  },
  { label: "Communication", href: "/comms", permission: "communication" },
  { label: "Settings", href: "/settings", permission: "settings" },
];

function Screen() {
  const toast = useToast();
  const [selected, setSelected] = React.useState(new Set());
  const [addOpen, setAddOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const columns = [
    {
      key: "id",
      header: "Expense ID",
      cell: (r) => <span className="font-medium text-ink">{r.id}</span>,
    },
    {
      key: "vendor",
      header: "Vendor",
      cell: (r) => (
        <span className="inline-flex items-center gap-2.5 text-ink">
          <Avatar name={r.vendor} /> {r.vendor}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (r) => <CategoryTag label={r.category} index={r.catIndex} />,
    },
    { key: "date", header: "Date", cell: (r) => formatDateLong(r.date) },
    {
      key: "amount",
      header: "Amount",
      numeric: true,
      cell: (r) => inr(r.amount),
    },
    {
      key: "status",
      header: "Status",
      cell: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "actions",
      header: "",
      width: "48px",
      cell: (r) => (
        <ActionsMenu
          items={[
            {
              label: "View",
              onSelect: () => toast.push({ title: `Viewing ${r.id}` }),
            },
            {
              label: "Edit",
              onSelect: () => toast.push({ title: `Editing ${r.id}` }),
            },
            {
              label: "Delete",
              danger: true,
              onSelect: () =>
                toast.push({ title: `Deleted ${r.id}`, tone: "danger" }),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AppShell
      nav={NAV}
      role="center_admin"
      activeHref="/billing/expenses"
      onNavigate={() => {}}
      userName="Priya Mehta"
      userRoleLabel="Center Admin / Principal"
      topRight={
        <>
          <NotificationBell
            notifications={[
              {
                id: "n1",
                title: "3 expenses awaiting approval",
                description: "Jain Hardware, ABC Transport +1",
                time: new Date(Date.now() - 25 * 60_000),
                read: false,
                tone: "warning",
              },
              {
                id: "n2",
                title: "March payroll processed",
                description: "₹4,20,000 to 24 staff",
                time: new Date(Date.now() - 5 * 3_600_000),
                read: true,
                tone: "success",
              },
            ]}
            onMarkAllRead={() => {}}
            onNotificationClick={() => {}}
          />
          <ThemeToggle />
        </>
      }
    >
      <PageHeader
        icon="₹"
        breadcrumb={[
          { label: "Billings & Accounts", href: "/billing" },
          { label: "Expense Tracker" },
        ]}
        title="Expense Tracker"
        subtitle="Track, categorize, and manage all school expenses"
        actions={
          <>
            <Button variant="secondary">Export</Button>
            <Button onClick={() => setAddOpen(true)}>+ Add expense</Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="This month" value={inr(386100)} delta="+29.6%" />
        <StatCard
          label="Top category"
          value="Maintenance"
          delta={inr(120000)}
          deltaTone="neutral"
        />
        <StatCard
          label="Pending approvals"
          value={5}
          delta="awaiting"
          deltaTone="warning"
        />
        <StatCard
          label="Year-to-date"
          value={inr(2850000)}
          delta="Apr 2025 – Mar 2026"
          deltaTone="neutral"
        />
      </div>

      <FilterBar className="mb-4">
        <Input type="date" className="w-40" aria-label="From date" />
        <Select
          placeholder="All categories"
          options={[
            { value: "all", label: "All categories" },
            { value: "utilities", label: "Utilities" },
            { value: "maintenance", label: "Maintenance" },
          ]}
          className="w-44"
        />

        <Input
          placeholder="Search by vendor, description, ID…"
          className="min-w-52 flex-1"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        rows={EXPENSES}
        rowKey={(r) => r.id}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        emptyTitle="No expenses yet"
        emptyDescription="Record your first expense to see it here."
        emptyAction={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            + Add expense
          </Button>
        }
      />

      <Pagination
        page={page}
        pageCount={3}
        onPageChange={setPage}
        totalLabel="Showing 1–3 of 17 records"
      />

      <Modal
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add expense"
        description="Record a new school expense."
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setAddOpen(false);
                toast.push({ title: "Expense recorded", tone: "success" });
              }}
            >
              Save expense
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Field label="Vendor" required>
            <Input placeholder="e.g. Jain Hardware" />
          </Field>
          <Field
            label="Amount (₹)"
            required
            help="Use whole rupees — formatting is automatic."
          >
            <Input type="number" placeholder="45000" />
          </Field>
        </div>
      </Modal>
    </AppShell>
  );
}

export default function DemoExpenseTracker() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Screen />
      </ToastProvider>
    </ThemeProvider>
  );
}
