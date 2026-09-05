import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type EngineerNotification } from "@/types/store/engineer.types";
import { type AppNotification } from "@/types/store/notification.types";
import {
  type UserNotification,
  type UserNotificationKind,
} from "@/types/store/user-account.types";

const USER_KINDS = new Set<UserNotificationKind>([
  "message",
  "request",
  "review",
  "account",
]);

export function toUserNotification(
  notification: AppNotification,
): UserNotification | null {
  if (
    notification.recipientRole !== "user" ||
    !USER_KINDS.has(notification.kind as UserNotificationKind)
  ) {
    return null;
  }

  return {
    id: notification.id,
    kind: notification.kind as UserNotificationKind,
    title: notification.title,
    body: notification.body,
    createdAtLabel: notification.createdAtLabel,
    isRead: notification.isRead,
    href: notification.href.startsWith("/account")
      ? notification.href
      : userAccountPaths.notifications,
  };
}

const ENGINEER_KINDS = new Set<EngineerNotification["kind"]>([
  "request",
  "message",
  "review",
  "verification",
  "credential",
]);

export function toEngineerNotification(
  notification: AppNotification,
): EngineerNotification | null {
  if (
    notification.recipientRole !== "engineer" ||
    !ENGINEER_KINDS.has(notification.kind as EngineerNotification["kind"])
  ) {
    return null;
  }

  return {
    id: notification.id,
    kind: notification.kind as EngineerNotification["kind"],
    title: notification.title,
    body: notification.body,
    createdAtLabel: notification.createdAtLabel,
    isRead: notification.isRead,
    href: notification.href.startsWith("/engineer")
      ? notification.href
      : engineerPanelPaths.notifications,
  };
}

export function userNotificationViews(
  items: readonly AppNotification[],
): readonly UserNotification[] {
  return items.flatMap((item) => {
    const mapped = toUserNotification(item);
    return mapped ? [mapped] : [];
  });
}

export function engineerNotificationViews(
  items: readonly AppNotification[],
): readonly EngineerNotification[] {
  return items.flatMap((item) => {
    const mapped = toEngineerNotification(item);
    return mapped ? [mapped] : [];
  });
}
