import * as React from "react";
import {
  AppShell,
  ThemeProvider,
  ThemeToggle,
  NotificationBell,
  ToastProvider,
  PageHeader,
  Button,
  StatCard,
  FilterBar,
  SearchInput,
  Select,
  DateField,
  DataTable,
  Pagination,
  useToast,
  inr,
} from "../../index";
import expenseColumns from "./expenseColumns";
import AddExpenseModal from "./AddExpenseModal";
import { EXPENSES, NAV, NOTIFICATIONS } from "./mockData";

// Rebuilds the Expense Tracker screen entirely from system components — the
// reference for how everything composes. Delete once real screens exist.
const Screen = () => {
  const toast = useToast();
  const [selected, setSelected] = React.useState(new Set());
  const [addOpen, setAddOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const notifications = React.useMemo(NOTIFICATIONS, []);

  const columns = React.useMemo(
    () =>
      expenseColumns((action, row) =>
        toast.push({
          title: `${action} ${row.id}`,
          tone: action === "Delete" ? "danger" : "neutral",
        }),
      ),
    [toast],
  );

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
            notifications={notifications}
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
        <DateField aria-label="From date" className="w-40" />
        <Select
          placeholder="All categories"
          options={[
            { value: "all", label: "All categories" },
            { value: "utilities", label: "Utilities" },
            { value: "maintenance", label: "Maintenance" },
          ]}
          className="w-44"
        />
        <SearchInput
          placeholder="Search by vendor, description, ID…"
          onSearch={() => {}}
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

      <AddExpenseModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onSave={() => toast.push({ title: "Expense recorded", tone: "success" })}
      />
    </AppShell>
  );
};

const ExpenseTracker = () => (
  <ThemeProvider>
    <ToastProvider>
      <Screen />
    </ToastProvider>
  </ThemeProvider>
);

export default ExpenseTracker;
