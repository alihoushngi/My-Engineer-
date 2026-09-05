import { type NextRequest, NextResponse } from "next/server";
import {
  isMockAuthEnabled,
  isMockUserAuthEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import {
  engineerPanelPaths,
  isEngineerPanelPath,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  isAccountPath,
  isUserAuthEntryPath,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import {
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_ENGINEER_SESSION_VALUE,
  MOCK_USER_SESSION_COOKIE,
  MOCK_USER_SESSION_VALUE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasEngineerSession =
    request.cookies.get(MOCK_ENGINEER_SESSION_COOKIE)?.value ===
    MOCK_ENGINEER_SESSION_VALUE;
  const hasUserSession =
    request.cookies.get(MOCK_USER_SESSION_COOKIE)?.value ===
    MOCK_USER_SESSION_VALUE;

  if (isMockAuthEnabled()) {
    if (isEngineerPanelPath(pathname) && !hasEngineerSession) {
      const url = request.nextUrl.clone();
      url.pathname = engineerPanelPaths.login;
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }

    if (hasEngineerSession && pathname === engineerPanelPaths.login) {
      const next = getSafeEngineerNext(
        request.nextUrl.searchParams.get("next"),
      );
      const url = request.nextUrl.clone();
      url.pathname = next;
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (
      hasEngineerSession &&
      pathname.startsWith("/expert-registration") &&
      pathname !== registrationPaths.complete
    ) {
      const url = request.nextUrl.clone();
      url.pathname = engineerPanelPaths.dashboard;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  if (isMockUserAuthEnabled()) {
    if (isAccountPath(pathname) && !hasUserSession && !hasEngineerSession) {
      const url = request.nextUrl.clone();
      url.pathname = userAuthPaths.login;
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }

    if (hasUserSession && isUserAuthEntryPath(pathname)) {
      const next = getSafeUserNext(request.nextUrl.searchParams.get("next"));
      const url = request.nextUrl.clone();
      url.pathname = next;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/engineer",
    "/engineer/:path*",
    "/expert-registration",
    "/expert-registration/:path*",
    "/login",
    "/register",
    "/account",
    "/account/:path*",
  ],
};
