export type NotificationRecipientRole = "user" | "engineer";

export type NotificationKind =
  "message" | "request" | "review" | "account" | "verification" | "credential";

export type AppNotification = {
  id: string;
  recipientRole: NotificationRecipientRole;
  recipientId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAtLabel: string;
  createdAtMs: number;
  isRead: boolean;
  href: string;
};

export type NotificationOverlay = {
  notifications: readonly AppNotification[];
};
