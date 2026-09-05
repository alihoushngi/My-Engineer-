/**
 * Server-only engineer access reads.
 * Do not import this module from Client Components.
 */

import { env } from "@/lib/env/env";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getMockEngineerWorkspace } from "@/lib/mock-data/build-engineer-workspace/build-engineer-workspace";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { isMockAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { buildSessionEngineerWorkspace } from "@/lib/auth/build-session-engineer-workspace/build-session-engineer-workspace";
import {
  type EngineerAccessResult,
  type EngineerConversation,
  type EngineerMessage,
  type EngineerNotification,
  type EngineerRequest,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";

export async function getEngineerAccess(): Promise<EngineerAccessResult> {
  const session = await getEngineerSession();

  if (session) {
    return {
      kind: session.source === "registration" ? "pending_review" : "active",
      workspace: buildSessionEngineerWorkspace(session),
    };
  }

  if (isMockAuthEnabled()) {
    return { kind: "unauthenticated" };
  }

  if (env.useMockData) {
    return {
      kind: "visual_review",
      workspace: getMockEngineerWorkspace(),
    };
  }

  return { kind: "unavailable" };
}

export async function getEngineerWorkspace(): Promise<EngineerWorkspace | null> {
  const access = await getEngineerAccess();

  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  return access.workspace;
}

export async function getEngineerRequest(
  id: string,
): Promise<EngineerRequest | null> {
  const workspace = await getEngineerWorkspace();
  return workspace?.requests.find((request) => request.id === id) ?? null;
}

export async function getEngineerConversation(
  id: string,
): Promise<EngineerConversation | null> {
  const workspace = await getEngineerWorkspace();
  return (
    workspace?.conversations.find((conversation) => conversation.id === id) ??
    null
  );
}

export async function getEngineerMessages(
  conversationId: string,
): Promise<readonly EngineerMessage[]> {
  const workspace = await getEngineerWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getEngineerNotifications(): Promise<
  readonly EngineerNotification[]
> {
  const workspace = await getEngineerWorkspace();
  return workspace?.notifications ?? [];
}
