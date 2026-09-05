export type AccountRole = "user" | "engineer";

export type StoreAuthChrome =
  | { status: "guest" }
  | { status: "user"; displayName: string }
  | { status: "engineer" };
