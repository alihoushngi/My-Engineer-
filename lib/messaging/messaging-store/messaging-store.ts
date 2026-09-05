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

type ConversationLatestMessage = {
  id: string;
  preview: string;
  createdAtLabel: string;
  senderRole: ParticipantRole;
};

type Conversation = {
  id: string;
  participants: readonly ConversationParticipant[];
  relatedRequestId?: string;
  relatedServiceLabel?: string;
  relatedEngineerId: string;
  relatedCustomerId: string;
  latestMessage?: ConversationLatestMessage;
  unreadByRole: { user: number; engineer: number };
  createdAtLabel: string;
  updatedAtLabel: string;
  updatedAtMs: number;
};

type MessagingOverlay = {
  conversations: readonly Conversation[];
  messages: readonly Message[];
};

type MessagingSnapshot = {
  conversations: readonly Conversation[];
  messages: readonly Message[];
};

export function findConversationForPair(
  conversations: readonly Conversation[],
  customerId: string,
  engineerId: string,
): Conversation | undefined {
  return conversations.find(
    (item) =>
      item.relatedCustomerId === customerId &&
      item.relatedEngineerId === engineerId,
  );
}

export function mergeMessagingSnapshot(
  seed: MessagingSnapshot,
  overlay: MessagingOverlay,
): MessagingSnapshot {
  const conversations = mergeById(
    seed.conversations,
    overlay.conversations,
  ).sort((left, right) => right.updatedAtMs - left.updatedAtMs);
  const overlayIds = new Set(overlay.messages.map((item) => item.id));
  const messages = [
    ...seed.messages.filter((item) => !overlayIds.has(item.id)),
    ...overlay.messages,
  ].sort((left, right) => left.createdAtMs - right.createdAtMs);

  return {
    conversations: withLatestFromMessages(conversations, messages),
    messages,
  };
}

function withLatestFromMessages(
  conversations: readonly Conversation[],
  messages: readonly Message[],
): readonly Conversation[] {
  const lastByConversation = new Map<string, Message>();

  for (const message of messages) {
    lastByConversation.set(message.conversationId, message);
  }

  return conversations.map((conversation) => {
    const last = lastByConversation.get(conversation.id);

    if (!last) {
      return conversation;
    }

    return {
      ...conversation,
      latestMessage: {
        id: last.id,
        preview: excerptMessagePreview(last.content),
        createdAtLabel: last.createdAtLabel,
        senderRole: last.senderRole,
      },
      updatedAtLabel: last.createdAtLabel,
      updatedAtMs: Math.max(conversation.updatedAtMs, last.createdAtMs),
    };
  });
}

export function messagesForConversation(
  messages: readonly Message[],
  conversationId: string,
): readonly Message[] {
  return messages.filter((item) => item.conversationId === conversationId);
}

export function excerptMessagePreview(content: string, max = 72): string {
  const normalized = content.trim().replace(/\s+/g, " ");

  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max).trimEnd()}…`;
}

export function applySendMessage(
  overlay: MessagingOverlay,
  input: {
    conversation: Conversation;
    message: Message;
    viewerRole: ParticipantRole;
  },
): MessagingOverlay {
  const otherRole = input.viewerRole === "user" ? "engineer" : "user";
  const updatedConversation: Conversation = {
    ...input.conversation,
    latestMessage: {
      id: input.message.id,
      preview: excerptMessagePreview(input.message.content),
      createdAtLabel: input.message.createdAtLabel,
      senderRole: input.message.senderRole,
    },
    unreadByRole: {
      ...input.conversation.unreadByRole,
      [otherRole]: input.conversation.unreadByRole[otherRole] + 1,
    },
    updatedAtLabel: input.message.createdAtLabel,
    updatedAtMs: input.message.createdAtMs,
  };

  return {
    conversations: upsertById(overlay.conversations, updatedConversation),
    messages: [...overlay.messages, input.message],
  };
}

export function applyMarkRead(
  overlay: MessagingOverlay,
  conversation: Conversation,
  role: ParticipantRole,
): MessagingOverlay {
  if (conversation.unreadByRole[role] === 0) {
    return overlay;
  }

  return {
    ...overlay,
    conversations: upsertById(overlay.conversations, {
      ...conversation,
      unreadByRole: {
        ...conversation.unreadByRole,
        [role]: 0,
      },
    }),
  };
}

export function conversationsForCustomer(
  conversations: readonly Conversation[],
  customerId: string,
): readonly Conversation[] {
  return conversations.filter((item) => item.relatedCustomerId === customerId);
}

export function conversationsForEngineer(
  conversations: readonly Conversation[],
  engineerId: string,
): readonly Conversation[] {
  return conversations.filter((item) => item.relatedEngineerId === engineerId);
}

function mergeById<T extends { id: string }>(
  seed: readonly T[],
  overlay: readonly T[],
): T[] {
  const byId = new Map(seed.map((item) => [item.id, item]));

  for (const item of overlay) {
    byId.set(item.id, item);
  }

  return [...byId.values()];
}

function upsertById<T extends { id: string }>(
  items: readonly T[],
  next: T,
): readonly T[] {
  const without = items.filter((item) => item.id !== next.id);
  return [next, ...without];
}
