"use server";

import { revalidatePath } from "next/cache";
import { isMockAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import {
  mutationUnauthorized,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { mockEngineerPublicExpertId } from "@/lib/mock-data/engineer-workspace-mock-data";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import {
  readNotificationCatalog,
  readNotificationOverlay,
  writeNotificationOverlay,
} from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { applyMarkNotificationRead } from "@/lib/notifications/notification-store/notification-store";
import { type NotificationRecipientRole } from "@/types/store/notification.types";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const UNAVAILABLE = "علامت‌خواندن اعلان پس از اتصال سرویس اعلان فعال می‌شود.";
const UNAUTHORIZED = "برای ادامه باید وارد حساب شوید.";

export async function markNotificationReadAction(input: {
  notificationId: string;
}): Promise<ServiceMutationResult> {
  const viewer = await resolveNotificationViewer();

  if (viewer.kind === "unavailable") {
    return mutationUnavailable(UNAVAILABLE);
  }

  if (viewer.kind === "unauthorized") {
    return mutationUnauthorized(UNAUTHORIZED);
  }

  const catalog = await readNotificationCatalog();
  await writeNotificationOverlay(
    applyMarkNotificationRead(
      await readNotificationOverlay(),
      catalog,
      input.notificationId,
      viewer.role,
      viewer.recipientId,
    ),
  );
  revalidatePath(
    viewer.role === "user"
      ? userAccountPaths.notifications
      : engineerPanelPaths.notifications,
  );
  revalidatePath(viewer.role === "user" ? "/account" : "/engineer");
  return { ok: true };
}

async function resolveNotificationViewer(): Promise<
  | {
      kind: "ok";
      role: NotificationRecipientRole;
      recipientId: string;
    }
  | { kind: "unauthorized" }
  | { kind: "unavailable" }
> {
  const userSession = await getUserSession();

  if (userSession) {
    if (!isMockUserAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return {
      kind: "ok",
      role: "user",
      recipientId: mockCurrentUser.id,
    };
  }

  const engineerSession = await getEngineerSession();

  if (engineerSession) {
    if (!isMockAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return {
      kind: "ok",
      role: "engineer",
      recipientId: mockEngineerPublicExpertId,
    };
  }

  return { kind: "unauthorized" };
}
