# MazeKids Design System — Audit (v1.1)

Audited: all 21 source files, docs, tokens, and packaging. What exists is
solid — 30 components, a real two-layer token system, dark mode wired
end-to-end, zero hardcoded hexes in components (`lint:tokens` passes).
Below is what's **missing**, ordered by how much it matters.

---

## A. Real gaps that will bite soon — ✅ ALL FIXED in v1.2.0

Each item below is resolved; the original finding is kept for the record.

1. ✅ FIXED — **Charts don't recolor on theme toggle.** `charts/theme.js` resolves CSS
   variables at chart-build time, but `TrendLine` / `MoneyBars` / `Donut`
   never rebuild when `data-theme` flips — an already-rendered chart keeps
   light-mode colors on a dark card. Fix: read `useTheme()` in Charts.jsx
   and pass `theme` into the effect dependency array (or listen for a
   `MutationObserver` on `data-theme`).
2. ✅ FIXED — **Field errors aren't linked to their inputs.** `Field` renders
   `role="alert"`, but nothing sets `aria-describedby` / `aria-invalid` on
   the child control, so screen readers announce the error detached from
   the field. Fix: have `Field` clone the child with `aria-invalid` and a
   generated `aria-describedby` id.
3. ✅ FIXED — **No global `:focus-visible` style.** Button defines its own focus ring;
   links, table sort headers, the sidebar collapse button, and pagination
   have none. Add one `@layer base` rule using `--color-primary`.
4. ✅ FIXED — **`package.json` has no `main` / `module` / `exports` field.** The
   package can't actually be imported as `@mazekids/design-system` — it
   only works copied into a source tree. Add `"main": "src/index.js"` (or a
   build step) plus `"peerDependencies"` for react/react-dom (currently
   listed as hard dependencies, which will duplicate React in consumers).
5. ✅ FIXED — **No `prefers-reduced-motion` handling.** Tokens define `--dur-*` and
   `--ease`, but nothing zeroes them for users with motion sensitivity.
   One media query in tokens.css fixes it globally.
6. ✅ FIXED — **No print styles.** An ERP that produces invoices, receipts, and fee
   reports needs an `@media print` layer (hide AppShell chrome, white
   background, black text) — currently printing a page prints the cream
   canvas and sidebar.

## B. Missing components — ✅ ALL 12 SHIPPED in v1.3.0

1. **ConfirmDialog** — CONTENT.md specifies destructive-confirmation copy
   ("Delete EXP-2026-002? This can't be undone.") but there's no component
   for it; every module will hand-roll Modal + buttons differently.
2. **SearchInput** — FilterBar exists, but there's no debounced search
   field with icon + clear button; every list screen needs one.
3. **FileUpload / AttachmentField** — fee receipts, staff documents,
   admission forms. Nothing in the system handles files.
4. **Combobox (async autocomplete)** — picking a student/parent/vendor
   from hundreds of records; Radix Select alone can't do type-ahead.
5. **MultiSelect with tag chips** — assigning students to batches, staff
   to centers.
6. **Stepper / Wizard** — the admissions flow is multi-step by nature.
7. **Banner** — page-level persistent notice ("Fee structure changes
   April 1"); Alert exists but is block-level inline, not dismissible.
8. **Badge (count)** — notification counts on nav items ("Approvals · 3").
9. **DatePicker** — DateRangeField wraps native `<input type="date">`,
   which is fine, but there's no single-date field with the same styling,
   and native pickers ignore the dd-mm-yyyy format rule.
10. **Breadcrumb as standalone** — it lives only inside PageHeader; detail
    screens that don't use PageHeader can't reuse it.
11. **DescriptionList / KeyValue** — detail views (student profile,
    invoice detail) currently have no layout primitive.
12. **Toast helper for promise flows** — `useToast` exists, but there's no
    pattern for loading → success/error async toasts.

## C. Missing states & behaviors — ✅ FIXED in v1.3.0

(DataTable already had `onRowClick` + column widths — the audit overstated
those two; sticky header, keyboard rows, BulkActionsBar, page-size selector,
Modal sizes, Skeleton presets, and Button upgrades were real and are done.)

- **Button:** `loading` exists (good); still missing an icon-only variant
  with enforced `aria-label`, and a `destructive` variant for delete actions.
- **DataTable:** no row-click affordance, no sticky header for long lists,
  no column-width control, no "select all across pages" pattern; bulk-select
  exists but no BulkActionsBar component to act on the selection.
- **Modal/Drawer:** no size variants documented; no nested-overlay
  guidance (Drawer opening a ConfirmDialog).
- **Skeleton:** no table-row / stat-card presets, so loading states are
  hand-assembled per screen.
- **Pagination:** no page-size selector despite DataTable being "the
  workhorse."

## D. Tooling & repo hygiene — ✅ FIXED in v1.3.0 (49 tests passing)

- **No tests** — not even a smoke render per component. One
  `@testing-library/react` render-all test would catch export breakage.
- **No LICENSE file** (author is set, license isn't — `"private": true`
  covers npm, not usage rights inside the org/contractors).
- **No `.gitignore`, no CI config**, no Prettier/ESLint config — the
  "vibe coding friendly" goal benefits most from a lockfile + formatter so
  AI-generated diffs stay consistent.
- **No Storybook / preview page.** DemoExpenseTracker is a great
  composition reference but shows ~60% of components; there's no page that
  renders every component in every state (the fastest way to audit dark
  mode visually).
- **`lint:tokens` misses `.js` files** — it only greps `*.jsx`, so a
  hardcoded hex in `lib/` or `charts/` would slip through (charts/theme.js
  legitimately contains fallback hexes; scope the ignore to it explicitly).

## E. Docs drift & consistency notes — ✅ FIXED in v1.3.0

- **README component table** doesn't list the newer pieces: `ThemeToggle`,
  `Stack`/`Inline`/`Box`/`Spinner` (layout.jsx), `Alert`, `ProgressBar`,
  `Switch`, `RadioGroup`, `DateRangeField`.
- **Fredoka vs CONTENT.md tension.** CONTENT.md says "playful copy stays
  on the marketing site, not in payroll" — the Fredoka accent-font rule
  (empty states, onboarding, celebrations) is compatible but the two docs
  never reference each other; add one line to each so future contributors
  don't read them as contradictory.
- **AI-GUIDE checklist** still says "Zero hex/rgb/named colors in the diff"
  via `npm run lint:tokens` — true, but should also mention the new
  `--font-accent` restriction and the chart-colors-from-CSS rule.
- **design-tokens.json** doesn't include the `--chart-series-*` dark-mode
  values or the `--weight-display*` tokens added in v1.1.
- **No CHANGELOG.md** — v1.0 → v1.1 changed fonts, tokens, and dark mode;
  none of it is recorded.

---

### Suggested order of attack

Week 1: ~~A1–A4~~ ✅ done (v1.2.0, incl. A5–A6).
~~Week 2–3 + ongoing~~ ✅ all done in v1.3.0. The audit is fully closed;
next review should focus on real-usage feedback from the first modules.


---
---

# RE-AUDIT — 2026-08-01, against v1.3.0

Second full pass, focused on regressions introduced by the v1.3.0 batch
plus anything the first audit missed. The codebase is in good shape —
49/49 tests pass, lint:tokens is clean, dark mode and packaging work.
The findings below are smaller than round one, but four are real bugs.

## F. Regressions introduced in v1.2–v1.3 — ✅ ALL FIXED in v1.3.1

1. **README component table is malformed.** The original table is
   3-column (`Area | Files | Contents`); the 20 component rows appended
   in v1.3.0 are 2-column, so the markdown table breaks at the seam and
   renders wrong. Fix: give the new components their own 2-column table
   under a "Components added in v1.3" heading, or reformat to 3 columns.
2. **`Preview.jsx` is unreachable through the package.** README says
   `import Preview from "@mazekids/design-system/src/Preview.jsx"`, but
   the new `exports` map (added in v1.2) doesn't list that subpath —
   Node and every modern bundler will refuse the import. Fix: add
   `"./preview": "./src/Preview.jsx"` to `exports` and update the README.
3. **`DateField` ignores the system's own date formatter.**
   `lib/format.js` ships `formatDate` documented as `17-03-2026
   (dd-mm-yyyy)` — the exact rule DateField exists to enforce — but
   DateField uses `toLocaleDateString("en-IN")`, which outputs slashes
   (`01/04/2026`). Fix: import and use `formatDate`.
4. **CI will fail as shipped.** `.github/workflows/ci.yml` runs `npm ci`
   with `cache: npm`, both of which require a committed
   `package-lock.json` — but the lockfile is excluded from the delivered
   zip. Fix: include the lockfile in the archive (it exists locally), or
   switch CI to `npm install` (worse; lockfile is the right answer).

## G. Smaller code issues — ✅ ALL FIXED in v1.3.1

(G2 fixed by design change: promise toasts are replaced, not mutated,
so no reliance on Radix timer-restart behavior remains.)

1. **`process.env.NODE_ENV` in browser components** (Button,
   ConfirmDialog dev warnings). Fine under Vite/Next/CRA, but crashes in
   unbundled ESM where `process` is undefined. Guard with
   `typeof process !== "undefined" &&` to be environment-proof.
2. **`toast.promise` sticky→timed transition is unverified.** The
   loading toast mounts with `duration={Infinity}` and flips to the
   default duration on update; whether Radix Toast restarts its timer
   when the `duration` prop changes mid-flight needs a manual check. If
   it doesn't, resolved toasts linger forever. (The smoke test can't
   catch timing.)
3. **MultiSelect chips are focusable elements inside a `<button>`** —
   `role="button" tabIndex={0}` spans nested in the trigger button.
   Screen readers and keyboard focus handle nested interactive content
   inconsistently. Better pattern: chips outside the trigger, or
   delete-on-Backspace within the trigger.
4. **Combobox: changing a selection requires clearing first.** With a
   value set, the input is replaced by the chip — there's no way to
   reopen the search while keeping the current value visible. Acceptable
   v1 behavior, but worth an explicit doc note or a click-chip-to-edit
   affordance.
5. **Banner uses `hover:bg-black/5`** — a named color slipping past
   `lint:tokens` (which only greps hex/rgb). Same for the pre-existing
   `bg-white` on the Switch thumb. Either extend the linter to catch
   `bg-black`/`bg-white` or route both through tokens
   (`bg-ink/5`, a `--switch-thumb` token).

## H. Missed by the first audit — ✅ ALL FIXED in v1.3.1

1. **No skip-to-content link in AppShell.** Keyboard users tab through
   the entire sidebar on every page. One visually-hidden "Skip to
   content" anchor before the nav fixes it.
2. **Radix dev warnings for description-less dialogs.** Modal/Drawer
   render no `Description` when the prop is absent; Radix logs a console
   warning per open. Pass `aria-describedby={undefined}` explicitly when
   there's no description.
3. **ESLint config has no teeth.** `.eslintrc.json` extends react/
   react-hooks plugins, but eslint and those plugins aren't in
   devDependencies and there's no `lint` script or CI step — the config
   is decorative. Either add the deps + script or drop the file.
4. **StatCard `deltaTone` defaults to success** — the Preview's
   "Pending ₹86,100 · 23 families" renders green. Not a bug, but the
   default invites wrong-tone deltas; consider requiring the prop.
5. **README stale line** — the file-map row still says "Dark theme
   pre-wired (commented)"; it's been active since v1.1.

## Verdict

No structural problems — the token architecture, theming, packaging, and
test setup are sound. ~~F1–F4 are the only must-fix items~~ ✅ Every
finding from both audit rounds (A–H) is now closed as of v1.3.1:
49/49 tests, ESLint clean, lint:tokens clean (with the stricter
named-color rules). Next review should be driven by real-usage feedback
from the first product modules built on the system.
