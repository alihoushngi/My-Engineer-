import assert from "node:assert/strict";
import test from "node:test";
import {
  parseNotificationOverlayCookie,
  serializeNotificationOverlayCookie,
} from "./notification-overlay-cookie.ts";

test("notification overlay cookie round-trips", () => {
  const overlay = {
    notifications: [
      {
        id: "n-1",
        recipientRole: "user" as const,
        recipientId: "user-sara",
        kind: "review",
        title: "نظر",
        body: "ثبت شد",
        createdAtLabel: "الان",
        createdAtMs: 1,
        isRead: false,
        href: "/account/reviews/r1",
      },
    ],
  };
  const parsed = parseNotificationOverlayCookie(
    serializeNotificationOverlayCookie(overlay),
  );
  assert.equal(parsed.notifications[0]?.id, "n-1");
  assert.equal(parsed.notifications[0]?.isRead, false);
});

test("invalid notification overlay cookies become empty", () => {
  assert.deepEqual(parseNotificationOverlayCookie(undefined), {
    notifications: [],
  });
});
