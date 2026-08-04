import {
  Avatar,
  CategoryTag,
  StatusBadge,
  ActionsMenu,
  inr,
  formatDateLong,
} from "../../index";

const expenseColumns = (onRowAction) => [
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
  { key: "amount", header: "Amount", numeric: true, cell: (r) => inr(r.amount) },
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
          { label: "View", onSelect: () => onRowAction("View", r) },
          { label: "Edit", onSelect: () => onRowAction("Edit", r) },
          {
            label: "Delete",
            danger: true,
            onSelect: () => onRowAction("Delete", r),
          },
        ]}
      />
    ),
  },
];

export default expenseColumns;
