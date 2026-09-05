import { mockExpertCards } from "@/lib/mock-data/mock-data";
import { toUserRequest } from "@/lib/marketplace/request-projections/request-projections";
import { userMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import { mockAppNotifications } from "@/lib/mock-data/notification-mock-data";
import { mockServiceReviews } from "@/lib/mock-data/review-mock-data";
import { notificationsForRecipient } from "@/lib/notifications/notification-store/notification-store";
import { userNotificationViews } from "@/lib/notifications/notification-projections/notification-projections";
import { userReviewsForCustomer } from "@/lib/reviews/review-projections/review-projections";
import {
  MOCK_MARKETPLACE_CUSTOMER_ID,
  mockServiceRequests,
} from "@/lib/mock-data/service-request-mock-data";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type UserAccount } from "@/types/store/user-account.types";

export const DEFAULT_SAVED_EXPERT_IDS = [
  "amirhossein-rostami",
  "nazanin-farhadi",
] as const;

export const mockCurrentUser: UserAccount = {
  id: MOCK_MARKETPLACE_CUSTOMER_ID,
  displayName: "سارا مشتری",
  mobileDisplay: "۰۹۱۲***۲۲۳۳",
  city: "تهران",
  cityId: "tehran",
};

export const mockUserRequests = mockServiceRequests
  .filter((request) => request.customerId === mockCurrentUser.id)
  .map(toUserRequest);

const userMessaging = userMessagingViews(mockMessagingSeed, mockCurrentUser.id);

export const mockUserConversations = userMessaging.conversations;
export const mockUserMessagesByConversation =
  userMessaging.messagesByConversationId;

export const mockUserReviews = userReviewsForCustomer(
  mockServiceReviews,
  mockCurrentUser.id,
);

export const mockUserNotifications = userNotificationViews(
  notificationsForRecipient(mockAppNotifications, "user", mockCurrentUser.id),
);

export function getMockSavedExperts(
  ids: readonly string[] = DEFAULT_SAVED_EXPERT_IDS,
): readonly ExpertCardData[] {
  return ids.flatMap((id) => {
    const card = mockExpertCards.find((expert) => expert.id === id);
    return card ? [card] : [];
  });
}

export const currentUser = mockCurrentUser;
export const userRequests = mockUserRequests;
export const userReviews = mockUserReviews;
export const userNotifications = mockUserNotifications;
export const userSavedExperts = getMockSavedExperts;
