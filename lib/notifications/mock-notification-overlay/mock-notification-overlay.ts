import { cookies } from "next/headers";
import {
  MOCK_NOTIFICATIONS_COOKIE,
  MOCK_SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import {
  parseNotificationOverlayCookie,
  serializeNotificationOverlayCookie,
} from "@/lib/notifications/notification-overlay-cookie/notification-overlay-cookie";
import {
  mergeNotificationOverlay,
  notificationsForRecipient,
} from "@/lib/notifications/notification-store/notification-store";
import { mockAppNotifications } from "@/lib/mock-data/notification-mock-data";
import {
  type AppNotification,
  type NotificationOverlay,
  type NotificationRecipientRole,
} from "@/types/store/notification.types";

export async function readNotificationOverlay(): Promise<NotificationOverlay> {
  const store = await cookies();
  return parseNotificationOverlayCookie(
    store.get(MOCK_NOTIFICATIONS_COOKIE)?.value,
  );
}

export async function writeNotificationOverlay(
  overlay: NotificationOverlay,
): Promise<void> {
  const store = await cookies();
  store.set({
    name: MOCK_NOTIFICATIONS_COOKIE,
    value: serializeNotificationOverlayCookie(overlay),
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });
}

export async function readNotificationCatalog(): Promise<
  readonly AppNotification[]
> {
  return mergeNotificationOverlay(
    mockAppNotifications,
    await readNotificationOverlay(),
  );
}

export async function readRecipientNotifications(
  recipientRole: NotificationRecipientRole,
  recipientId: string,
): Promise<readonly AppNotification[]> {
  return notificationsForRecipient(
    await readNotificationCatalog(),
    recipientRole,
    recipientId,
  );
}
