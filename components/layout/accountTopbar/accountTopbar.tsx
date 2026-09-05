"use client";

import Link from "next/link";
import { BellIcon, ChevronDownIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { AccountLogoutItem } from "@/components/layout/accountLogoutItem/accountLogoutItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu/dropdownMenu";
import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type UserShellData } from "@/types/store/user-account.types";

type AccountTopbarProps = {
  shell: UserShellData;
};

export function AccountTopbar({ shell }: AccountTopbarProps) {
  const initials = getDisplayInitials(shell.displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-primary-foreground/10 bg-primary-deep pt-[env(safe-area-inset-top)] text-primary-foreground">
      <div className="flex min-h-14 min-w-0 items-center gap-3 px-4 py-2 lg:px-6">
        <BrandLogo className="min-w-0 text-primary-foreground lg:hidden" />
        <p className="hidden min-w-0 flex-1 truncate type-body-sm text-primary-foreground/80 lg:block">
          {userAccountCopy.workspaceName}
        </p>
        <div className="ms-auto flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:inline-flex"
          >
            <Link href={siteConfig.homeHref}>
              {userAccountCopy.storefrontLabel}
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link
              href={userAccountPaths.notifications}
              aria-label={userAccountPageTitles.notifications}
            >
              <BellIcon aria-hidden="true" />
              {shell.unreadNotificationCount > 0 ? (
                <span className="absolute top-1 end-1 size-2 rounded-full bg-accent">
                  <span className="sr-only">
                    {formatFaNumber(shell.unreadNotificationCount)}{" "}
                    {userAccountCopy.unreadNotifications}
                  </span>
                </span>
              ) : null}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={userAccountCopy.accountMenuLabel}
              className="flex min-h-11 items-center gap-2 rounded-md px-1 text-start outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70"
            >
              <Avatar size="sm">
                {shell.avatarSrc ? (
                  <AvatarImage src={shell.avatarSrc} alt="" />
                ) : null}
                <AvatarFallback className="bg-primary-foreground/15 text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-36 truncate type-caption sm:inline">
                {shell.displayName}
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className="hidden size-4 sm:block"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-52">
              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.dashboard}>
                  {userAccountCopy.dashboardLabel}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.profile}>
                  {userAccountPageTitles.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.settings}>
                  {userAccountCopy.settingsLabel}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AccountLogoutItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
