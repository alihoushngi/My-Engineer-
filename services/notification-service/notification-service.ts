/**
 * Notification mutations. Mock overlay only; no invented API URL.
 */

import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { markNotificationReadAction } from "@/services/notification-service/notification-actions";

export async function markNotificationRead(
  notificationId: string,
): Promise<void> {
  throwIfMutationFailed(await markNotificationReadAction({ notificationId }));
}
