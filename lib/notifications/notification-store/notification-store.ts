type AppNotification = {
  id: string;
  recipientRole: "user" | "engineer";
  recipientId: string;
  kind:
    | "message"
    | "request"
    | "review"
    | "account"
    | "verification"
    | "credential";
  title: string;
  body: string;
  createdAtLabel: string;
  createdAtMs: number;
  isRead: boolean;
  href: string;
};

type NotificationOverlay = {
  notifications: readonly AppNotification[];
};

export function mergeNotificationOverlay(
  seed: readonly AppNotification[],
  overlay: NotificationOverlay,
): readonly AppNotification[] {
  const byId = new Map(seed.map((item) => [item.id, item]));

  for (const item of overlay.notifications) {
    byId.set(item.id, item);
  }

  return [...byId.values()].sort(
    (left, right) => right.createdAtMs - left.createdAtMs,
  );
}

export function applyCreateNotification(
  overlay: NotificationOverlay,
  notification: AppNotification,
): NotificationOverlay {
  return {
    notifications: [
      notification,
      ...overlay.notifications.filter((item) => item.id !== notification.id),
    ],
  };
}

export function applyMarkNotificationRead(
  overlay: NotificationOverlay,
  seed: readonly AppNotification[],
  notificationId: string,
  recipientRole: "user" | "engineer",
  recipientId: string,
): NotificationOverlay {
  const current =
    overlay.notifications.find((item) => item.id === notificationId) ??
    seed.find((item) => item.id === notificationId);

  if (
    !current ||
    current.recipientRole !== recipientRole ||
    current.recipientId !== recipientId ||
    current.isRead
  ) {
    return overlay;
  }

  return {
    notifications: [
      { ...current, isRead: true },
      ...overlay.notifications.filter((item) => item.id !== notificationId),
    ],
  };
}

export function notificationsForRecipient(
  items: readonly AppNotification[],
  recipientRole: "user" | "engineer",
  recipientId: string,
): readonly AppNotification[] {
  return items.filter(
    (item) =>
      item.recipientRole === recipientRole && item.recipientId === recipientId,
  );
}
