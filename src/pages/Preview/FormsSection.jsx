import * as React from "react";
import {
  Field,
  Input,
  Textarea,
  Select,
  SearchInput,
  DateField,
  DateRangeField,
  Checkbox,
  Switch,
  RadioGroup,
  Combobox,
  MultiSelect,
  FileUpload,
  Stepper,
  Button,
  Inline,
} from "../../index";
import Section from "./Section";
import { searchStudents } from "./mockData";

const STEPS = [
  { label: "Details" },
  { label: "Guardians" },
  { label: "Fees" },
  { label: "Review" },
];

const FormsSection = () => {
  const [form, setForm] = React.useState({
    date: "2026-04-01",
    range: { from: "2026-04-01", to: "2026-04-30" },
    notify: true,
    reminders: true,
    frequency: "monthly",
    student: null,
    batches: ["morning"],
    files: [],
  });
  const [step, setStep] = React.useState(1);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <Section title="Forms">
        <div className="grid max-w-lg grid-cols-1 gap-4">
          <Field label="Vendor" required help="Registered vendor name.">
            <Input placeholder="e.g. BESCOM" />
          </Field>
          <Field label="Amount (₹)" error="Enter an amount above 0.">
            <Input placeholder="0" />
          </Field>
          <Field label="Notes">
            <Textarea placeholder="Optional" />
          </Field>
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
          <Field label="Payment date">
            <DateField value={form.date} onChange={(v) => set("date", v)} />
          </Field>
          <DateRangeField
            from={form.range.from}
            to={form.range.to}
            onChange={(v) => set("range", v)}
          />
          <Checkbox
            checked={form.notify}
            onCheckedChange={(v) => set("notify", v)}
            label="Notify parent"
          />
          <Switch
            checked={form.reminders}
            onCheckedChange={(v) => set("reminders", v)}
            label="Auto-reminders"
          />
          <RadioGroup
            value={form.frequency}
            onValueChange={(v) => set("frequency", v)}
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
            <Combobox
              loadOptions={searchStudents}
              value={form.student}
              onChange={(v) => set("student", v)}
              placeholder="Search students…"
            />
          </Field>
          <Field label="Batches (MultiSelect)">
            <MultiSelect
              options={[
                { value: "morning", label: "Morning batch" },
                { value: "afternoon", label: "Afternoon batch" },
                { value: "daycare", label: "Daycare" },
              ]}
              value={form.batches}
              onChange={(v) => set("batches", v)}
            />
          </Field>
          <Field label="Receipt (FileUpload)">
            <FileUpload
              files={form.files}
              onFilesChange={(v) => set("files", v)}
              accept=".pdf,image/*"
              maxSizeMb={5}
              multiple
            />
          </Field>
        </div>
      </Section>

      <Section title="Stepper">
        <Stepper steps={STEPS} current={step} onStepClick={setStep} />
        <Inline space={2}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button size="sm" onClick={() => setStep((s) => Math.min(3, s + 1))}>
            Continue
          </Button>
        </Inline>
      </Section>
    </>
  );
};

export default FormsSection;
