/* Preview.jsx — every component, every state, one page.
   The fastest way to visually audit a token change or dark mode:
   render <Preview /> at a route, hit the theme toggle, scroll.
   Not exported from the barrel — import directly:
     import Preview from "@mazekids/design-system/src/Preview.jsx" */
import * as React from "react";
import {
  Button, StatusBadge, Avatar, CategoryTag, Skeleton, SkeletonStatCard,
  SkeletonTableRows, EmptyState, Badge, Field, Input, Textarea, Select,
  Checkbox, SearchInput, DateField, Modal, Drawer, ConfirmDialog, Tooltip,
  ActionsMenu, ToastProvider, useToast, DataTable, Pagination,
  BulkActionsBar, StatCard, FilterBar, Tabs, TabPanel, PageHeader,
  Breadcrumb, ProgressBar, Switch, RadioGroup, Alert, Banner,
  DateRangeField, Stack, Inline, Spinner, DescriptionList, Combobox,
  MultiSelect, FileUpload, Stepper, ThemeProvider, ThemeToggle,
  TrendLine, MoneyBars, Donut, inr,
  NotificationBell, NotificationList, RichTextEditor, RichTextContent,
} from "./index";

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 border-b border-border pb-2 font-display text-lg text-ink">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

const DEMO_COLS = [
  { key: "id", header: "ID", cell: (r) => r.id, width: 110 },
  { key: "vendor", header: "Vendor", cell: (r) => r.vendor },
  { key: "amount", header: "Amount (₹)", cell: (r) => inr(r.amount), numeric: true },
  { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
];
const DEMO_ROWS = [
  { id: "EXP-001", vendor: "BESCOM", amount: 18500, status: "Paid" },
  { id: "EXP-002", vendor: "Jain Hardware", amount: 120000, status: "Pending" },
  { id: "EXP-003", vendor: "ABC Transport", amount: 28500, status: "Overdue" },
];

function PreviewBody() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [sel, setSel] = React.useState(new Set(["EXP-001"]));
  const [tab, setTab] = React.useState("t1");
  const [checked, setChecked] = React.useState(true);
  const [on, setOn] = React.useState(true);
  const [radio, setRadio] = React.useState("monthly");
  const [date, setDate] = React.useState("2026-04-01");
  const [range, setRange] = React.useState({ from: "2026-04-01", to: "2026-04-30" });
  const [student, setStudent] = React.useState(null);
  const [batches, setBatches] = React.useState(["morning"]);
  const [files, setFiles] = React.useState([]);
  const [step, setStep] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [circular, setCircular] = React.useState(
    "<h3>Summer break schedule</h3><p>The center closes <strong>15 May – 1 June</strong>. Fee reminders pause during the break.</p><ul><li>Last working day: 14 May</li><li>Reopening: 2 June</li></ul>",
  );
  const demoNotifications = [
    { id: "n1", title: "3 expenses awaiting approval", description: "Jain Hardware, ABC Transport +1", time: new Date(Date.now() - 25 * 60_000), read: false, tone: "warning" },
    { id: "n2", title: "Fee payment received — ₹18,500", description: "Aarav Sharma · INV-2481", time: new Date(Date.now() - 2 * 3_600_000), read: false, tone: "success" },
    { id: "n3", title: "March payroll processed", time: new Date(Date.now() - 26 * 3_600_000), read: true },
  ];

  const fakeSearch = async (q) => {
    await new Promise((r) => setTimeout(r, 300));
    return [
      { value: "s1", label: "Aarav Sharma", hint: "UKG-A" },
      { value: "s2", label: "Myra Patel", hint: "LKG-B" },
      { value: "s3", label: "Kabir Singh", hint: "Nursery" },
    ].filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">
          Component preview — all states
        </h1>
        <ThemeToggle />
      </div>

      <Section title="Buttons">
        <Inline gap={2}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete expense</Button>
          <Button loading>Saving…</Button>
          <Button disabled>Disabled</Button>
          <Button size="icon" aria-label="More options">⋯</Button>
        </Inline>
      </Section>

      <Section title="Status, tags & badges">
        <Inline gap={2}>
          {["Paid", "Pending", "Overdue", "Draft", "Approved"].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </Inline>
        <Inline gap={2}>
          {["Utilities", "Maintenance", "Salaries", "Transport", "Supplies"].map(
            (c, i) => <CategoryTag key={c} label={c} index={i} />,
          )}
        </Inline>
        <Inline gap={3}>
          <span className="text-sm text-ink">Approvals <Badge count={3} /></span>
          <span className="text-sm text-ink">Overdue <Badge count={7} tone="danger" /></span>
          <span className="text-sm text-ink">Queue <Badge count={240} tone="primary" /></span>
        </Inline>
        <Inline gap={2}><Avatar name="Priya Mehta" /><Avatar name="Stephen L" /></Inline>
      </Section>

      <Section title="Stats & loading">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="This month" value={inr(386100)} delta="+29.6%" />
          <SkeletonStatCard />
          <StatCard label="Pending" value={inr(86100)} delta="23 families" deltaTone="warning" />
        </div>
        <div className="rounded-card border border-border bg-surface-2">
          <SkeletonTableRows rows={3} cols={4} />
        </div>
        <Inline gap={3}><Spinner /><Skeleton className="h-4 w-40" /></Inline>
      </Section>

      <Section title="Forms">
        <div className="grid max-w-lg grid-cols-1 gap-4">
          <Field label="Vendor" required help="Registered vendor name.">
            <Input placeholder="e.g. BESCOM" />
          </Field>
          <Field label="Amount (₹)" error="Enter an amount above 0.">
            <Input placeholder="0" aria-invalid />
          </Field>
          <Field label="Notes"><Textarea placeholder="Optional" /></Field>
          <Field label="Category">
            <Select
              value="utilities"
              onValueChange={() => {}}
              options={[
                { value: "utilities", label: "Utilities" },
                { value: "maintenance", label: "Maintenance" },
              ]}
            />
          </Field>
          <SearchInput placeholder="Search students…" onSearch={() => {}} />
          <Field label="Payment date"><DateField value={date} onChange={setDate} /></Field>
          <DateRangeField from={range.from} to={range.to} onChange={setRange} />
          <Checkbox checked={checked} onCheckedChange={setChecked} label="Notify parent" />
          <Switch checked={on} onCheckedChange={setOn} label="Auto-reminders" />
          <RadioGroup
            value={radio}
            onValueChange={setRadio}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
            ]}
          />
        </div>
      </Section>

      <Section title="Pickers">
        <div className="grid max-w-lg grid-cols-1 gap-4">
          <Field label="Student (async Combobox — type 'a')">
            <Combobox loadOptions={fakeSearch} value={student} onChange={setStudent} placeholder="Search students…" />
          </Field>
          <Field label="Batches (MultiSelect)">
            <MultiSelect
              options={[
                { value: "morning", label: "Morning batch" },
                { value: "afternoon", label: "Afternoon batch" },
                { value: "daycare", label: "Daycare" },
              ]}
              value={batches}
              onChange={setBatches}
            />
          </Field>
          <Field label="Receipt (FileUpload)">
            <FileUpload files={files} onFilesChange={setFiles} accept=".pdf,image/*" maxSizeMb={5} multiple />
          </Field>
        </div>
      </Section>

      <Section title="Stepper">
        <Stepper
          steps={[{ label: "Details" }, { label: "Guardians" }, { label: "Fees" }, { label: "Review" }]}
          current={step}
          onStepClick={setStep}
        />
        <Inline gap={2}>
          <Button variant="secondary" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
          <Button size="sm" onClick={() => setStep((s) => Math.min(3, s + 1))}>Continue</Button>
        </Inline>
      </Section>

      <Section title="Page structure">
        <PageHeader
          icon="₹"
          breadcrumb={[{ label: "Billing", href: "#b" }, { label: "Expenses" }]}
          title="Expense Tracker"
          subtitle="Track, categorize, and manage all school expenses"
          actions={<Button size="sm">+ Add expense</Button>}
        />
        <FilterBar>
          <SearchInput placeholder="Search expenses…" onSearch={() => {}} className="w-56" />
          <Button variant="secondary" size="sm">Export</Button>
        </FilterBar>
        <Tabs
          tabs={[
            { value: "t1", label: "All" },
            { value: "t2", label: "Pending" },
            { value: "t3", label: "Overdue" },
          ]}
          value={tab}
          onValueChange={setTab}
        >
          <TabPanel value="t1"><Stack gap={2}><span className="text-sm text-ink-secondary">All 9 expenses.</span></Stack></TabPanel>
          <TabPanel value="t2"><span className="text-sm text-ink-secondary">3 pending approvals.</span></TabPanel>
          <TabPanel value="t3"><span className="text-sm text-ink-secondary">1 overdue payment.</span></TabPanel>
        </Tabs>
      </Section>

      <Section title="Notices">
        <Banner tone="warning" onDismiss={() => toast.push({ title: "Banner dismissed." })}>
          Fee structure changes on 1 April. <a href="#fees">Review changes</a>
        </Banner>
        <Alert tone="info" title="Bank holiday">Payouts scheduled for 2 April will process on 3 April.</Alert>
        <Alert tone="danger" title="Couldn't sync attendance">Check your connection and try again.</Alert>
      </Section>

      <Section title="Table & bulk actions">
        <BulkActionsBar
          selectedCount={sel.size}
          totalCount={9}
          onSelectAllPages={() => toast.push({ title: "Selected all 9 records." })}
          onClear={() => setSel(new Set())}
        >
          <Button variant="secondary" size="sm">Export</Button>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>Delete</Button>
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
        <DataTable columns={DEMO_COLS} rows={[]} rowKey={(r) => r.id} emptyTitle="No expenses yet" emptyDescription="Record your first expense to see it here." />
      </Section>

      <Section title="Detail view">
        <Breadcrumb items={[{ label: "Billing", href: "#b" }, { label: "EXP-001" }]} />
        <DescriptionList
          columns={2}
          items={[
            { label: "Vendor", value: "BESCOM" },
            { label: "Amount", value: inr(18500) },
            { label: "Category", value: <CategoryTag label="Utilities" index={0} /> },
            { label: "Status", value: <StatusBadge status="Paid" /> },
          ]}
        />
        <ProgressBar value={62} label="Budget used" />
      </Section>

      <Section title="Overlays & toasts">
        <Inline gap={2}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Open ConfirmDialog</Button>
          <Tooltip label="Helpful hint"><Button variant="ghost">Hover me</Button></Tooltip>
          <ActionsMenu items={[{ label: "Edit", onSelect: () => {} }, { label: "Delete", onSelect: () => {} }]} />
          <Button
            variant="secondary"
            onClick={() =>
              toast.promise(new Promise((r) => setTimeout(r, 1200)), {
                loading: "Saving expense…",
                success: "Expense recorded.",
                error: "Couldn't save the expense.",
              })
            }
          >
            toast.promise demo
          </Button>
        </Inline>
        <Modal open={modalOpen} onOpenChange={setModalOpen} title="Edit expense" description="EXP-001 · BESCOM" footer={<Button onClick={() => setModalOpen(false)}>Save changes</Button>}>
          <Field label="Amount (₹)"><Input defaultValue="18500" /></Field>
        </Modal>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Expense detail">
          <div className="p-5"><DescriptionList items={[{ label: "Vendor", value: "BESCOM" }]} /></div>
        </Drawer>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete EXP-001?"
          description="This can't be undone."
          confirmLabel="Delete expense"
          onConfirm={() => {
            setConfirmOpen(false);
            toast.push({ title: "Deleted EXP-001.", tone: "danger" });
          }}
        />
      </Section>

      <Section title="Notifications">
        <Inline gap={3}>
          <NotificationBell
            notifications={demoNotifications}
            onMarkAllRead={() => toast.push({ title: "All marked read." })}
            onNotificationClick={(n) => toast.push({ title: `Opened: ${n.title}` })}
            onViewAll={() => toast.push({ title: "View all." })}
          />
          <span className="text-sm text-ink-muted">← bell with unread count; list below is the standalone component</span>
        </Inline>
        <div className="max-w-md rounded-card border border-border bg-surface-2">
          <NotificationList notifications={demoNotifications} onNotificationClick={() => {}} />
        </div>
        <div className="max-w-md rounded-card border border-border bg-surface-2">
          <NotificationList notifications={[]} />
        </div>
      </Section>

      <Section title="Rich text (circulars)">
        <RichTextEditor value={circular} onChange={setCircular} placeholder="Write the circular…" />
        <div className="rounded-card border border-border bg-surface-2 p-4">
          <div className="mb-2 text-xs font-medium text-ink-muted">Saved render (RichTextContent):</div>
          <RichTextContent html={circular} />
        </div>
      </Section>

      <Section title="Charts">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <TrendLine labels={["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]} data={[3.1, 3.4, 3.0, 3.9, 3.6, 4.3]} ariaLabel="Collections trend" />
          </div>
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <MoneyBars labels={["Jan", "Feb", "Mar"]} collected={[3.0, 3.9, 4.3]} pending={[0.6, 0.8, 0.9]} ariaLabel="Collected vs pending" />
          </div>
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <Donut labels={["Salaries", "Utilities", "Supplies"]} data={[55, 25, 20]} ariaLabel="Expense mix" />
          </div>
        </div>
      </Section>

      <Section title="Empty state (font-accent lives here)">
        <div className="rounded-card border border-border bg-surface-2">
          <EmptyState
            title="No expenses yet"
            description="Record your first expense to see it here."
            action={<Button>+ Add expense</Button>}
          />
        </div>
      </Section>
    </div>
  );
}

export default function Preview() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PreviewBody />
      </ToastProvider>
    </ThemeProvider>
  );
}
