import {
  getMockSavedExperts,
  mockCurrentUser,
  mockUserConversations,
  mockUserMessagesByConversation,
  mockUserNotifications,
  mockUserRequests,
  mockUserReviews,
} from "@/lib/mock-data/user-workspace-mock-data";
import { type UserSession } from "@/types/store/user-auth.types";
import {
  type UserShellData,
  type UserWorkspace,
} from "@/types/store/user-account.types";
import {
  unreadCount,
  unreadMessageTotal,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";

export function buildUserWorkspace(session: UserSession): UserWorkspace {
  return {
    account: {
      ...mockCurrentUser,
      displayName: session.profile?.displayName ?? mockCurrentUser.displayName,
      mobileDisplay:
        session.profile?.phoneMasked ?? mockCurrentUser.mobileDisplay,
    },
    requests: mockUserRequests,
    conversations: mockUserConversations,
    messagesByConversationId: mockUserMessagesByConversation,
    savedExperts: getMockSavedExperts(),
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
