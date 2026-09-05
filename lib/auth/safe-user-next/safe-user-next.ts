import {
  isUserAuthEntryPath,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import {
  getSafeInternalNext,
  isEngineerFamilyPath,
} from "@/lib/auth/is-safe-internal-path/is-safe-internal-path";

/**
 * Only internal customer destinations are allowed as post-auth return paths.
 * Engineer panel URLs and external addresses fall back to /account.
 */
export function getSafeUserNext(next: string | null | undefined): string {
  return getSafeInternalNext(next, userAuthPaths.account, (pathname) => {
    return isEngineerFamilyPath(pathname) || isUserAuthEntryPath(pathname);
  });
}

export function userLoginHref(next?: string | null): string {
  const safe = getSafeUserNext(next);

  if (safe === userAuthPaths.account) {
    return userAuthPaths.login;
  }

  return `${userAuthPaths.login}?next=${encodeURIComponent(safe)}`;
}

export function userRegisterHref(next?: string | null): string {
  const safe = getSafeUserNext(next);

  if (safe === userAuthPaths.account) {
    return userAuthPaths.register;
  }

  return `${userAuthPaths.register}?next=${encodeURIComponent(safe)}`;
}
