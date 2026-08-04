import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationList from "./NotificationList";

const ITEMS = [
  { id: "1", title: "Fee received", time: new Date().toISOString(), read: false },
  { id: "2", title: "Staff leave request", time: new Date().toISOString(), read: true },
];

describe("NotificationList", () => {
  it("shows the empty message with no notifications", () => {
    render(<NotificationList notifications={[]} />);
    expect(screen.getByText("You're all caught up.")).toBeTruthy();
  });

  it("renders one entry per notification", () => {
    render(<NotificationList notifications={ITEMS} />);
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  it("marks unread items for screen readers, not by colour alone", () => {
    render(<NotificationList notifications={ITEMS} />);
    expect(screen.getByText("(unread)")).toBeTruthy();
  });

  it("reports the clicked notification", () => {
    const onNotificationClick = vi.fn();
    render(
      <NotificationList
        notifications={ITEMS}
        onNotificationClick={onNotificationClick}
      />,
    );
    fireEvent.click(screen.getByText("Fee received"));
    expect(onNotificationClick).toHaveBeenCalledWith(ITEMS[0]);
  });
});
