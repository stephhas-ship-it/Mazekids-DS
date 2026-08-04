import * as React from "react";
import { Modal, Button, Field, Input } from "../../index";

const EMPTY = { vendor: "", amount: "" };

const AddExpenseModal = ({ open, onOpenChange, onSave }) => {
  const [formData, setFormData] = React.useState(EMPTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const save = () => {
    onSave(formData);
    setFormData(EMPTY);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Add expense"
      description="Record a new school expense."
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save expense</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Vendor" required>
          <Input
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            placeholder="e.g. Jain Hardware"
          />
        </Field>
        <Field
          label="Amount (₹)"
          required
          help="Use whole rupees — formatting is automatic."
        >
          <Input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="45000"
          />
        </Field>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
