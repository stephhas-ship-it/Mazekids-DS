import * as React from "react";
import {
  PageHeader,
  FilterBar,
  SearchInput,
  Tabs,
  TabPanel,
  Banner,
  Alert,
  BulkActionsBar,
  DataTable,
  Pagination,
  Breadcrumb,
  DescriptionList,
  ProgressBar,
  CategoryTag,
  StatusBadge,
  Button,
  Stack,
  useToast,
  inr,
} from "../../index";
import Section from "./Section";
import { DEMO_COLS, DEMO_ROWS } from "./mockData";

const TABS = [
  { value: "t1", label: "All" },
  { value: "t2", label: "Pending" },
  { value: "t3", label: "Overdue" },
];

const StructureSection = ({ onDeleteRequest }) => {
  const toast = useToast();
  const [tab, setTab] = React.useState("t1");
  const [sel, setSel] = React.useState(new Set(["EXP-001"]));
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <>
      <Section title="Page structure">
        <PageHeader
          icon="₹"
          breadcrumb={[{ label: "Billing", href: "#b" }, { label: "Expenses" }]}
          title="Expense Tracker"
          subtitle="Track, categorize, and manage all school expenses"
          actions={<Button size="sm">+ Add expense</Button>}
        />
        <FilterBar>
          <SearchInput
            placeholder="Search expenses…"
            onSearch={() => {}}
            className="w-56"
          />
          <Button variant="secondary" size="sm">
            Export
          </Button>
        </FilterBar>
        <Tabs tabs={TABS} value={tab} onValueChange={setTab}>
          <TabPanel value="t1">
            <Stack space={2}>
              <span className="text-sm text-ink-secondary">All 9 expenses.</span>
            </Stack>
          </TabPanel>
          <TabPanel value="t2">
            <span className="text-sm text-ink-secondary">3 pending approvals.</span>
          </TabPanel>
          <TabPanel value="t3">
            <span className="text-sm text-ink-secondary">1 overdue payment.</span>
          </TabPanel>
        </Tabs>
      </Section>

      <Section title="Notices">
        <Banner
          tone="warning"
          onDismiss={() => toast.push({ title: "Banner dismissed." })}
        >
          Fee structure changes on 1 April. <a href="#fees">Review changes</a>
        </Banner>
        <Alert tone="info" title="Bank holiday">
          Payouts scheduled for 2 April will process on 3 April.
        </Alert>
        <Alert tone="danger" title="Couldn't sync attendance">
          Check your connection and try again.
        </Alert>
      </Section>

      <Section title="Table & bulk actions">
        <BulkActionsBar
          selectedCount={sel.size}
          totalCount={9}
          onSelectAllPages={() => toast.push({ title: "Selected all 9 records." })}
          onClear={() => setSel(new Set())}
        >
          <Button variant="secondary" size="sm">
            Export
          </Button>
          <Button variant="destructive" size="sm" onClick={onDeleteRequest}>
            Delete
          </Button>
        </BulkActionsBar>
        <DataTable
          columns={DEMO_COLS}
          rows={DEMO_ROWS}
          rowKey={(r) => r.id}
          selectable
          selected={sel}
          onSelectedChange={setSel}
          stickyHeader
          className="max-h-64"
        />
        <Pagination
          page={page}
          pageCount={3}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalLabel="9 records"
        />
        <DataTable columns={DEMO_COLS} rows={[]} rowKey={(r) => r.id} loading />
        <DataTable
          columns={DEMO_COLS}
          rows={[]}
          rowKey={(r) => r.id}
          emptyTitle="No expenses yet"
          emptyDescription="Record your first expense to see it here."
        />
      </Section>

      <Section title="Detail view">
        <Breadcrumb items={[{ label: "Billing", href: "#b" }, { label: "EXP-001" }]} />
        <DescriptionList
          columns={2}
          items={[
            { label: "Vendor", value: "BESCOM" },
            { label: "Amount", value: inr(18500) },
            {
              label: "Category",
              value: <CategoryTag label="Utilities" index={0} />,
            },
            { label: "Status", value: <StatusBadge status="Paid" /> },
          ]}
        />
        <ProgressBar value={62} label="Budget used" />
      </Section>
    </>
  );
};

export default StructureSection;
