import { type AccountRole } from "@/types/store/auth.types";

export type UserSessionSource = "login" | "registration";

export type MockUserProfileSnapshot = {
  displayName?: string;
  phoneMasked?: string;
  source?: UserSessionSource;
};

export type UserSession = {
  isAuthenticated: true;
  role: Extract<AccountRole, "user">;
  isMock: boolean;
  source: UserSessionSource;
  profile?: MockUserProfileSnapshot;
};

export type UserAccessKind =
  | "checking"
  | "authenticated"
  | "engineer_session"
  | "unauthenticated"
  | "expired"
  | "unavailable"
  | "error";

export type UserAccessResult =
  | { kind: "checking" }
  | { kind: "authenticated"; session: UserSession }
  | { kind: "engineer_session" }
  | { kind: "unauthenticated" }
  | { kind: "expired" }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };
