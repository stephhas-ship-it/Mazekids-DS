# MEMORY.md — Project Rules for AI Code Generation

> **Version 2.1** — Changelog:
> v2.1: comment rule — single-line `//` comments only, and only when necessary.
> v2.0: apiHandler now unwraps data + normalizes errors; Button gets ...rest
>       spread + no-layout-shift loading; twMerge for className overrides;
>       race-safe useFetch; React Query approved; Testing + Tooling sections;
>       a11y specs for Modal/Dropdown/Table; form strategy; lazy routes;
>       JSDoc mandate; Figma asset rules.
> v1.0: initial rules (structure, plain style, services pattern, hygiene).

> **How to use:** Save in the repo root as `CLAUDE.md` (Claude Code) or
> `.cursorrules` (Cursor), or paste at the start of every chat. Every line
> of generated code must follow these rules. This file wins over habits.
>
> Code style goal: **simple and boring.** A junior who knows basic React
> must be able to read every file. No clever abstractions. If a trick saves
> 5 lines but confuses a junior, we don't use it.

---

## 1. Tech Stack (fixed — never add without asking)

- React 18 + Vite, **JavaScript with `.jsx` files** (NOT TypeScript, NOT `.tsx`)
- Tailwind CSS — the ONLY styling system
- `tailwind-merge` — the ONLY class utility (see Section 3). CVA stays banned.
- axios for HTTP, react-router-dom for routing
- Redux Toolkit ONLY for truly global state (auth, theme, notifications)
- **Approved when the team is ready:** TanStack React Query (see Section 5),
  react-hook-form (only for forms > 8 fields), Headless UI (only inside
  Modal/Dropdown — see Section 8)
- **Banned:** CVA, styled-components, MUI, rsuite, Bootstrap, any second
  UI library, any second chart library, moment.js (use dayjs)

## 2. Project Structure — every file has ONE home

```
src/
  assets/                     # images, fonts, svg (never zip/data files)
  components/
    common/                   # app-wide: Header.jsx, Sidebar.jsx
    ui/                       # reusable pieces, ONE FOLDER PER COMPONENT:
      Button/Button.jsx
      InputField/InputField.jsx
      Dropdown/Dropdown.jsx
      Modal/Modal.jsx
      Table/Table.jsx         # ONE table for the whole app
      Badge/Badge.jsx
      Popups/Success.jsx, Error.jsx, Alert.jsx
  pages/                      # one folder per page/feature:
    Orders/
      Orders.jsx              # the page — layout + composition only
      OrderFormModal.jsx      # pieces used only by this page
      useOrders.js            # data/state logic for this page
  layouts/                    # LoginLayout.jsx, DashboardLayout.jsx
  routes/                     # route definitions + ProtectedRoutes.jsx
  services/                   # api.js + ONE file per API resource
  hooks/                      # shared hooks (useFetch.js, useDebounce.js, useAlert.js)
  store/                      # Redux slices (auth, theme only)
  utils/                      # pure helpers: getErrorMessage.js, formatDate.js, const.js
  styles/                     # index.css + Tailwind theme colors
  tests/                      # test setup; test files also live next to code as *.test.js(x)
  App.jsx
  main.jsx
```

Rules:
- A **page** file only composes components — like a table of contents.
- Components NEVER import axios. All HTTP goes through `services/`.
- Page logic lives in that page's `useXxx.js` hook.
- Unsure where a file goes? ASK. Never invent a new top-level folder.

## 3. Component Code Style — plain and readable (THE template)

Plain function, props with defaults, object maps for variants, `twMerge`
for the final className, `...rest` spread so callers can pass ANY extra
attribute (`aria-label`, `data-testid`, `title`, form props). JSDoc on
every ui/ component so editors autocomplete the variants.

```jsx
// src/components/ui/Button/Button.jsx
import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * @param {object} props
 * @param {"primaryFilled"|"primaryOutlined"|"successFilled"|"errorFilled"} [props.variant]
 * @param {"small"|"medium"|"large"} [props.size]
 * @param {boolean} [props.loading]  Shows spinner, keeps label (no layout shift)
 */
const Button = ({
  children,
  variant = "primaryFilled",
  size = "medium",
  iconLeft,
  iconRight,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ...rest                       // aria-label, data-testid, etc. ALWAYS spread this.
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg transition-all " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primaryFilled: "bg-primary hover:bg-primary-700 text-white focus:ring-primary",
    primaryOutlined: "border border-primary text-primary hover:bg-primary-50 focus:ring-primary",
    successFilled: "bg-success hover:bg-success-700 text-white focus:ring-success",
    errorFilled: "bg-error hover:bg-error-700 text-white focus:ring-error",
  };

  const sizeClasses = {
    small: "h-8 px-3 text-xs",
    medium: "h-9 px-4 text-sm font-semibold",
    large: "h-11 px-5 text-sm font-semibold",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={twMerge(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};

export default Button;
```

Style rules for ALL components:
- `const Component = ({ props, ...rest }) =>` with **default export**;
  filename = component name; always `.jsx` when it contains JSX.
- Variants = plain object maps. No CVA, no nested ternaries inside maps
  (disabled look lives in `baseClasses` via `disabled:`).
- Final className ALWAYS through `twMerge(base, variant, size, className)`
  — plain `${className}` at the end does NOT reliably override Tailwind
  conflicts (CSS file order wins, not string order).
- `...rest` spread on the root element — no exceptions.
- JSDoc `@param` block listing allowed variant/size values — mandatory
  for every `ui/` component.

## 4. API Pattern — services in 2 layers

**Layer 1 — `services/api.js`** (created once): one axios instance with
`baseURL` from `import.meta.env.VITE_API_URL`, request interceptor that
attaches the Bearer token, response interceptor that silently refreshes
on 401 and retries. Then wrappers — and `apiHandler` EARNS its place by
doing two real jobs: unwrap `res.data`, and attach one clean message:

```js
// src/utils/getErrorMessage.js
const getErrorMessage = (err, fallback = "Something went wrong. Please try again.") =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err?.message ||
  fallback;

export default getErrorMessage;
```

```js
// in services/api.js
import getErrorMessage from "../utils/getErrorMessage";

export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const put = (url, data, config = {}) => api.put(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);

// Unwraps res.data and normalizes the error message.
// Hooks receive plain data, and err.userMessage is always safe to show.
export const apiHandler = async (method, url, data = null) => {
  try {
    const res = await (data !== null ? method(url, data) : method(url));
    return res.data;
  } catch (err) {
    err.userMessage = getErrorMessage(err);
    throw err;
  }
};
```

**Layer 2 — one file per resource**, tiny one-line functions:

```js
// src/services/liquids.js
import { get, post, put, del, apiHandler } from "./api";

export const getLiquids = () => apiHandler(get, "/liquids");
export const getLiquid = (id) => apiHandler(get, `/liquids/${id}`);
export const addLiquid = (data) => apiHandler(post, "/liquids", data);
export const updateLiquid = (id, data) => apiHandler(put, `/liquids/${id}`, data);
export const deleteLiquid = (id) => apiHandler(del, `/liquids/${id}`);
```

Rules:
- New endpoint = ONE line in the matching service file. New resource =
  new file copying `liquids.js`. NEVER call axios in a component/page.
- API base URLs from env vars only; one key per var (duplicate env keys
  silently override each other — real bug found in this repo).

## 5. Data Fetching in Pages — race-safe, or React Query

Default: pages use the ONE shared `useFetch` hook. It handles loading /
error / stale-response cleanup so nobody hand-writes (or forgets) them:

```js
// src/hooks/useFetch.js
import { useState, useEffect, useCallback, useRef } from "react";

const useFetch = (serviceFn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);          // ignores stale responses:
                                        // only the LATEST request may set state
  const refetch = useCallback(async () => {
    const id = ++requestId.current;
    setIsLoading(true);
    setError(null);
    try {
      const result = await serviceFn();
      if (id === requestId.current) setData(result);
    } catch (err) {
      if (id === requestId.current) setError(err.userMessage);
    } finally {
      if (id === requestId.current) setIsLoading(false);
    }
  }, [serviceFn]);

  useEffect(() => {
    refetch();
    return () => { requestId.current++; };   // unmount → ignore in-flight response
  }, [refetch]);

  return { data, isLoading, error, refetch };
};

export default useFetch;
```

Page usage — 1 line instead of 25:

```js
const { data: liquids, isLoading, error, refetch } = useFetch(getLiquids);
```

Rules:
- **Every data screen renders all 3 states:** loading (Spinner/skeleton),
  error (Error popup with `error` message + Retry button calling `refetch`),
  empty (friendly empty-state message). Never a blank white screen.
- Search inputs ALWAYS go through `useDebounce` (shared hook, ~8 lines,
  400ms) — never one API call per keystroke.
- Effects that refetch when filters change must not let an old slow
  response overwrite a new one — `useFetch` already guarantees this;
  custom effects must use the same ignore-stale pattern.
- **TanStack React Query is the approved upgrade** for this layer. When
  adopted, `useQuery({ queryKey: ["liquids"], queryFn: getLiquids })`
  replaces `useFetch` — services (Section 4) stay identical. Prefer it
  for new pages once the team has learned it; it adds caching, dedupe,
  and retries we would otherwise hand-roll.

## 6. Forms — stop the next 1,800-line file

- Up to ~8 fields: ONE `formData` object + one generic `handleChange`
  (`setFormData(prev => ({ ...prev, [name]: value }))`) — never 10
  separate `useState` calls.
- More than ~8 fields, or multi-step, or heavy validation: `useReducer`,
  or ask approval to use `react-hook-form` for that form.
- Validation messages show under the field, and the first invalid field
  gets focus on submit.

## 7. File Size Limits — hard caps

| File type       | Max lines | If bigger →                                    |
|-----------------|-----------|------------------------------------------------|
| Page component  | 250       | split JSX into child components in same folder |
| UI component    | 200       | split into sub-components                      |
| Hook            | 150       | split into two hooks                           |
| Service file    | 200       | split by resource                              |
| Any function    | 40        | extract helpers                                |

(Real example this repo is recovering from: `BasicReporting.jsx`,
1,874 lines. Never again.)

## 8. Reuse Before Rebuild + a11y specs for the hard components

Before writing ANY component, check `src/components/ui/`. If it exists:
import it. Creating a second version is FORBIDDEN — exactly ONE Button,
ONE Table, ONE Dropdown, ONE Modal in this app. Keep this inventory
updated when adding components:

```
Button, InputField, TextArea, SearchBar, Dropdown, Modal, Table,
Badge, Card, Popups (Success/Error/Alert), Spinner, Pagination, Tabs
```

Because we hand-roll these, their a11y is OUR job. These are requirements,
not suggestions:

- **Modal:** focus moves into the modal on open and returns to the trigger
  on close; focus trapped inside while open; `Escape` closes; click on
  backdrop closes; body scroll locked; `role="dialog" aria-modal="true"`
  + `aria-labelledby` pointing at the title.
- **Dropdown:** opens on click/Enter/Space; ArrowUp/ArrowDown move the
  highlighted option; Enter selects; Escape closes; click-outside closes;
  trigger has `aria-expanded` + `aria-haspopup`.
- **Table:** header cells are `<th scope="col">`; sortable headers are
  real `<button>`s with `aria-sort`; row actions reachable by keyboard.
- Everywhere: icon-only buttons get `aria-label`; every input has a
  `<label>`; never show status by color alone (badge text does the work).
- **Escape hatch:** if the team prefers, Headless UI is pre-approved
  ONLY as the internals of Modal and Dropdown (it is unstyled — all
  Tailwind/theme rules still apply). Nothing else from it.

## 9. Styling Rules

- Tailwind classes only. **No inline `style={{}}`** except truly dynamic
  values (chart height, progress %).
- **No raw hex colors in components.** Brand colors are defined once in
  `tailwind.config.js` theme (`primary`, `secondary`, `success`, `error`,
  `warning`, `neutral` with shades) and used by name. Changing the brand
  color = editing ONE file.
- Spacing on Tailwind's default scale; `rounded-lg` standard; no
  per-screen shadows/radii inventions.

## 10. Figma → Code Rules

1. Map every Figma element to an EXISTING `ui/` component. A Figma button
   = `<Button variant="...">`, never a fresh styled `<div>`.
2. Snap Figma colors to the nearest theme color; if none fits, ASK before
   adding a token. Never paste hex into a component.
3. Snap odd pixel values (13px, 17px, 22px) to the Tailwind scale.
4. Repeated Figma blocks (cards, rows) = ONE component + `.map()`.
5. Visible text that is really data (names, prices, dates) becomes
   props/state with mock data in `mockData.js` — never hardcoded JSX.
6. **Assets:** exported icons/illustrations are saved as `.svg` files in
   `src/assets/` and imported — NEVER inline base64 blobs in JSX. Reused
   icons become tiny components (`assets/icons/CartIcon.jsx`).
7. Figma layer names map to component/file names: layer "Order Form
   Modal" → `OrderFormModal.jsx`. If layers are unnamed junk
   ("Frame 4821"), name the component after its purpose, not the frame.

## 11. Testing — minimum floor, always

Stack: **Vitest + React Testing Library** (already Vite-native).

- Every `utils/` function gets a test (pure functions — easiest tests
  that exist).
- Every hook gets a test (use `renderHook`; mock the service module).
- Every `ui/` component gets at least one render smoke test (renders
  without crashing + shows its children/label).
- Bug fix = add the test that would have caught it, in the same change.
- When the AI generates a new util, hook, or ui/ component, it generates
  the matching `*.test.js(x)` file next to it in the SAME response —
  not "tests can be added later."

## 12. Tooling — the enforcer (the checklist is a mirror, not the cop)

These run on every commit via lint-staged + husky, and in CI:

- **ESLint** (react, react-hooks plugins): `no-console`, `no-unused-vars`,
  `react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps` as ERRORS.
- **Prettier** on all staged files.
- **Guard scripts** in package.json:
  - `lint:names` — fail if any filename matches `copy|old|final|temp|backup`
    or a trailing `2` (e.g. `Button copy.jsx`, `TableComponent2.jsx`).
  - `lint:colors` — fail on `#[0-9A-Fa-f]{3,8}` or `rgb(` inside
    `src/**/*.jsx` (theme config excluded).
- CI runs: lint → guards → tests → build. Red = no merge.

## 13. Performance & App Shell

- **Every route is lazy:** `const Orders = lazy(() => import("../pages/Orders/Orders"))`,
  with ONE `<Suspense fallback={<Spinner />}>` around `<Routes>`. (This
  repo once shipped a 12 MB bundle — lazy routes are not optional.)
- ONE `ErrorBoundary` component wraps the routes: a crashing chart shows
  a "Something went wrong — Reload" card, not a white screen.
- Import only what's used (`import dayjs from "dayjs"`, specific icons —
  never whole icon packs).

## 14. Code Cleanliness & Repo Hygiene

- No `console.log` (ESLint enforces). No commented-out code — delete it,
  git remembers. No unused imports or dead files.
- **Comments: single-line `//` only, and ONLY when necessary.** Most code
  needs zero comments — good names ARE the documentation. Write a comment
  only when the code can't explain itself (a weird API quirk, a business
  rule, a non-obvious workaround), and keep it to one `//` line placed
  above the code. No multi-line `/* */` blocks, no banner/divider comments
  (`// ------------`), no section headers, no comment restating the code
  (`// set loading to true` ❌). Exception: the JSDoc `@param` block on
  `ui/` components (Section 3) — that one stays, everything else is
  single-line.
- `.gitignore` must contain: `node_modules/`, `dist/`, `.env`, `.env.*`,
  `*.zip`, `.DS_Store`, `coverage/`. Commit `.env.example` with fake
  values only. No data dumps or zips inside `src/`.

## 15. Self-Check — verify before returning any code

- [ ] Files placed per Section 2; component folders like `ui/Button/Button.jsx`
- [ ] All React files `.jsx`; template per Section 3: object maps, `twMerge`,
      `...rest` spread, JSDoc `@param` — no CVA
- [ ] API only via services (Section 4); pages fetch via `useFetch`/React Query
- [ ] Loading + error + empty states on every data screen; search debounced
- [ ] Forms follow Section 6 (one formData object / useReducer — never 10 useStates)
- [ ] No file over its Section 7 limit
- [ ] No duplicate of an inventory component; no banned filenames
- [ ] Modal/Dropdown/Table meet the Section 8 a11y requirements
- [ ] Theme colors only — zero hex; no inline styles for layout
- [ ] New util/hook/ui component ships WITH its test file
- [ ] Routes lazy; no new npm package added without asking
- [ ] Zero console.log, zero commented-out code, zero unused imports
- [ ] Comments (if any) are single-line `//`, explain WHY, and are truly needed

If any box fails, fix it BEFORE showing the code. Don't explain the rules
back — just follow them.
