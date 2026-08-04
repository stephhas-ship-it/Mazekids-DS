import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotificationBell from "./NotificationBell";

const ITEMS = [
  { id: "1", title: "Fee received", time: new Date().toISOString(), read: false },
  { id: "2", title: "Leave request", time: new Date().toISOString(), read: true },
];

describe("NotificationBell", () => {
  it("names the unread count in the trigger label", () => {
    render(<NotificationBell notifications={ITEMS} />);
    expect(screen.getByRole("button", { name: "Notifications, 1 unread" })).toBeTruthy();
  });

  it("drops the count when everything is read", () => {
    render(
      <NotificationBell notifications={[{ ...ITEMS[1] }]} />,
    );
    expect(screen.getByRole("button", { name: "Notifications" })).toBeTruthy();
  });
});
