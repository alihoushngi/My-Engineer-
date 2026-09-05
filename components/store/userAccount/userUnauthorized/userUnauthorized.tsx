import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/spinner/spinner";
import { siteConfig } from "@/config/site.config/site.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";
import { type UserAccessResult } from "@/types/store/user-auth.types";

type UserUnauthorizedProps = {
  access: Exclude<UserAccessResult, { kind: "authenticated" }>;
  nextPath?: string;
};

export function UserUnauthorized({ access, nextPath }: UserUnauthorizedProps) {
  if (access.kind === "checking") {
    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-section"
        aria-busy="true"
        aria-live="polite"
      >
        <Spinner className="size-8" />
        <div className="space-y-1 text-center">
          <p className="type-h3 text-foreground">
            {userAuthCopy.checkingTitle}
          </p>
          <p className="type-body text-muted-foreground">
            {userAuthCopy.checkingDescription}
          </p>
        </div>
      </div>
    );
  }

  const copy =
    access.kind === "engineer_session"
      ? {
          title: userAuthCopy.engineerSessionTitle,
          description: userAuthCopy.engineerSessionDescription,
        }
      : access.kind === "expired"
        ? {
            title: userAuthCopy.expiredTitle,
            description: userAuthCopy.expiredDescription,
          }
        : access.kind === "error"
          ? {
              title: userAuthCopy.errorTitle,
              description: access.message || userAuthCopy.errorDescription,
            }
          : access.kind === "unavailable"
            ? {
                title: userAuthCopy.unavailableTitle,
                description: userAuthCopy.unavailableDescription,
              }
            : {
                title: userAuthCopy.unauthenticatedTitle,
                description: userAuthCopy.unauthenticatedDescription,
              };

  return (
    <div className="container-narrow flex min-h-[50vh] flex-col justify-center gap-6 py-section">
      <Alert variant="danger">
        <CircleAlertIcon />
        <AlertTitle>{copy.title}</AlertTitle>
        <AlertDescription>{copy.description}</AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-3">
        {access.kind === "engineer_session" ? (
          <Button asChild>
            <Link href={siteConfig.engineerPanelHref}>
              {userAuthCopy.engineerPanelCta}
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={userLoginHref(nextPath ?? userAuthPaths.account)}>
              {userAuthCopy.loginCta}
            </Link>
          </Button>
        )}
        <Button asChild variant="ghost">
          <Link href={siteConfig.homeHref}>{userAuthCopy.homeCta}</Link>
        </Button>
      </div>
    </div>
  );
}
