import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import {
  messagesForConversation,
  conversationsForCustomer,
  conversationsForEngineer,
} from "@/lib/messaging/messaging-store/messaging-store";
import {
  type EngineerConversation,
  type EngineerMessage,
} from "@/types/store/engineer.types";
import {
  type UserConversation,
  type UserMessage,
} from "@/types/store/user-account.types";
import {
  type Conversation,
  type Message,
  type MessagingSnapshot,
  type ParticipantRole,
} from "@/types/store/messaging.types";

export function toUserConversation(
  conversation: Conversation,
): UserConversation {
  const engineer = conversation.participants.find(
    (item) => item.role === "engineer",
  );

  return {
    id: conversation.id,
    participantName: engineer?.displayName ?? "متخصص",
    participantAvatarSrc: engineer?.avatarSrc,
    lastMessagePreview: conversation.latestMessage?.preview ?? "",
    lastMessageAtLabel: conversation.updatedAtLabel,
    unreadCount: conversation.unreadByRole.user,
    relatedRequestId: conversation.relatedRequestId,
    relatedServiceLabel: conversation.relatedServiceLabel,
    expertId: conversation.relatedEngineerId,
    href: `${userAccountPaths.messages}/${conversation.id}`,
  };
}

export function toEngineerConversation(
  conversation: Conversation,
): EngineerConversation {
  const customer = conversation.participants.find(
    (item) => item.role === "user",
  );

  return {
    id: conversation.id,
    participantName: customer?.displayName ?? "متقاضی",
    participantAvatarSrc: customer?.avatarSrc,
    lastMessagePreview: conversation.latestMessage?.preview ?? "",
    lastMessageAtLabel: conversation.updatedAtLabel,
    unreadCount: conversation.unreadByRole.engineer,
    relatedRequestId: conversation.relatedRequestId,
    relatedServiceLabel: conversation.relatedServiceLabel,
    href: `${engineerPanelPaths.messages}/${conversation.id}`,
  };
}

export function toUserMessage(message: Message): UserMessage {
  return {
    id: message.id,
    conversationId: message.conversationId,
    body: message.content,
    sentAtLabel: message.createdAtLabel,
    fromUser: message.senderRole === "user",
    senderRole: message.senderRole,
  };
}

export function toEngineerMessage(message: Message): EngineerMessage {
  return {
    id: message.id,
    conversationId: message.conversationId,
    body: message.content,
    sentAtLabel: message.createdAtLabel,
    fromEngineer: message.senderRole === "engineer",
    senderRole: message.senderRole,
  };
}

export function userMessagingViews(
  snapshot: MessagingSnapshot,
  customerId: string,
): {
  conversations: readonly UserConversation[];
  messagesByConversationId: Readonly<Record<string, readonly UserMessage[]>>;
} {
  const conversations = conversationsForCustomer(
    snapshot.conversations,
    customerId,
  ).map(toUserConversation);
  return {
    conversations,
    messagesByConversationId: mapMessages(
      snapshot.messages,
      conversations.map((item) => item.id),
      toUserMessage,
    ),
  };
}

export function engineerMessagingViews(
  snapshot: MessagingSnapshot,
  engineerId: string,
): {
  conversations: readonly EngineerConversation[];
  messagesByConversationId: Readonly<
    Record<string, readonly EngineerMessage[]>
  >;
} {
  const conversations = conversationsForEngineer(
    snapshot.conversations,
    engineerId,
  ).map(toEngineerConversation);
  return {
    conversations,
    messagesByConversationId: mapMessages(
      snapshot.messages,
      conversations.map((item) => item.id),
      toEngineerMessage,
    ),
  };
}

export function isOwnMessage(
  senderRole: ParticipantRole,
  viewerRole: ParticipantRole,
): boolean {
  return senderRole === viewerRole;
}

function mapMessages<T>(
  messages: readonly Message[],
  conversationIds: readonly string[],
  map: (message: Message) => T,
): Readonly<Record<string, readonly T[]>> {
  const allowed = new Set(conversationIds);
  const grouped: Record<string, T[]> = {};

  for (const message of messages) {
    if (!allowed.has(message.conversationId)) {
      continue;
    }

    const list = grouped[message.conversationId] ?? [];
    list.push(map(message));
    grouped[message.conversationId] = list;
  }

  return grouped;
}

export { messagesForConversation };
