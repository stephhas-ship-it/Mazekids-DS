import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import cn from "../../../utils/cn";
import overlayClass from "./overlayClass";

const MODAL_SIZES = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {(open: boolean) => void} props.onOpenChange
 * @param {"sm"|"md"|"lg"} [props.size]  sm confirms, md forms, lg detail
 * @param {React.ReactNode} [props.footer]
 */
// Radix scopes focus, Escape and scroll-lock to the top-most layer, so overlays
// may stack one level (Drawer opening a ConfirmDialog). Never nest deeper.
const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  className = "",
  ...rest
}) => (
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
          className,
        )}
        {...rest}
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
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
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

export default Modal;
