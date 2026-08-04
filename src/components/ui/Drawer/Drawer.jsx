import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import cn from "../../../utils/cn";
import overlayClass from "../Modal/overlayClass";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {(open: boolean) => void} props.onOpenChange
 * @param {string} [props.width]  Tailwind max-width class
 * @param {React.ReactNode} [props.footer]
 */
const Drawer = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  width = "max-w-md",
  className = "",
  ...rest
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={overlayClass} />
      <Dialog.Content
        aria-describedby={undefined}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-surface-2",
          "shadow-modal focus:outline-none",
          width,
          className,
        )}
        {...rest}
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

export default Drawer;
