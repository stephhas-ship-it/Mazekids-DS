import StatusBadge from "../../components/ui/StatusBadge/StatusBadge";
import { inr } from "../../utils/format";

export const DEMO_COLS = [
  { key: "id", header: "ID", cell: (r) => r.id, width: 110 },
  { key: "vendor", header: "Vendor", cell: (r) => r.vendor },
  {
    key: "amount",
    header: "Amount (₹)",
    cell: (r) => inr(r.amount),
    numeric: true,
  },
  {
    key: "status",
    header: "Status",
    cell: (r) => <StatusBadge status={r.status} />,
  },
];

export const DEMO_ROWS = [
  { id: "EXP-001", vendor: "BESCOM", amount: 18500, status: "Paid" },
  { id: "EXP-002", vendor: "Jain Hardware", amount: 120000, status: "Pending" },
  { id: "EXP-003", vendor: "ABC Transport", amount: 28500, status: "Overdue" },
];

export const demoNotifications = () => [
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
    title: "Fee payment received — ₹18,500",
    description: "Aarav Sharma · INV-2481",
    time: new Date(Date.now() - 2 * 3_600_000),
    read: false,
    tone: "success",
  },
  {
    id: "n3",
    title: "March payroll processed",
    time: new Date(Date.now() - 26 * 3_600_000),
    read: true,
  },
];

export const searchStudents = async (q) => {
  await new Promise((r) => setTimeout(r, 300));
  return [
    { value: "s1", label: "Aarav Sharma", hint: "UKG-A" },
    { value: "s2", label: "Myra Patel", hint: "LKG-B" },
    { value: "s3", label: "Kabir Singh", hint: "Nursery" },
  ].filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));
};

export const DEMO_CIRCULAR =
  "<h3>Summer break schedule</h3><p>The center closes <strong>15 May – 1 June</strong>. " +
  "Fee reminders pause during the break.</p><ul><li>Last working day: 14 May</li>" +
  "<li>Reopening: 2 June</li></ul>";
