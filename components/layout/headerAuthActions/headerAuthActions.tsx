import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  engineerLoginNavigation,
  engineerPanelNavigation,
} from "@/config/navigation.config/navigation.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { cn } from "@/lib/utils/cn/cn";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type HeaderAuthActionsProps = {
  chrome: StoreAuthChrome;
  className?: string;
};

export function HeaderAuthActions({
  chrome,
  className,
}: HeaderAuthActionsProps) {
  if (chrome.status === "user") {
    return (
      <Button
        asChild
        variant="secondary"
        className={cn("hidden lg:inline-flex", className)}
      >
        <Link href={userAuthPaths.account} className="gap-2">
          <Avatar size="sm" className="size-7">
            <AvatarFallback className="bg-primary text-primary-foreground type-caption">
              {getDisplayInitials(chrome.displayName)}
            </AvatarFallback>
          </Avatar>
          {userAuthCopy.accountCta}
        </Link>
      </Button>
    );
  }

  if (chrome.status === "engineer") {
    return (
      <Button
        asChild
        variant="secondary"
        className={cn("hidden lg:inline-flex", className)}
      >
        <Link href={engineerPanelNavigation.href}>
          {engineerPanelNavigation.label}
        </Link>
      </Button>
    );
  }

  return (
    <div className={cn("hidden items-center gap-2 lg:flex", className)}>
      <Button
        asChild
        variant="ghost"
        className="text-primary-deep-foreground hover:bg-primary-foreground/10 hover:text-primary-deep-foreground"
      >
        <Link href={engineerLoginNavigation.href}>
          {engineerLoginNavigation.label}
        </Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href={userAuthPaths.login}>{userAuthCopy.loginCta}</Link>
      </Button>
    </div>
  );
}
