/**
 * Integration-ready messaging access. No backend URL is invented.
 * Mock mode writes a shared session overlay both panels read.
 */

import {
  mutationFailed,
  throwIfMutationFailed,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  markConversationReadAction,
  sendMessageAction,
  startConversationAction,
} from "@/services/messaging-service/messaging-actions";

export async function sendMessage(input: {
  conversationId: string;
  body: string;
}): Promise<void> {
  throwIfMutationFailed(await sendMessageAction(input));
}

export async function markConversationRead(
  conversationId: string,
): Promise<void> {
  throwIfMutationFailed(await markConversationReadAction({ conversationId }));
}

export async function startOrOpenConversation(
  expertId: string,
): Promise<string> {
  const result = await startConversationAction({ expertId });
  throwIfMutationFailed(result);

  if (!result.conversationId) {
    throwIfMutationFailed(mutationFailed("گفتگو ساخته نشد."));
    throw new Error("گفتگو ساخته نشد.");
  }

  return result.conversationId;
}
