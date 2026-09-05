import { engineerMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { type MessagingSnapshot } from "@/types/store/messaging.types";

export function overlayEngineerMessaging(
  workspace: EngineerWorkspace,
  snapshot: MessagingSnapshot,
): EngineerWorkspace {
  const views = engineerMessagingViews(
    snapshot,
    workspace.account.publicExpertId,
  );

  return {
    ...workspace,
    conversations: views.conversations,
    messagesByConversationId: views.messagesByConversationId,
  };
}
