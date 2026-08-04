const toDate = (d) => (typeof d === "string" ? new Date(d) : d);

export const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const inrPrecise = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(n);

// dd-mm-yyyy is the product-wide date rule; never hand-format elsewhere.
export const formatDate = (d) => {
  const date = toDate(d);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${date.getFullYear()}`;
};

export const formatDateLong = (d) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(toDate(d));

export const formatRelativeDays = (d) => {
  const days = Math.round((toDate(d).getTime() - Date.now()) / 86_400_000);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    days,
    "day",
  );
};

export const formatRelativeTime = (d) => {
  const date = toDate(d);
  const mins = Math.round((Date.now() - date.getTime()) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return formatRelativeDays(date);
};
