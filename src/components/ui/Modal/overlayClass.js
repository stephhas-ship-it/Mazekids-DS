// Shared by Modal and Drawer so both dim the page identically.
const overlayClass =
  "fixed inset-0 z-40 bg-ink/30 data-[state=open]:animate-in data-[state=closed]:animate-out";

export default overlayClass;
