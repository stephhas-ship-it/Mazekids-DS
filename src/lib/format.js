/* format.js — Indian money & dates. Import these everywhere.
   Never hand-format currency or dates in a component. */

/** ₹3,86,100 — Indian lakh/crore grouping */
export const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

/** ₹3,86,100.50 — when paise matter */
export const inrPrecise = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(n);

/** 17-03-2026 (dd-mm-yyyy) */
export const formatDate = (d) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${date.getFullYear()}`;
};

/** 17 Mar 2026 — the readable long form used in tables */
export const formatDateLong = (d) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(typeof d === "string" ? new Date(d) : d);

/** "in 2 days" / "3 days ago" — for due-date sub-lines */
export const formatRelativeDays = (d) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const days = Math.round((date.getTime() - Date.now()) / 86_400_000);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    days,
    "day",
  );
};

/** "just now" / "5m ago" / "2h ago" / "3 days ago" — notification times */
export const formatRelativeTime = (d) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const diffMs = Date.now() - date.getTime();
  const mins = Math.round(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return formatRelativeDays(date);
};
