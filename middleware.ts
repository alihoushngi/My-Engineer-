import { type NextRequest, NextResponse } from "next/server";
import { isMockAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import {
  engineerPanelPaths,
  isEngineerPanelPath,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_ENGINEER_SESSION_VALUE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";

export function middleware(request: NextRequest) {
  if (!isMockAuthEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const hasSession =
    request.cookies.get(MOCK_ENGINEER_SESSION_COOKIE)?.value ===
    MOCK_ENGINEER_SESSION_VALUE;

  if (isEngineerPanelPath(pathname) && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.login;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (hasSession && pathname === engineerPanelPaths.login) {
    const next = getSafeEngineerNext(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (
    hasSession &&
    pathname.startsWith("/expert-registration") &&
    pathname !== registrationPaths.complete
  ) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.dashboard;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/engineer",
    "/engineer/:path*",
    "/expert-registration",
    "/expert-registration/:path*",
  ],
};
