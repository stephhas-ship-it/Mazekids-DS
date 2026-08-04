import Modal from "../Modal/Modal";
import Button from "../Button/Button";

/**
 * @param {object} props
 * @param {string} props.title  Name the object: "Delete EXP-2026-002?"
 * @param {string} props.confirmLabel  Verb + object ("Delete expense"), never bare "OK"
 * @param {"danger"|"primary"} [props.tone]
 * @param {boolean} [props.loading]
 */
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description = "This can't be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  loading,
  onConfirm,
  ...rest
}) => (
  <Modal
    open={open}
    onOpenChange={onOpenChange}
    size="sm"
    title={title}
    description={description}
    footer={
      <>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === "danger" ? "danger" : "primary"}
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </>
    }
    {...rest}
  />
);

export default ConfirmDialog;
