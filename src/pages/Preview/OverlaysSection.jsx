import * as React from "react";
import {
  Button,
  Tooltip,
  ActionsMenu,
  Modal,
  Drawer,
  ConfirmDialog,
  Field,
  Input,
  DescriptionList,
  NotificationBell,
  NotificationList,
  Inline,
  useToast,
} from "../../index";
import Section from "./Section";
import { demoNotifications } from "./mockData";

const OverlaysSection = ({ confirmOpen, onConfirmOpenChange }) => {
  const toast = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const notifications = React.useMemo(demoNotifications, []);

  return (
    <>
      <Section title="Overlays & toasts">
        <Inline space={2}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Button variant="destructive" onClick={() => onConfirmOpenChange(true)}>
            Open ConfirmDialog
          </Button>
          <Tooltip label="Helpful hint">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
          <ActionsMenu
            items={[
              { label: "Edit", onSelect: () => {} },
              { label: "Delete", onSelect: () => {} },
            ]}
          />
          <Button
            variant="secondary"
            onClick={() =>
              toast.promise(new Promise((r) => setTimeout(r, 1200)), {
                loading: "Saving expense…",
                success: "Expense recorded.",
                error: "Couldn't save the expense.",
              })
            }
          >
            toast.promise demo
          </Button>
        </Inline>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Edit expense"
          description="EXP-001 · BESCOM"
          footer={<Button onClick={() => setModalOpen(false)}>Save changes</Button>}
        >
          <Field label="Amount (₹)">
            <Input defaultValue="18500" />
          </Field>
        </Modal>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title="Expense detail"
        >
          <DescriptionList items={[{ label: "Vendor", value: "BESCOM" }]} />
        </Drawer>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={onConfirmOpenChange}
          title="Delete EXP-001?"
          description="This can't be undone."
          confirmLabel="Delete expense"
          onConfirm={() => {
            onConfirmOpenChange(false);
            toast.push({ title: "Deleted EXP-001.", tone: "danger" });
          }}
        />
      </Section>

      <Section title="Notifications">
        <Inline space={3}>
          <NotificationBell
            notifications={notifications}
            onMarkAllRead={() => toast.push({ title: "All marked read." })}
            onNotificationClick={(n) => toast.push({ title: `Opened: ${n.title}` })}
            onViewAll={() => toast.push({ title: "View all." })}
          />
          <span className="text-sm text-ink-muted">
            ← bell with unread count; list below is the standalone component
          </span>
        </Inline>
        <div className="max-w-md rounded-card border border-border bg-surface-2">
          <NotificationList
            notifications={notifications}
            onNotificationClick={() => {}}
          />
        </div>
        <div className="max-w-md rounded-card border border-border bg-surface-2">
          <NotificationList notifications={[]} />
        </div>
      </Section>
    </>
  );
};

export default OverlaysSection;
