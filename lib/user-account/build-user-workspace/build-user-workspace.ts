import {
  getMockSavedExperts,
  mockCurrentUser,
  mockUserConversations,
  mockUserMessagesByConversation,
  mockUserNotifications,
  mockUserReviews,
} from "@/lib/mock-data/user-workspace-mock-data";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import { toUserRequest } from "@/lib/marketplace/request-projections/request-projections";
import { filterRequestsForParty } from "@/lib/marketplace/request-selectors/request-selectors";
import { type UserSession } from "@/types/store/user-auth.types";
import {
  type UserShellData,
  type UserWorkspace,
} from "@/types/store/user-account.types";
import { type ServiceRequest } from "@/types/store/service-request.types";
import {
  unreadCount,
  unreadMessageTotal,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";

type UserWorkspaceOverlay = {
  savedExpertIds?: readonly string[];
  extraRequests?: readonly ServiceRequest[];
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
  const conversations = mockUserConversations;
  const requests = unique.map((request) => {
    const mapped = toUserRequest(request);
    const conversation = conversations.find(
      (item) => item.relatedRequestId === request.id,
    );
    return {
      ...mapped,
      latestActivityLabel:
        conversation?.lastMessageAtLabel ?? request.createdAtLabel,
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
    messagesByConversationId: mockUserMessagesByConversation,
    savedExperts: getMockSavedExperts(overlay.savedExpertIds),
    reviews: mockUserReviews,
    notifications: mockUserNotifications,
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
