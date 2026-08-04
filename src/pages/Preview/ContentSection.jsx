import * as React from "react";
import {
  RichTextEditor,
  RichTextContent,
  TrendLine,
  MoneyBars,
  Donut,
  EmptyState,
  Button,
} from "../../index";
import Section from "./Section";
import { DEMO_CIRCULAR } from "./mockData";

const ContentSection = () => {
  const [circular, setCircular] = React.useState(DEMO_CIRCULAR);

  return (
    <>
      <Section title="Rich text (circulars)">
        <RichTextEditor
          value={circular}
          onChange={setCircular}
          placeholder="Write the circular…"
        />
        <div className="rounded-card border border-border bg-surface-2 p-4">
          <div className="mb-2 text-xs font-medium text-ink-muted">
            Saved render (RichTextContent):
          </div>
          <RichTextContent html={circular} />
        </div>
      </Section>

      <Section title="Charts">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <TrendLine
              labels={["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]}
              data={[3.1, 3.4, 3.0, 3.9, 3.6, 4.3]}
              ariaLabel="Collections trend"
            />
          </div>
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <MoneyBars
              labels={["Jan", "Feb", "Mar"]}
              collected={[3.0, 3.9, 4.3]}
              pending={[0.6, 0.8, 0.9]}
              ariaLabel="Collected vs pending"
            />
          </div>
          <div className="rounded-card border border-border bg-surface-2 p-4">
            <Donut
              labels={["Salaries", "Utilities", "Supplies"]}
              data={[55, 25, 20]}
              ariaLabel="Expense mix"
            />
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
    </>
  );
};

export default ContentSection;
