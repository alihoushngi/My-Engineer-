import { cookies } from "next/headers";
import {
  MOCK_MESSAGING_COOKIE,
  MOCK_SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import {
  parseMessagingOverlayCookie,
  serializeMessagingOverlayCookie,
} from "@/lib/messaging/messaging-overlay-cookie/messaging-overlay-cookie";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import { mergeMessagingSnapshot } from "@/lib/messaging/messaging-store/messaging-store";
import {
  type MessagingOverlay,
  type MessagingSnapshot,
} from "@/types/store/messaging.types";

export async function readMessagingOverlay(): Promise<MessagingOverlay> {
  const store = await cookies();
  return parseMessagingOverlayCookie(store.get(MOCK_MESSAGING_COOKIE)?.value);
}

export async function writeMessagingOverlay(
  overlay: MessagingOverlay,
): Promise<void> {
  const store = await cookies();
  store.set({
    name: MOCK_MESSAGING_COOKIE,
    value: serializeMessagingOverlayCookie(overlay),
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });
}

export async function readMessagingSnapshot(): Promise<MessagingSnapshot> {
  const overlay = await readMessagingOverlay();
  return mergeMessagingSnapshot(mockMessagingSeed, overlay);
}
