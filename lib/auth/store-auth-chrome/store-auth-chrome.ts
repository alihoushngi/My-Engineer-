import { type EngineerSession } from "@/types/store/engineer-auth.types";
import { type StoreAuthChrome } from "@/types/store/auth.types";
import { type UserSession } from "@/types/store/user-auth.types";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

export function toStoreAuthChrome(input: {
  userSession: UserSession | null;
  engineerSession: EngineerSession | null;
  unreadNotificationCount?: number;
}): StoreAuthChrome {
  if (input.userSession) {
    return {
      status: "user",
      displayName:
        input.userSession.profile?.displayName ?? userAuthCopy.accountCta,
      unreadNotificationCount: input.unreadNotificationCount ?? 0,
    };
  }

  if (input.engineerSession) {
    return { status: "engineer" };
  }

  return { status: "guest" };
}
