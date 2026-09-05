"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { AccountNavIcon } from "@/components/layout/accountNavIcon/accountNavIcon";
import { AccountNavLink } from "@/components/layout/accountNavLink/accountNavLink";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer/drawer";
import {
  isUserAccountNavActive,
  userAccountCopy,
  userAccountPrimaryNav,
  userAccountSecondaryNav,
} from "@/config/user-account.config/user-account.config";
import { cn } from "@/lib/utils/cn/cn";

export function AccountMobileNavigation() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = userAccountSecondaryNav.some((item) =>
    isUserAccountNavActive(pathname, item.href),
  );

  return (
    <nav
      aria-label="ناوبری اصلی حساب کاربری"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {userAccountPrimaryNav.map((item) => {
          const isActive = isUserAccountNavActive(pathname, item.href);

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
                <AccountNavIcon name={item.icon} />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-expanded={moreOpen}
            aria-controls="account-more-menu"
            onClick={() => setMoreOpen(true)}
            className={cn(
              "flex min-h-14 w-full flex-col items-center justify-center gap-1 px-1 type-caption outline-none focus-visible:ring-2 focus-visible:ring-ring",
              moreActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <MenuIcon aria-hidden="true" className="size-4" />
            <span>{userAccountCopy.moreLabel}</span>
          </button>
        </li>
      </ul>
      <Drawer open={moreOpen} onOpenChange={setMoreOpen} handleOnly>
        <DrawerContent id="account-more-menu">
          <DrawerHeader>
            <DrawerTitle>{userAccountCopy.moreTitle}</DrawerTitle>
            <DrawerDescription className="sr-only">
              بخش‌های دیگر حساب کاربری
            </DrawerDescription>
          </DrawerHeader>
          <nav className="overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <ul className="flex flex-col gap-1">
              {userAccountSecondaryNav.map((item) => (
                <li key={item.id}>
                  <AccountNavLink
                    item={item}
                    onNavigate={() => setMoreOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
