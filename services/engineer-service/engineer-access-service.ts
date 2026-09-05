/**
 * Server-only engineer access reads.
 * Do not import this module from Client Components.
 */

import { env } from "@/lib/env/env";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getMockEngineerWorkspace } from "@/lib/mock-data/build-engineer-workspace/build-engineer-workspace";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { isMockAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { buildSessionEngineerWorkspace } from "@/lib/auth/build-session-engineer-workspace/build-session-engineer-workspace";
import { readCreatedRequests } from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import { overlayEngineerRequests } from "@/lib/marketplace/overlay-engineer-requests/overlay-engineer-requests";
import {
  type EngineerAccessResult,
  type EngineerConversation,
  type EngineerMessage,
  type EngineerNotification,
  type EngineerRequest,
  type EngineerReview,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";
import { findEngineerReview } from "@/lib/engineer/find-engineer-review/find-engineer-review";

export async function getEngineerAccess(): Promise<EngineerAccessResult> {
  const extras = await readCreatedRequests();
  const session = await getEngineerSession();

  if (session) {
    return {
      kind: session.source === "registration" ? "pending_review" : "active",
      workspace: overlayEngineerRequests(
        buildSessionEngineerWorkspace(session),
        extras,
      ),
    };
  }

  if (await getUserSession()) {
    return { kind: "forbidden" };
  }

  if (isMockAuthEnabled()) {
    return { kind: "unauthenticated" };
  }

  if (env.useMockData) {
    return {
      kind: "visual_review",
      workspace: overlayEngineerRequests(getMockEngineerWorkspace(), extras),
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

export async function getEngineerReview(
  id: string,
): Promise<EngineerReview | null> {
  const workspace = await getEngineerWorkspace();
  return findEngineerReview(workspace?.reviews ?? [], id);
}

export async function getEngineerNotifications(): Promise<
  readonly EngineerNotification[]
> {
  const workspace = await getEngineerWorkspace();
  return workspace?.notifications ?? [];
}
