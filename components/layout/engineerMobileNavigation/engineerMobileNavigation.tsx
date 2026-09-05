"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { EngineerNavIcon } from "@/components/layout/engineerNavIcon/engineerNavIcon";
import { EngineerNavLink } from "@/components/layout/engineerNavLink/engineerNavLink";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import {
  engineerPanelCopy,
  engineerPrimaryNav,
  engineerSecondaryNav,
  isEngineerNavActive,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { cn } from "@/lib/utils/cn/cn";

export function EngineerMobileNavigation() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = engineerSecondaryNav.some((item) =>
    isEngineerNavActive(pathname, item.href),
  );

  return (
    <nav
      aria-label="ناوبری اصلی فضای کاری"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {engineerPrimaryNav.map((item) => {
          const isActive = isEngineerNavActive(pathname, item.href);

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 type-caption outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <EngineerNavIcon name={item.icon} />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-expanded={moreOpen}
            aria-controls="engineer-more-menu"
            onClick={() => setMoreOpen(true)}
            className={cn(
              "flex min-h-14 w-full flex-col items-center justify-center gap-1 px-1 type-caption outline-none focus-visible:ring-2 focus-visible:ring-ring",
              moreActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <MenuIcon aria-hidden="true" className="size-4" />
            <span>{engineerPanelCopy.moreLabel}</span>
          </button>
        </li>
      </ul>
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          id="engineer-more-menu"
          side="bottom"
          className="max-h-[80dvh] rounded-t-xl pb-[env(safe-area-inset-bottom)]"
        >
          <SheetHeader>
            <SheetTitle>{engineerPanelCopy.moreTitle}</SheetTitle>
            <SheetDescription className="sr-only">
              بخش‌های دیگر فضای کاری متخصص
            </SheetDescription>
          </SheetHeader>
          <nav className="px-4 pb-6">
            <ul className="flex flex-col gap-1">
              {engineerSecondaryNav.map((item) => (
                <li key={item.id}>
                  <EngineerNavLink
                    item={item}
                    onNavigate={() => setMoreOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
