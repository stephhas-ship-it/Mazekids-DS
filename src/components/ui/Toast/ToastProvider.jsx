import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import cn from "../../../utils/cn";
import { ToastCtx } from "../../../hooks/useToast";

const toneClasses = {
  success: "border-success/30 bg-success-bg text-success-fg",
  danger: "border-danger/30 bg-danger-bg text-danger-fg",
  warning: "border-warning/30 bg-warning-bg text-warning-fg",
  neutral: "border-border bg-surface-2 text-ink",
};

/**
 * @param {object} props
 * @param {React.ReactNode} props.children  Wrap the app root once
 */
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);
  const nextId = React.useRef(0);

  const push = React.useCallback((t) => {
    const id = ++nextId.current;
    setToasts((p) => [...p, { ...t, id }]);
    return id;
  }, []);

  const update = React.useCallback((id, t) => {
    setToasts((p) => p.map((x) => (x.id === id ? { ...x, ...t } : x)));
  }, []);

  const dismiss = React.useCallback((id) => {
    setToasts((p) => p.filter((x) => x.id !== id));
  }, []);

  const promise = React.useCallback(
    (p, { loading = "Working…", success, error }) => {
      const id = push({ title: loading, tone: "neutral", sticky: true });
      // Dismiss + push rather than mutate: a fresh Radix Root guarantees the
      // auto-dismiss timer starts, instead of hoping it restarts on duration change.
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

  const value = React.useMemo(
    () => ({ push, update, dismiss, promise }),
    [push, update, dismiss, promise],
  );

  return (
    <ToastCtx.Provider value={value}>
      <RadixToast.Provider swipeDirection="right" duration={3500}>
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            duration={t.sticky ? Infinity : undefined}
            onOpenChange={(o) => !o && dismiss(t.id)}
            className={cn(
              "rounded-input border px-4 py-3 text-sm shadow-popover",
              toneClasses[t.tone] ?? toneClasses.neutral,
            )}
          >
            <RadixToast.Title>{t.title}</RadixToast.Title>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2" />
      </RadixToast.Provider>
    </ToastCtx.Provider>
  );
};

export default ToastProvider;
