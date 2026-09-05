import {
  getMockSavedExperts,
  mockCurrentUser,
} from "@/lib/mock-data/user-workspace-mock-data";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import { mockServiceReviews } from "@/lib/mock-data/review-mock-data";
import { mockAppNotifications } from "@/lib/mock-data/notification-mock-data";
import { toUserRequest } from "@/lib/marketplace/request-projections/request-projections";
import { filterRequestsForParty } from "@/lib/marketplace/request-selectors/request-selectors";
import { type UserSession } from "@/types/store/user-auth.types";
import {
  type UserShellData,
  type UserWorkspace,
} from "@/types/store/user-account.types";
import { type ServiceRequest } from "@/types/store/service-request.types";
import { type MessagingSnapshot } from "@/types/store/messaging.types";
import { type AppNotification } from "@/types/store/notification.types";
import { type ServiceReview } from "@/types/store/review.types";
import { userMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import { userNotificationViews } from "@/lib/notifications/notification-projections/notification-projections";
import { notificationsForRecipient } from "@/lib/notifications/notification-store/notification-store";
import { userReviewsForCustomer } from "@/lib/reviews/review-projections/review-projections";
import {
  unreadCount,
  unreadMessageTotal,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";

type UserWorkspaceOverlay = {
  savedExpertIds?: readonly string[];
  extraRequests?: readonly ServiceRequest[];
  messaging?: MessagingSnapshot;
  reviews?: readonly ServiceReview[];
  notifications?: readonly AppNotification[];
};

export function buildUserWorkspace(
  session: UserSession,
  overlay: UserWorkspaceOverlay = {},
): UserWorkspace {
  const catalog = [...(overlay.extraRequests ?? []), ...mockServiceRequests];
  const owned = filterRequestsForParty(catalog, {
    customerId: mockCurrentUser.id,
  });
  const unique = uniqueById(owned);
  const messaging = userMessagingViews(
    overlay.messaging ?? mockMessagingSeed,
    mockCurrentUser.id,
  );
  const conversations = messaging.conversations;
  const reviews = overlay.reviews ?? mockServiceReviews;
  const notifications = overlay.notifications ?? mockAppNotifications;
  const requests = unique.map((request) => {
    const mapped = toUserRequest(request);
    const conversation = conversations.find(
      (item) => item.relatedRequestId === request.id,
    );
    const review = reviews.find(
      (item) =>
        item.relatedRequestId === request.id &&
        item.authorCustomerId === mockCurrentUser.id,
    );
    return {
      ...mapped,
      latestActivityLabel:
        conversation?.lastMessageAtLabel ?? request.createdAtLabel,
      reviewId: review?.id,
    };
  });

  return {
    account: {
      ...mockCurrentUser,
      displayName: session.profile?.displayName ?? mockCurrentUser.displayName,
      mobileDisplay:
        session.profile?.phoneMasked ?? mockCurrentUser.mobileDisplay,
    },
    requests,
    conversations,
    messagesByConversationId: messaging.messagesByConversationId,
    savedExperts: getMockSavedExperts(overlay.savedExpertIds),
    reviews: userReviewsForCustomer(reviews, mockCurrentUser.id),
    notifications: userNotificationViews(
      notificationsForRecipient(notifications, "user", mockCurrentUser.id),
    ),
  };
}

export function toUserShellData(workspace: UserWorkspace): UserShellData {
  return {
    displayName: workspace.account.displayName,
    avatarSrc: workspace.account.avatarSrc,
    unreadNotificationCount: unreadCount(workspace.notifications),
    unreadMessageCount: unreadMessageTotal(workspace.conversations),
  };
}

function uniqueById<T extends { id: string }>(
  items: readonly T[],
): readonly T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}
