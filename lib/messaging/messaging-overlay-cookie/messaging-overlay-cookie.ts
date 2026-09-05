/** Keep in sync with `types/store/messaging.types.ts`. Node tests cannot import that file. */
type ParticipantRole = "user" | "engineer";

type ConversationParticipant = {
  role: ParticipantRole;
  id: string;
  displayName: string;
  avatarSrc?: string;
};

type Message = {
  id: string;
  conversationId: string;
  senderRole: ParticipantRole;
  senderId: string;
  content: string;
  createdAtLabel: string;
  createdAtMs: number;
  status: "sent";
};

type Conversation = {
  id: string;
  participants: readonly ConversationParticipant[];
  relatedRequestId?: string;
  relatedServiceLabel?: string;
  relatedEngineerId: string;
  relatedCustomerId: string;
  unreadByRole: { user: number; engineer: number };
  createdAtLabel: string;
  updatedAtLabel: string;
  updatedAtMs: number;
};

type MessagingOverlay = {
  conversations: readonly Conversation[];
  messages: readonly Message[];
};

export function parseMessagingOverlayCookie(
  raw: string | undefined,
): MessagingOverlay {
  if (!raw) {
    return { conversations: [], messages: [] };
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (!isRecord(parsed)) {
      return { conversations: [], messages: [] };
    }

    const conversations = Array.isArray(parsed.conversations)
      ? parsed.conversations.flatMap((item) => {
          const conversation = readConversation(item);
          return conversation ? [conversation] : [];
        })
      : [];
    const messages = Array.isArray(parsed.messages)
      ? parsed.messages.flatMap((item) => {
          const message = readMessage(item);
          return message ? [message] : [];
        })
      : [];

    return { conversations, messages };
  } catch {
    return { conversations: [], messages: [] };
  }
}

export function serializeMessagingOverlayCookie(
  overlay: MessagingOverlay,
): string {
  return encodeURIComponent(JSON.stringify(overlay));
}

function readConversation(value: unknown): Conversation | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const relatedEngineerId = readString(value.relatedEngineerId);
  const relatedCustomerId = readString(value.relatedCustomerId);
  const createdAtLabel = readString(value.createdAtLabel);
  const updatedAtLabel = readString(value.updatedAtLabel);
  const updatedAtMs = readNumber(value.updatedAtMs);
  const unread = isRecord(value.unreadByRole)
    ? {
        user: readNumber(value.unreadByRole.user) ?? 0,
        engineer: readNumber(value.unreadByRole.engineer) ?? 0,
      }
    : null;

  if (
    !id ||
    !relatedEngineerId ||
    !relatedCustomerId ||
    !createdAtLabel ||
    !updatedAtLabel ||
    updatedAtMs === undefined ||
    !unread
  ) {
    return null;
  }

  const participants = Array.isArray(value.participants)
    ? value.participants.flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const role = readRole(item.role);
        const participantId = readString(item.id);
        const displayName = readString(item.displayName);

        if (!role || !participantId || !displayName) {
          return [];
        }

        return [
          {
            role,
            id: participantId,
            displayName,
            avatarSrc: readString(item.avatarSrc),
          },
        ];
      })
    : [];

  if (participants.length < 2) {
    return null;
  }

  return {
    id,
    participants,
    relatedRequestId: readString(value.relatedRequestId),
    relatedServiceLabel: readString(value.relatedServiceLabel),
    relatedEngineerId,
    relatedCustomerId,
    unreadByRole: unread,
    createdAtLabel,
    updatedAtLabel,
    updatedAtMs,
  };
}

function readMessage(value: unknown): Message | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const conversationId = readString(value.conversationId);
  const senderRole = readRole(value.senderRole);
  const senderId = readString(value.senderId);
  const content = readString(value.content);
  const createdAtLabel = readString(value.createdAtLabel);
  const createdAtMs = readNumber(value.createdAtMs);

  if (
    !id ||
    !conversationId ||
    !senderRole ||
    !senderId ||
    !content ||
    !createdAtLabel ||
    createdAtMs === undefined
  ) {
    return null;
  }

  return {
    id,
    conversationId,
    senderRole,
    senderId,
    content,
    createdAtLabel,
    createdAtMs,
    status: "sent",
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

function readRole(value: unknown): ParticipantRole | undefined {
  const role = readString(value);
  return role === "user" || role === "engineer" ? role : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}
