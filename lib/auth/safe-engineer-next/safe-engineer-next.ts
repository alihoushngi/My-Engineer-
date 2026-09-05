import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";

const ENGINEER_LOGIN_PATH = "/engineer/login";

/**
 * Only internal Engineer Panel routes are allowed as post-auth destinations.
 */
export function getSafeEngineerNext(next: string | null | undefined): string {
  if (next == null || next.trim() === "") {
    return engineerPanelPaths.dashboard;
  }

  const value = next.trim();

  if (!value.startsWith("/engineer")) {
    return engineerPanelPaths.dashboard;
  }

  if (
    value === ENGINEER_LOGIN_PATH ||
    value.startsWith(`${ENGINEER_LOGIN_PATH}/`)
  ) {
    return engineerPanelPaths.dashboard;
  }

  if (value.startsWith("//") || value.includes("://") || value.includes("\\")) {
    return engineerPanelPaths.dashboard;
  }

  if (value.includes("?")) {
    return engineerPanelPaths.dashboard;
  }

  return value;
}

export function engineerLoginHref(next?: string | null): string {
  const safe = getSafeEngineerNext(next);

  if (safe === engineerPanelPaths.dashboard) {
    return ENGINEER_LOGIN_PATH;
  }

  return `${ENGINEER_LOGIN_PATH}?next=${encodeURIComponent(safe)}`;
}
