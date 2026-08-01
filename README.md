# MazeKids Design System — v1.3

**Owner / Author:** Stephen L

The complete, production-ready component library for the MazeKids ERP.
Every component is token-driven, accessible (Radix), and ships with its
states (hover, focus, loading, empty, error). Written in plain
JavaScript/JSX against React 18 + Radix.

Build every module — billing, admissions, staff, payroll, communication —
from these pieces. If you're writing raw markup with hex colors, stop: there's
a component or token for it.

---

## Changing colors (re-theming)

All colors live in **one place**: `src/styles/tokens.css`, Section 1
("CHANGE COLORS HERE"). Edit a hex there and everything follows:

- **Brand:** swap the `--forest-*` scale → buttons, nav, links, focus rings recolor.
- **Status:** change `--emerald` / `--amber` / `--red` / `--blue` → the badge
  `*-bg` / `*-fg` tint pairs re-derive automatically via `color-mix()` — no
  hand-picking pastels.
- **Categories & charts:** change an accent (`--gold`, `--terracotta`, …) →
  `CategoryTag` AND every chart follow, because `src/charts/theme.js` resolves
  colors from the CSS tokens at render time.
- **Dark mode:** the `[data-theme="dark"]` block re-derives status pairs
  against the dark surface, so most brand changes need no dark-mode edits.

Never write a hex in a component — `npm run lint:tokens` enforces this.

---

## Dark mode

Dark mode ships wired-in — no component contains a theme conditional.
Three pieces make it work:

1. **Tokens** — the `[data-theme="dark"]` block in `src/styles/tokens.css`
   remaps every semantic token to warm dark-olive surfaces. Status badge
   pairs and chart colors re-derive automatically against the dark surface.
2. **`ThemeProvider`** (`lib/theme.jsx`) — wrap your app root once. It sets
   `data-theme` on `<html>`, respects the OS preference on first load, and
   persists the user's choice in localStorage.
3. **`ThemeToggle`** — a ready-made sun/moon button. Drop it into the
   AppShell's `topRight` slot (the demo shows this).

```jsx
import { ThemeProvider, ThemeToggle, AppShell } from '@mazekids/design-system';

<ThemeProvider>
  <AppShell topRight={<ThemeToggle />} {...props}>
    {page}
  </AppShell>
</ThemeProvider>
```

Programmatic control: `const { theme, setTheme } = useTheme()`.

---

## Install

```bash
npm install react react-dom
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-tabs \
  @radix-ui/react-toast @radix-ui/react-tooltip \
  class-variance-authority clsx tailwind-merge
npm install -D tailwindcss@3 postcss autoprefixer typescript
```

Copy `src/` into your app (or keep it as a workspace package), use the included
`tailwind.config.js`, import `src/styles/globals.css` once at the app root, and
load the fonts (Gabarito + Nunito Sans + Azeret Mono + Fredoka — @import in
GETTING-STARTED.md of the starter kit).

Everything importable from one place:

```ts
import { Button, DataTable, StatCard, inr, can } from './src';
```

---

## What's inside

| Area | Files | Contents |
|---|---|---|
| Tokens | `styles/tokens.css` | Primitive + semantic color layers, radius, fonts. Dark theme active — `[data-theme="dark"]` remap; toggle via `ThemeProvider` + `ThemeToggle`. |
| Global CSS | `styles/globals.css` | Tailwind layers, base fonts/surfaces, `.tnum` |
| Utilities | `lib/format.js` `lib/cn.js` | `inr()` ₹3,86,100 · `formatDate()` dd-mm-yyyy · `formatDateLong()` · `formatRelativeDays()` · class merging |
| Permissions | `lib/permissions.js` | The 4-role matrix in code: `can(role, permission)` |
| Core | `Button` `StatusBadge` | CVA variants; the status taxonomy (5 tones, statuses map — never new colors) |
| Primitives | `Avatar` `CategoryTag` `Skeleton` `EmptyState` | Category colors by fixed index; 6th+ folds to "Other" |
| Forms | `Field` `Input` `Textarea` `Select` `Checkbox` | Label/help/error states built in; Radix Select & Checkbox |
| Overlays | `Modal` `Drawer` `Tooltip` `ActionsMenu` `ToastProvider`/`useToast` | All Radix; brand-styled |
| Spine | `StatCard` `FilterBar` `Tabs` `PageHeader` | The canonical KPI anatomy; one page-header pattern |
| Extras | `ProgressBar` `Switch` `RadioGroup` `Alert` | Program-distribution bars; settings toggles; inline banners on the status taxonomy |
| Table | `DataTable<T>` `Pagination` | Generic + typed. Gridded warm hairlines, comfortable rows, bulk-select, **sortable columns** (controlled via `sort`/`onSortChange`), right-aligned `tabular-nums` money, loading/empty/error built in |
| Shell | `AppShell` + `NavItem` | Collapsible sidebar with nested groups, filtered by role permission; top bar |
| Charts | `charts/theme.js` | The coloring rules as constants + Chart.js helpers |
| Demo | `DemoExpenseTracker.jsx` | The Expense Tracker rebuilt 100% from system components — your composition reference |

### Components added in v1.3+

| Component | Purpose |
|---|---|
| `SearchInput` | Debounced list-screen search with icon + clear button |
| `DateField` | Single date with dd-mm-yyyy echo (pairs with `DateRangeField`) |
| `Combobox` | Async type-ahead — pick a student/vendor from hundreds |
| `MultiSelect` | Static options with tag chips — batches, centers |
| `FileUpload` | Drag-and-drop receipts/documents with validation |
| `Stepper` | Multi-step flows (admissions) — back-navigable |
| `ConfirmDialog` | THE destructive-action confirm (CONTENT.md copy contract) |
| `Banner` | Page-level dismissible notice (vs `Alert` = inline) |
| `Badge` | Count pill for nav/tabs ("Approvals · 3"), caps at 99+ |
| `Breadcrumb` | Standalone trail; `PageHeader` composes it |
| `DescriptionList` | Key-value grid for detail views |
| `BulkActionsBar` | Acts on DataTable selection; select-all-across-pages |
| `SkeletonStatCard` / `SkeletonTableRows` | Assembled loading presets |
| `ThemeToggle` | Sun/moon button for the AppShell top bar |
| `NotificationBell` | Top-bar bell + unread badge + popover inbox (v1.4) |
| `NotificationList` | Standalone notification list — pages, drawers (v1.4) |
| `RichTextEditor` | Tiptap-based editor for circulars/announcements (v1.4) |
| `RichTextContent` | Read-only render of editor HTML (v1.4) |
| `Stack` / `Inline` / `Box` | Layout primitives |
| `Spinner` | Inline busy indicator |
| `Alert` | Inline contextual notice (info/success/warning/danger) |
| `ProgressBar` | Budget/quota usage |
| `Switch` / `RadioGroup` | Radix-backed toggles |
| `DateRangeField` | From–to date pair |


---

## Quick usage

```tsx
// KPI row
<StatCard label="This month" value={inr(386100)} delta="+29.6%" />

// Status — add statuses to the map in StatusBadge.jsx; never invent a color
<StatusBadge status="Overdue" />

// Table — generic over your row type
const columns: Column<Expense>[] = [
  { key: 'id', header: 'Expense ID', cell: r => r.id },
  { key: 'amount', header: 'Amount', numeric: true, cell: r => inr(r.amount) },
  { key: 'status', header: 'Status', cell: r => <StatusBadge status={r.status} /> },
];
<DataTable columns={columns} rows={expenses} rowKey={r => r.id} selectable
  selected={sel} onSelectedChange={setSel} />

// Role gating — matrix lives in lib/permissions.js
{can(role, 'approve_expenses') && <Button>Approve</Button>}

// Toasts — wrap the app once in <ToastProvider>
const toast = useToast();
toast.push({ title: 'Expense recorded', tone: 'success' });
```

See `DemoExpenseTracker.jsx` for the full composition — shell, header, stats,
filters, table, modal, and toasts working together.

---

## The rules (non-negotiable)

1. **No raw hex in app code.** Colors are tokens (`bg-primary`, `text-ink-muted`).
2. **Components read semantic tokens only** — that's what makes dark mode a one-file change.
3. **Numbers:** body font + `tabular-nums`, right-aligned for money. Never monospace.
4. **Money & dates** go through `format.js` — always ₹3,86,100 and dd-mm-yyyy.
5. **New status → map it to one of the 5 tones** in `StatusBadge.jsx`. New category → next fixed index; 6th+ is "Other".
6. **Roles:** extend the matrix in `permissions.js`; never fork a component per role. UI gating is convenience — the backend must enforce the same matrix.
7. **Rule of two:** extract a pattern into the system on its second use, not speculatively.
8. **Definition of done** per component: all states, keyboard-accessible, responsive, tokens only.

---

## Building a new module (e.g. Admissions)

1. Add nav item(s) with the right `permission` to your `NAV` config.
2. Compose the screen: `PageHeader` → `StatCard` row → `FilterBar` → `DataTable` → overlays.
3. Define your row type + `Column<T>[]`; map statuses in `StatusBadge` if new.
4. Charts pull colors from `charts/theme.js` only.
5. No new CSS unless a genuinely new pattern appears twice (rule of two) —
   then add it here and update the living reference (`mazekids-design-system.html`).

The living reference is the visual source of truth; this package is its
executable form. Keep them in sync.

---

## v1.1 — ADS parity + AI-ready ("vibe-code" layer)

Cross-checked against the Atlassian Design System's five layers. Added:
- **Layout primitives** — `Stack`, `Inline`, `Box` (+ standalone `Spinner`),
  mirroring ADS's Box/Inline/Stack: a constrained composition vocabulary that
  humans AND AI tools build correctly with.
- **`AI-GUIDE.md`** — paste into Claude/Cursor/Copilot (or save as
  `.cursorrules`/`CLAUDE.md`) and generated UI follows the system: hard rules,
  component inventory, screen recipe, self-check list.
- **`design-tokens.json`** — W3C-format machine-readable tokens (light + dark)
  for Style Dictionary, Figma token plugins, and AI consumption. CSS remains
  the runtime source of truth.
- **`CONTENT.md`** — the ADS-style Content layer: voice & tone, UI writing
  rules, a fixed product vocabulary, inclusive language, and date/time/money
  writing standards.
- **`npm run lint:tokens`** — CI-able check that fails on raw hex/rgb in
  component code, enforcing rule #1 the way ADS enforces theirs with lint
  plugins.

## v1.0 — what graduated from the deferral list

- **Icons:** `lucide-react` adopted; every text glyph replaced (chevrons, close,
  row-actions, sort arrows, pagination, sidebar collapse, empty-state sprout).
- **Dark theme: ACTIVE.** Full remap in `tokens.css` (surfaces, ink, borders,
  status tints, elevation). Wrap the app in `<ThemeProvider>` and call
  `useTheme().setTheme('dark')` — persists, respects OS preference.
- **Charts as React components:** `<TrendLine>`, `<MoneyBars>`, `<Donut>`
  (Chart.js under the hood, brand rules baked in, aria-labels required).
- **Mobile navigation:** sidebar hides under `md`; hamburger opens a nav Drawer.
- **DateRangeField:** composed from native date inputs (calendar popover still
  rule-of-two).

Still deliberately out (v1.1 candidates): dark-mode chart axis colors (charts
read JS constants, not CSS vars — swap `chartColors` when dark charts are
scheduled), calendar popover picker, virtualized tables for 1,000+ rows.

## v0.1 audit notes — deliberate scope decisions

Checked against the living reference and the prototype. Present and verified:
tokens (incl. **elevation + motion tokens** — the only two shadows in the
system are `shadow-popover` / `shadow-modal`), typography (h1/h2 = Gabarito 800,
hero KPI numbers = Gabarito 900, h3+ = Nunito Sans per spec; Fredoka via
`.font-accent` for special moments only), spacing (Tailwind's default 4px scale — matches the
spec's scale, no custom config needed), buttons (primary/secondary/ghost/
danger × sm/md/lg/icon, with hover/focus/disabled/**loading**), status
taxonomy (5 tones incl. "Under review"), category palette, table
(sort/select/paginate/loading/empty/error), forms, overlays (toast now has
all 4 tones), charts (line/bar/**doughnut** helpers), roles, formatters.

Deliberately deferred (add via rule-of-two when a real screen needs them):
- **Icons** — v0.1 uses text glyphs (▾ ⋯ ✕). When finalizing an icon set,
  adopt `lucide-react` and swap the ₹-aware set in one pass.
- **Date-range picker** — native `<input type="date">` for now; a composed
  range picker joins when a second screen needs one.
- **Mobile nav drawer** — the shell collapses; a phone-width drawer lands
  with the first mobile-first requirement.
- **Dark theme** — pre-wired in tokens.css (commented block); flip when scheduled.
- **Chart React wrappers** — helpers in `charts/theme.js` are
  library-agnostic; wrap Chart.js or Recharts at first real usage.

## Preview page

`src/Preview.jsx` renders **every component in every state** on one page —
the fastest way to audit a token change or dark mode. Mount it at a dev
route and hit the theme toggle.

## Tests

`npm test` runs a smoke suite that renders all 45+ components
(`tests/smoke.test.jsx`) — it catches broken exports and render crashes.
CI (`.github/workflows/ci.yml`) runs `lint:tokens` + tests on every PR.

