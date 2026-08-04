export const EXPENSES = [
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

export const NAV = [
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
      { label: "Payroll", href: "/billing/payroll", permission: "manage_staff" },
    ],
  },
  { label: "Communication", href: "/comms", permission: "communication" },
  { label: "Settings", href: "/settings", permission: "settings" },
];

export const NOTIFICATIONS = () => [
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
];
