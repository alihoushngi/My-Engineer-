export type AccountRole = "user" | "engineer";

export type StoreAuthChrome =
  | { status: "guest" }
  | { status: "user"; displayName: string; unreadNotificationCount: number }
  | { status: "engineer" };
