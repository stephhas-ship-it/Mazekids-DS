# MazeKids Content Standards (v1.1)

The Content layer — how the product speaks. Mirrors the role ADS's Content
guidance plays (voice & tone, language, vocabulary, date & time). Applies to
every label, empty state, error, toast, and email the product produces.

## Voice — always

**Warm, clear, calm.** We serve people running preschools — often mid-task,
sometimes stressed, not always tech-fluent. Write like a capable colleague:
plain words, short sentences, no jargon, no exclamation marks in operational
UI. The warmth lives in clarity and helpfulness, not in cuteness — this is
the operators' tool, so playful copy stays on the marketing site, not in
payroll. (Same rule as the type system: the Fredoka accent font is
restricted to empty states, onboarding, and celebration moments — see
`--font-accent` in tokens.css. Copy in those moments may be warmer;
operational copy never is.)

## Tone — adapts by moment

- **Routine actions** (save, filter, export): neutral and brief. "Expense recorded."
- **Money and payroll:** extra plain, zero ambiguity, never jokey.
  "₹45,000 will be paid to 24 staff on 01-04-2026."
- **Errors:** own it, say what happened, say what to do next. Never blame the
  user. "Couldn't save the expense. Check your connection and try again."
- **Empty states:** encouraging, action-first. "No expenses yet. Record your
  first expense to see it here."
- **Destructive confirmations:** state the consequence, name the object.
  "Delete EXP-2026-002? This can't be undone."

## UI writing rules

- **Sentence case everywhere** — buttons, titles, labels, menu items.
  ("Add expense", not "Add Expense" or "ADD EXPENSE".)
- Buttons start with a verb and name the object: "Add expense", "Export
  records", "Save changes". Never bare "Submit" / "OK" / "Yes".
- Labels are nouns ("Vendor", "Amount (₹)"); help text is a sentence.
- Toasts confirm in past tense: "Expense recorded." "Invoice sent."
- Numbers in text: numerals, not words ("5 pending approvals").
- Avoid: "please", "oops", "successfully", "invalid input", double negatives.

## Vocabulary — one term per concept, everywhere

| Use | Not | Notes |
| --- | --- | --- |
| Center | Branch, campus, location | "Main Center", "Center — Whitefield" |
| Program | Class, grade, section | Daycare / Nursery / LKG / UKG |
| Staff | Employees, workers | Teaching staff / Non-teaching staff |
| Admission | Enrollment, application | The pipeline record |
| Student | Child, kid | In operational UI; "child" is fine in parent-facing copy |
| Fee | Fees due, tuition | "Fee collection", "Pending fees" |
| Expense | Spend, cost | Money going out |
| Record (verb) | Log, enter | "Record an expense" |
| Guardian | Parent | Inclusive default in forms; "parent" acceptable in prose |

Status words are fixed by the taxonomy (`StatusBadge.jsx`): Recorded, Paid,
Approved, Active, Pending, Awaiting, In review, Under review, Overdue,
Rejected, Failed, Draft, Archived, Inactive. Don't coin synonyms ("Done",
"Late") — reuse these.

## Dates, time, and money in copy

- Dates: `17 Mar 2026` in prose and tables; `17-03-2026` in dense/technical
  contexts. Never `03/17/2026`.
- Relative dates only for ≤7 days ("in 2 days", "3 days ago"), always with
  the absolute date available (second line or tooltip).
- Money: always via `inr()` → `₹3,86,100`; lakh/crore words are fine in prose
  ("₹28.5 lakh year-to-date") but numerals in tables. Rupee symbol, never
  "Rs." or "INR" in UI.
- Time (when it appears): 12-hour with lowercase meridiem — "9:30 am".
- Academic year: "AY 2025–26" (en dash).

## Inclusive language

Gender-neutral defaults ("they", "Guardian"), no idioms that don't translate
across India's languages, no ability-based metaphors ("sanity check" →
"consistency check"). Names: one full-name field plus optional preferred
name — don't force first/last structure.

## Empty / error / loading copy patterns

- Empty: **[what's missing]. [action to fix it].** — "No staff added yet.
  Add your first staff member to manage payroll."
- Error: **Couldn't [action]. [most likely cause or next step].**
- Loading: skeletons over spinner text; if text is needed: "Loading
  expenses…" (name the thing, not just "Loading…").
