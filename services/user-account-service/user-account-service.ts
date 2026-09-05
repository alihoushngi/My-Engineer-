/**
 * Server-only customer workspace reads.
 * Do not import this module from Client Components.
 */

import { getUserAccess } from "@/services/user-auth-service/user-access-service";
import { buildUserWorkspace } from "@/lib/user-account/build-user-workspace/build-user-workspace";
import { findById } from "@/lib/user-account/workspace-selectors/workspace-selectors";
import {
  type UserConversation,
  type UserMessage,
  type UserRequest,
  type UserWorkspace,
} from "@/types/store/user-account.types";

export async function getUserWorkspace(): Promise<UserWorkspace | null> {
  const access = await getUserAccess();

  if (access.kind !== "authenticated") {
    return null;
  }

  return buildUserWorkspace(access.session);
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
