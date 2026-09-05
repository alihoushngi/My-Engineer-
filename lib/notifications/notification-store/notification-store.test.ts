import assert from "node:assert/strict";
import test from "node:test";
import {
  applyCreateNotification,
  applyMarkNotificationRead,
  mergeNotificationOverlay,
  notificationsForRecipient,
} from "./notification-store.ts";

const userNote = {
  id: "n-1",
  recipientRole: "user" as const,
  recipientId: "user-sara",
  kind: "message",
  title: "پیام",
  body: "متن",
  createdAtLabel: "الان",
  createdAtMs: 10,
  isRead: false,
  href: "/account/messages/c1",
};

const engineerNote = {
  ...userNote,
  id: "n-2",
  recipientRole: "engineer" as const,
  recipientId: "eng-a",
  href: "/engineer/messages/c1",
};

test("notificationsForRecipient never mixes private recipients", () => {
  const list = notificationsForRecipient(
    [userNote, engineerNote],
    "user",
    "user-sara",
  );
  assert.deepEqual(
    list.map((item) => item.id),
    ["n-1"],
  );
});

test("applyMarkNotificationRead only updates the matching recipient", () => {
  const overlay = applyMarkNotificationRead(
    { notifications: [] },
    [userNote, engineerNote],
    "n-1",
    "user",
    "user-sara",
  );
  assert.equal(overlay.notifications[0]?.isRead, true);
  const blocked = applyMarkNotificationRead(
    { notifications: [] },
    [userNote],
    "n-1",
    "engineer",
    "eng-a",
  );
  assert.equal(blocked.notifications.length, 0);
});

test("mergeNotificationOverlay prefers overlay records", () => {
  const merged = mergeNotificationOverlay([userNote], {
    notifications: [{ ...userNote, isRead: true, createdAtMs: 20 }],
  });
  assert.equal(merged[0]?.isRead, true);
});

test("applyCreateNotification prepends", () => {
  const overlay = applyCreateNotification({ notifications: [] }, engineerNote);
  assert.equal(overlay.notifications[0]?.id, "n-2");
});
