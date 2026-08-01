# Changelog — MazeKids Design System

## v1.4.0 — 2026-08-01
Closes the last two MVP gaps:
**NotificationBell / NotificationList** — Radix Popover inbox with unread
badge (caps at 9+), tone dots, mark-all-read, view-all, relative
timestamps via new `formatRelativeTime` ("5m ago"/"2h ago"), and a
Fredoka-accented empty state. The list is standalone for full-page or
Drawer use; the bell ships wired into the demo's top bar.
**RichTextEditor / RichTextContent** — Tiptap-based editor for circulars
and announcements. Deliberately narrow toolbar per CONTENT.md (bold,
italic, one heading level, lists, links, clear, undo/redo) — no fonts or
colors. Value in/out is HTML; `RichTextContent` renders it back.
Content styles live in `globals.css` (`.mk-richtext`), token-driven.
New deps: `@radix-ui/react-popover`, `@tiptap/react` + starter-kit +
link + placeholder. 54 smoke tests passing.

## v1.3.1 — 2026-08-01 (re-audit fixes)
**F (bugs):** README component table repaired (own 2-column table);
`Preview` reachable via `exports` (`@mazekids/design-system/preview`);
`DateField` now uses `lib/format.formatDate` (true dd-mm-yyyy);
`package-lock.json` ships in the archive so CI's `npm ci` works.
**H (missed):** skip-to-content link in AppShell (+ focusable `<main>`);
Radix description warnings suppressed on description-less Modal/Drawer;
ESLint made real (deps, `npm run lint`, CI step, clean run) — which
surfaced and fixed missing Tabs/PageHeader/FilterBar coverage in
Preview; stale README dark-theme line corrected; StatCard `deltaTone`
guidance + Preview wrong-tone fix.
**G (polish):** `process` guards for unbundled ESM; `toast.promise` now
replaces the loading toast instead of mutating it (auto-dismiss timer
guaranteed); MultiSelect rebuilt with valid markup — chips are real
buttons beside the trigger, Backspace pops the last chip; Combobox chip
label is clickable to search again without losing the value; named
colors (`bg-black`/`bg-white`) routed through tokens and now caught by
`lint:tokens`.

## v1.3.0 — 2026-08-01
**Components (12 new):** `ConfirmDialog`, `SearchInput`, `FileUpload`,
`Combobox` (async type-ahead), `MultiSelect`, `Stepper`, `Banner`,
`Badge`, `DateField`, standalone `Breadcrumb` (PageHeader now composes
it), `DescriptionList`, `BulkActionsBar`, plus `SkeletonStatCard` /
`SkeletonTableRows` presets and `toast.promise()` for async flows.

**Component upgrades:** Button `destructive` variant (alias of danger)
and dev-mode aria-label enforcement on icon-only buttons; Modal `size`
(sm/md/lg) + nested-overlay guidance; DataTable `stickyHeader` and
keyboard-activatable clickable rows; Pagination page-size selector.

**Tooling:** vitest + Testing Library smoke suite (49 tests, all
components), `src/Preview.jsx` render-everything page, GitHub Actions
CI, ESLint/Prettier configs, `.gitignore`, proprietary LICENSE
(Stephen L), `lint:tokens` now covers `.js` files (charts/theme.js
fallbacks explicitly exempt).

**Docs:** README component table completed + preview/tests sections,
CONTENT.md ↔ Fredoka accent-font cross-reference, AI-GUIDE chart-color
and ConfirmDialog rules, design-tokens.json gains fontWeight tokens and
dark-mode chart values.

## v1.2.0 — 2026-08-01
Audit Section A fixes: theme-reactive charts (MutationObserver on
`data-theme`), Field ↔ input aria wiring (`aria-invalid` +
`aria-describedby`), global `:focus-visible` ring, real packaging
(`main`/`exports`, react as peerDependency), `prefers-reduced-motion`
support, `@media print` layer with AppShell chrome hidden.

## v1.1.0 — 2026-08-01
**Fonts replaced:** Gabarito (display, 800/900) + Nunito Sans (body) +
Azeret Mono (codes) + Fredoka (accent, special moments only) — replacing
Fraunces / Hanken Grotesk / IBM Plex Mono. Tabular numerals on money.
**Flexible tokens:** tokens.css restructured into "CHANGE COLORS HERE"
primitives + auto-derived semantics via `color-mix()`; charts read CSS
variables at render time. **Dark mode completed:** `ThemeToggle`
component, demo wiring. **Converted** the whole codebase from
TypeScript to JavaScript. Author: Stephen L.

## v1.0.0
Initial release: 30 components, two-layer token system, Radix a11y,
Chart.js theming, permissions matrix, INR formatting, AI-GUIDE +
CONTENT.md standards.
