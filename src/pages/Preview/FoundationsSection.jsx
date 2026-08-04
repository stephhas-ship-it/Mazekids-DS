import {
  Button,
  StatusBadge,
  CategoryTag,
  Badge,
  Avatar,
  StatCard,
  SkeletonStatCard,
  SkeletonTableRows,
  Skeleton,
  Spinner,
  Inline,
  inr,
} from "../../index";
import Section from "./Section";

const FoundationsSection = () => (
  <>
    <Section title="Buttons">
      <Inline space={2}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete expense</Button>
        <Button loading>Saving…</Button>
        <Button disabled>Disabled</Button>
        <Button size="icon" aria-label="More options">
          ⋯
        </Button>
      </Inline>
    </Section>

    <Section title="Status, tags & badges">
      <Inline space={2}>
        {["Paid", "Pending", "Overdue", "Draft", "Approved"].map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </Inline>
      <Inline space={2}>
        {["Utilities", "Maintenance", "Salaries", "Transport", "Supplies"].map(
          (c, i) => (
            <CategoryTag key={c} label={c} index={i} />
          ),
        )}
      </Inline>
      <Inline space={3}>
        <span className="text-sm text-ink">
          Approvals <Badge count={3} />
        </span>
        <span className="text-sm text-ink">
          Overdue <Badge count={7} tone="danger" />
        </span>
        <span className="text-sm text-ink">
          Queue <Badge count={240} tone="primary" />
        </span>
      </Inline>
      <Inline space={2}>
        <Avatar name="Priya Mehta" />
        <Avatar name="Stephen L" />
      </Inline>
    </Section>

    <Section title="Stats & loading">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="This month" value={inr(386100)} delta="+29.6%" />
        <SkeletonStatCard />
        <StatCard
          label="Pending"
          value={inr(86100)}
          delta="23 families"
          deltaTone="warning"
        />
      </div>
      <div className="rounded-card border border-border bg-surface-2">
        <SkeletonTableRows rows={3} cols={4} />
      </div>
      <Inline space={3}>
        <Spinner />
        <Skeleton className="h-4 w-40" />
      </Inline>
    </Section>
  </>
);

export default FoundationsSection;
