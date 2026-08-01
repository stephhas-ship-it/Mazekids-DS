# MazeKids Design System — AI Context (v1.1)

> **Purpose:** Paste this entire file into any AI coding tool (Claude, Cursor,
> Copilot, v0) as system context — or save it as `.cursorrules` /
> `CLAUDE.md` in the repo root. Any UI it generates must follow these rules.
> The library at `src/` is real, typed, and importable — generate code that
> USES it; never regenerate components that already exist.

## Identity (read once)

MazeKids is an ERP dashboard for preschool/daycare operators in India.
Warm-but-efficient: cream page canvas, data on white cards, forest-green
brand, soft-serif display type. Operators scan dense tables for hours —
clarity beats decoration.

## Hard rules — violating any of these is a wrong answer

1. **Never write a raw hex color, rgb(), or named CSS color.** To change any
   color, edit Section 1 of `src/styles/tokens.css` ("CHANGE COLORS HERE") —
   badge tints and chart colors re-derive automatically. Chart colors are
   resolved from CSS variables at render time by `src/charts/theme.js` —
   never pass a hex to Chart.js directly. Use token
   classes only: `bg-primary`, `bg-surface-2`, `text-ink`, `text-ink-muted`,
   `border-border`, `bg-success-bg text-success-fg`, `shadow-popover`,
   `shadow-modal`, `rounded-card`, `rounded-input`, `rounded-control`,
   `rounded-pill`.
2. **Never build a component that already exists.** Import from `./src`
   (see inventory below). No hand-rolled dropdowns, modals, tables, toasts.
3. **Numbers:** body font + `tabular-nums`. Money right-aligned. **Never
   monospace** in UI. Always format via `inr()` (→ ₹3,86,100) and
   `formatDate()`/`formatDateLong()` (→ 17-03-2026 / 17 Mar 2026). Never
   hand-format money or dates.
4. **Status colors carry meaning.** New status → add to the map in
   `StatusBadge.jsx`, choosing one of 5 tones (success/warning/danger/
   info/neutral). NEVER invent a status color. Category colors come from
   the fixed order via `<CategoryTag index={n}>`; index 5+ is "Other".
5. **Typography:** `font-display` (Gabarito, weight 800–900) ONLY for page titles and
   hero KPI numbers (Nunito Sans is the body default). Body weights 400/600
   only; display weights 800 (titles) / 900 (hero numbers). `font-mono`
   (Azeret Mono) for invoice IDs and codes — never for amounts.
   No text in all-italic.
6. **Layout:** compose with `<Stack>`, `<Inline>`, `<Box>` primitives and the
   4px space scale (1,2,3,4,6,8). Page canvas is `bg-surface-0`; data sits in
   `<Box surface={2} bordered>` (white cards). Don't put dense tables
   directly on cream.
7. **Icons:** `lucide-react` only, sizes 12–18 in UI chrome. No emoji in
   product UI, no other icon sets. Currency icon is the Rupee, never `$`.
8. **Accessibility:** interactive elements keyboard-reachable (Radix handles
   its own); every chart gets `ariaLabel`; icon-only buttons get
   `aria-label`; never convey state by color alone (badge text does the work).
9. **Roles:** gate features with `can(role, permission)` from
   `lib/permissions.js`. Never fork a component per role.
10. **Dark mode is free** — it works via tokens. Do not write
    `dark:` Tailwind variants; if something looks wrong in dark, fix the
    token, not the component.

## Component inventory — import, don't rebuild

```ts
import {
  // layout primitives
  Stack, Inline, Box, Spinner,
  // core
  Button /* variant: primary|secondary|ghost|danger; size: sm|md|lg|icon; loading */,
  StatusBadge /* status="Recorded|Pending|Overdue|Approved|Draft|…" */,
  Avatar, CategoryTag, Skeleton, EmptyState,
  // forms
  Field, Input, Textarea, Select, Checkbox, Switch, RadioGroup, DateRangeField,
  // overlays
  Modal, Drawer, Tooltip, ActionsMenu, ToastProvider, useToast, Alert,
  // data
  DataTable /* generic <T>; columns: Column<T>[]; selectable; sort/onSortChange;
               loading/error/empty built in */,
  Pagination, StatCard, FilterBar, Tabs, TabPanel, PageHeader, ProgressBar,
  // shell & charts
  AppShell /* nav: NavItem[]; role; collapsible; mobile drawer built in */,
  TrendLine, MoneyBars, Donut,
  // utilities
  inr, inrPrecise, formatDate, formatDateLong, formatRelativeDays,
  can, ROLE_LABELS, cn, ThemeProvider, useTheme,
} from './src';
```

## Screen recipe — every list/module screen follows this skeleton

```tsx
<AppShell nav={NAV} role={role} activeHref=... onNavigate=... userName=... userRoleLabel=...>
  <PageHeader icon breadcrumb title subtitle actions={<Button>+ Add …</Button>} />
  <Inline space={3} className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard … /> ×4
  </Inline>
  <FilterBar className="mb-4">
    <DateRangeField … /> <Select … /> <Input placeholder="Search …" className="flex-1" />
  </FilterBar>
  <DataTable columns={columns} rows={rows} rowKey={r => r.id} selectable … />
  <Pagination … />
  {/* create/edit → Modal; row detail → Drawer; confirmations → useToast() */}
</AppShell>
```

Full working example: `src/DemoExpenseTracker.jsx` — study it before
generating any screen.

## Charts

One story → `<TrendLine>` (single forest hue). Money in/owed →
`<MoneyBars>` (forest + gold). True categories → `<Donut>` (fixed brand
palette). Charts live on white cards. Never pick chart colors manually.

## Machine-readable tokens

`design-tokens.json` (W3C format) mirrors `src/styles/tokens.css` — feed it
to Style Dictionary, Figma token plugins, or your own tooling. CSS is the
runtime source of truth; JSON is the interchange copy. If they disagree,
CSS wins and JSON must be updated.

## Self-check before returning generated code

- [ ] Zero hex/rgb/named colors in the diff (`npm run lint:tokens` passes)
- [ ] No component duplicated from the inventory
- [ ] Money/dates via formatters; numbers `tabular-nums`; amounts right-aligned
- [ ] Destructive actions use `ConfirmDialog` (never a hand-rolled Modal)
- [ ] `font-display` only on titles/hero numbers; `font-accent` (Fredoka) only on empty states / onboarding / celebration moments — never data
- [ ] Loading, empty, and error states handled (DataTable has them built in)
- [ ] Charts have `ariaLabel`; icon-only buttons have `aria-label`
- [ ] Feature gated with `can()` where the roles matrix requires it
