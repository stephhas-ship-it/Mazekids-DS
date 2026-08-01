/* overlays.jsx — Modal, Drawer, Tooltip, DropdownMenu, Toast.
   Behaviour + a11y from Radix; look from tokens. */
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import * as Menu from "@radix-ui/react-dropdown-menu";
import * as RadixToast from "@radix-ui/react-toast";
import { X, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/cn";

const overlayClass =
  "fixed inset-0 z-40 bg-ink/30 data-[state=open]:animate-in data-[state=closed]:animate-out";

/* ---------- Modal (centered dialog) ----------
   Sizes: sm (max-w-sm, confirms), md (default, forms), lg (max-w-2xl,
   detail/preview). NESTING: overlays may stack one level — e.g. a Drawer
   opening a ConfirmDialog. Radix scopes focus/escape to the top-most
   layer automatically; never nest deeper than two. */
const MODAL_SIZES = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClass} />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[92vw] -translate-x-1/2 -translate-y-1/2",
            MODAL_SIZES[size] ?? MODAL_SIZES.md,
            "rounded-card border border-border bg-surface-2 p-6 shadow-modal",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="font-display text-xl text-ink">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="mt-1 text-sm text-ink-muted">
              {description}
            </Dialog.Description>
          )}
          {children && <div className="mt-4">{children}</div>}
          {footer && (
            <div className="mt-6 flex justify-end gap-2">{footer}</div>
          )}
          <Dialog.Close
            className="absolute right-4 top-4 rounded-control p-1 text-ink-muted hover:bg-surface-1 hover:text-ink"
            aria-label="Close"
          >
            <X size={16} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


/* ---------- ConfirmDialog — THE way to confirm destructive actions ----------
   Encodes the CONTENT.md contract: state the consequence, name the object.
   <ConfirmDialog
     open={open} onOpenChange={setOpen}
     title="Delete EXP-2026-002?"
     description="This can't be undone."
     confirmLabel="Delete expense"
     onConfirm={handleDelete}
   /> */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description = "This can't be undone.",
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "danger", // "danger" | "primary" (for non-destructive confirms)
  loading,
  onConfirm,
}) {
  if (typeof process !== "undefined" &&
    process.env.NODE_ENV !== "production" && confirmLabel === undefined) {
    // "Delete expense", never bare "OK"/"Yes" — see CONTENT.md.
    console.warn("ConfirmDialog: confirmLabel is required (verb + object).");
  }
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={title}
      description={description}
      footer={
        <>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-control px-4 text-sm font-medium text-ink-secondary hover:bg-surface-1"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-control px-4 text-sm font-medium text-white",
              "disabled:pointer-events-none disabled:opacity-50",
              tone === "danger"
                ? "bg-danger hover:brightness-95"
                : "bg-primary hover:bg-primary-hover",
            )}
          >
            {loading && (
              <span
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                aria-hidden="true"
              />
            )}
            {confirmLabel ?? "Confirm"}
          </button>
        </>
      }
    />
  );
}

/* ---------- Drawer (right-side panel, for record detail / quick edit) ---------- */
export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  footer,
  width = "max-w-md",
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClass} />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-surface-2",
            "shadow-modal focus:outline-none",
            width,
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Dialog.Title className="font-display text-lg text-ink">
              {title}
            </Dialog.Title>
            <Dialog.Close
              className="rounded-control p-1 text-ink-muted hover:bg-surface-1 hover:text-ink"
              aria-label="Close"
            >
              <X size={16} />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && (
            <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ---------- Tooltip ---------- */
export function Tooltip({ label, children }) {
  return (
    <RadixTooltip.Provider delayDuration={250}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={6}
            className="z-50 rounded-control bg-ink px-2.5 py-1 text-xs text-surface-0 shadow-md"
          >
            {label}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

/* ---------- Row actions / dropdown menu ---------- */
export function ActionsMenu({ items, trigger }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {trigger ?? (
          <button
            className="rounded-control px-2 py-1 text-border-strong hover:bg-surface-1 hover:text-ink-secondary"
            aria-label="Row actions"
          >
            <MoreHorizontal size={16} />
          </button>
        )}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-[150px] rounded-input border border-border bg-surface-2 p-1 shadow-popover"
        >
          {items.map((it) => (
            <Menu.Item
              key={it.label}
              onSelect={it.onSelect}
              className={cn(
                "cursor-pointer select-none rounded-control px-2.5 py-1.5 text-sm outline-none",
                it.danger
                  ? "text-danger-fg data-[highlighted]:bg-danger-bg"
                  : "text-ink-secondary data-[highlighted]:bg-primary-subtle data-[highlighted]:text-primary",
              )}
            >
              {it.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

const ToastCtx = React.createContext(null);

export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const push = React.useCallback((t) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { ...t, id }]);
    return id;
  }, []);
  const update = React.useCallback((id, t) => {
    setToasts((p) => p.map((x) => (x.id === id ? { ...x, ...t } : x)));
  }, []);
  const dismiss = React.useCallback((id) => {
    setToasts((p) => p.filter((x) => x.id !== id));
  }, []);
  /* Async flows: loading -> success/error, one toast that updates in place.
     toast.promise(saveExpense(), {
       loading: "Saving expense…",
       success: "Expense recorded.",
       error: "Couldn't save the expense. Check your connection and try again.",
     }); */
  const promise = React.useCallback(
    (p, { loading = "Working…", success, error }) => {
      const id = push({ title: loading, tone: "neutral", sticky: true });
      // Replace (dismiss + push) rather than mutating in place: a fresh
      // Radix Root guarantees the auto-dismiss timer starts, instead of
      // relying on Radix restarting a timer when `duration` changes.
      const settle = (title, tone) => {
        dismiss(id);
        push({ title, tone });
      };
      return p
        .then((res) => {
          settle(typeof success === "function" ? success(res) : success, "success");
          return res;
        })
        .catch((err) => {
          settle(typeof error === "function" ? error(err) : error, "danger");
          throw err;
        });
    },
    [push, dismiss],
  );
  return (
    <ToastCtx.Provider value={{ push, update, dismiss, promise }}>
      <RadixToast.Provider swipeDirection="right" duration={3500}>
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            duration={t.sticky ? Infinity : undefined}
            onOpenChange={(o) =>
              !o && setToasts((p) => p.filter((x) => x.id !== t.id))
            }
            className={cn(
              "rounded-input border px-4 py-3 text-sm shadow-popover",
              t.tone === "success" &&
                "border-success/30 bg-success-bg text-success-fg",
              t.tone === "danger" &&
                "border-danger/30 bg-danger-bg text-danger-fg",
              t.tone === "warning" &&
                "border-warning/30 bg-warning-bg text-warning-fg",
              (!t.tone || t.tone === "neutral") &&
                "border-border bg-surface-2 text-ink",
            )}
          >
            <RadixToast.Title>{t.title}</RadixToast.Title>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2" />
      </RadixToast.Provider>
    </ToastCtx.Provider>
  );
}
