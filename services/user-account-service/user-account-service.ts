/**
 * Server-only customer workspace reads.
 * Do not import this module from Client Components.
 */

import {
  getUserAccess,
  isUserAuthenticated,
} from "@/services/user-auth-service/user-access-service";
import { buildUserWorkspace } from "@/lib/user-account/build-user-workspace/build-user-workspace";
import {
  readCreatedRequests,
  readSavedExpertIds,
} from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import { readMessagingSnapshot } from "@/lib/messaging/mock-messaging-overlay/mock-messaging-overlay";
import { readNotificationCatalog } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { readReviewCatalog } from "@/lib/reviews/mock-review-overlay/mock-review-overlay";
import { findById } from "@/lib/user-account/workspace-selectors/workspace-selectors";
import {
  type UserConversation,
  type UserMessage,
  type UserRequest,
  type UserReviewItem,
  type UserWorkspace,
} from "@/types/store/user-account.types";

export async function getCurrentSavedExpertIds(): Promise<readonly string[]> {
  if (!(await isUserAuthenticated())) {
    return [];
  }

  return readSavedExpertIds();
}

export async function getUserWorkspace(): Promise<UserWorkspace | null> {
  const access = await getUserAccess();

  if (access.kind !== "authenticated") {
    return null;
  }

  return buildUserWorkspace(access.session, {
    savedExpertIds: await readSavedExpertIds(),
    extraRequests: await readCreatedRequests(),
    messaging: await readMessagingSnapshot(),
    reviews: await readReviewCatalog(),
    notifications: await readNotificationCatalog(),
  });
}

export async function getUserRequest(id: string): Promise<UserRequest | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.requests, id) : null;
}

export async function getUserConversation(
  id: string,
): Promise<UserConversation | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.conversations, id) : null;
}

export async function getUserMessages(
  conversationId: string,
): Promise<readonly UserMessage[]> {
  const workspace = await getUserWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getUserReview(
  id: string,
): Promise<UserReviewItem | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.reviews, id) : null;
}
