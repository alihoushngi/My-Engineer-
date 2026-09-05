import { type ExpertCardData } from "@/types/store/expert.types";

export type UserRequestStatus = "sent" | "in_review" | "closed";

export type UserNotificationKind = "request" | "message" | "review";

export type UserAccount = {
  id: string;
  displayName: string;
  avatarSrc?: string;
  /** Already-masked display value. Never a full mobile number. */
  mobileDisplay?: string;
  city?: string;
  cityId?: string;
};

export type UserRequest = {
  id: string;
  title: string;
  serviceLabel: string;
  expertId: string;
  expertName: string;
  expertHref: `/experts/${string}`;
  city?: string;
  createdAtLabel: string;
  latestActivityLabel?: string;
  summary: string;
  description?: string;
  status: UserRequestStatus;
  conversationId?: string;
};

export type UserConversation = {
  id: string;
  participantName: string;
  lastMessagePreview: string;
  lastMessageAtLabel: string;
  unreadCount: number;
  relatedRequestId?: string;
  expertId?: string;
};

export type UserMessage = {
  id: string;
  conversationId: string;
  body: string;
  sentAtLabel: string;
  fromUser: boolean;
};

export type UserNotification = {
  id: string;
  kind: UserNotificationKind;
  title: string;
  body: string;
  createdAtLabel: string;
  isRead: boolean;
  href: string;
};

export type UserReviewItem = {
  id: string;
  expertId: string;
  expertName: string;
  expertHref: `/experts/${string}`;
  text: string;
  rating?: number;
  dateLabel?: string;
};

export type UserWorkspace = {
  account: UserAccount;
  requests: readonly UserRequest[];
  conversations: readonly UserConversation[];
  messagesByConversationId: Readonly<Record<string, readonly UserMessage[]>>;
  savedExperts: readonly ExpertCardData[];
  reviews: readonly UserReviewItem[];
  notifications: readonly UserNotification[];
};

export type UserShellData = {
  displayName: string;
  avatarSrc?: string;
  unreadNotificationCount: number;
  unreadMessageCount: number;
};
