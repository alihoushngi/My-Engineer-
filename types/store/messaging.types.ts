export type ParticipantRole = "user" | "engineer";

export type ConversationParticipant = {
  role: ParticipantRole;
  id: string;
  displayName: string;
  avatarSrc?: string;
};

/**
 * Delivery status for a stored message.
 * Read receipts are not a product contract.
 */
export type MessageDeliveryStatus = "sent";

export type Message = {
  id: string;
  conversationId: string;
  senderRole: ParticipantRole;
  senderId: string;
  content: string;
  createdAtLabel: string;
  createdAtMs: number;
  status: MessageDeliveryStatus;
};

export type ConversationLatestMessage = {
  id: string;
  preview: string;
  createdAtLabel: string;
  senderRole: ParticipantRole;
};

export type Conversation = {
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

export type MessagingOverlay = {
  conversations: readonly Conversation[];
  messages: readonly Message[];
};

export type MessagingSnapshot = {
  conversations: readonly Conversation[];
  messages: readonly Message[];
};
