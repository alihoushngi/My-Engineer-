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

const ROLES = new Set(["user", "engineer"]);
const KINDS = new Set([
  "message",
  "request",
  "review",
  "account",
  "verification",
  "credential",
]);

export function parseNotificationOverlayCookie(
  raw: string | undefined,
): NotificationOverlay {
  if (!raw) {
    return { notifications: [] };
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (!isRecord(parsed) || !Array.isArray(parsed.notifications)) {
      return { notifications: [] };
    }

    return {
      notifications: parsed.notifications.flatMap((item) => {
        const notification = readNotification(item);
        return notification ? [notification] : [];
      }),
    };
  } catch {
    return { notifications: [] };
  }
}

export function serializeNotificationOverlayCookie(
  overlay: NotificationOverlay,
): string {
  return encodeURIComponent(JSON.stringify(overlay));
}

function readNotification(value: unknown): AppNotification | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const recipientRole = readString(value.recipientRole);
  const recipientId = readString(value.recipientId);
  const kind = readString(value.kind);
  const title = readString(value.title);
  const body = readString(value.body);
  const createdAtLabel = readString(value.createdAtLabel);
  const href = readString(value.href);
  const createdAtMs = readNumber(value.createdAtMs);

  if (
    !id ||
    !recipientRole ||
    !ROLES.has(recipientRole) ||
    !recipientId ||
    !kind ||
    !KINDS.has(kind) ||
    !title ||
    !body ||
    !createdAtLabel ||
    !href ||
    createdAtMs === undefined ||
    typeof value.isRead !== "boolean"
  ) {
    return null;
  }

  return {
    id,
    recipientRole: recipientRole as "user" | "engineer",
    recipientId,
    kind: kind as AppNotification["kind"],
    title,
    body,
    createdAtLabel,
    createdAtMs,
    isRead: value.isRead,
    href,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}
