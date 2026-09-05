/** Development-only mock session cookies. Opaque values only. */
export const MOCK_ENGINEER_SESSION_COOKIE = "mm_mock_engineer_session";
export const MOCK_ENGINEER_PROFILE_COOKIE = "mm_mock_engineer_profile";
export const MOCK_ENGINEER_SESSION_VALUE = "active";

export const MOCK_USER_SESSION_COOKIE = "mm_mock_user_session";
export const MOCK_USER_PROFILE_COOKIE = "mm_mock_user_profile";
export const MOCK_USER_SESSION_VALUE = "active";

export const MOCK_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};
