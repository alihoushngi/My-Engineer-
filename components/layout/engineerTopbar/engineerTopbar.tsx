"use client";

import Link from "next/link";
import { BellIcon, ChevronDownIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { EngineerLogoutItem } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
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
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type EngineerShellData } from "@/types/store/engineer.types";

type EngineerTopbarProps = {
  shell: EngineerShellData;
};

export function EngineerTopbar({ shell }: EngineerTopbarProps) {
  const initials = shell.displayName.slice(0, 1);

  return (
    <header className="sticky top-0 z-30 border-b border-primary-foreground/10 bg-primary-deep pt-[env(safe-area-inset-top)] text-primary-foreground">
      <div className="flex min-h-14 min-w-0 items-center gap-3 px-4 py-2 lg:px-6">
        <BrandLogo className="min-w-0 text-primary-foreground lg:hidden" />
        <p className="hidden min-w-0 flex-1 truncate type-body-sm text-primary-foreground/80 lg:block">
          {engineerPanelCopy.workspaceName}
        </p>
        <div className="ms-auto flex items-center gap-1">
          {shell.publicProfileHref ? (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:inline-flex"
            >
              <Link href={shell.publicProfileHref}>
                {engineerPanelCopy.publicProfileLabel}
              </Link>
            </Button>
          ) : null}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href={engineerPanelPaths.notifications} aria-label="اعلان‌ها">
              <BellIcon aria-hidden="true" />
              {shell.unreadNotificationCount > 0 ? (
                <span className="absolute top-1 end-1 size-2 rounded-full bg-accent">
                  <span className="sr-only">
                    {formatFaNumber(shell.unreadNotificationCount)} اعلان
                    خوانده‌نشده
                  </span>
                </span>
              ) : null}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={engineerPanelCopy.accountMenuLabel}
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
                <Link href={engineerPanelPaths.dashboard}>
                  {engineerPanelCopy.dashboardLabel}
                </Link>
              </DropdownMenuItem>
              {shell.publicProfileHref ? (
                <DropdownMenuItem asChild>
                  <Link href={shell.publicProfileHref}>
                    {engineerPanelCopy.publicProfileLabel}
                  </Link>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem asChild>
                <Link href={engineerPanelPaths.settings}>
                  {engineerPanelCopy.settingsLabel}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <EngineerLogoutItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
