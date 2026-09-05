"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu/dropdownMenu";
import {
  isActivePath,
  isServicesPath,
  primaryNavigation,
  servicesNavigation,
} from "@/config/navigation.config/navigation.config";
import { cn } from "@/lib/utils/cn/cn";

function navLinkClassName(isActive: boolean) {
  return cn(
    "inline-flex min-h-11 items-center rounded-md px-3 type-body-sm outline-none",
    "text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isActive &&
      "bg-primary-foreground/10 font-semibold text-primary-foreground",
  );
}

export function HeaderNavigation() {
  const pathname = usePathname();
  const servicesActive = isServicesPath(pathname);
  const homeLink = primaryNavigation[0];
  const restLinks = primaryNavigation.slice(1);

  return (
    <nav aria-label="ناوبری اصلی" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {homeLink ? (
          <li>
            <Link
              href={homeLink.href}
              className={navLinkClassName(
                isActivePath(pathname, homeLink.href),
              )}
              aria-current={
                isActivePath(pathname, homeLink.href) ? "page" : undefined
              }
            >
              {homeLink.label}
            </Link>
          </li>
        ) : null}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "px-3 type-body-sm text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  servicesActive &&
                    "bg-primary-foreground/10 font-semibold text-primary-foreground",
                )}
                aria-current={servicesActive ? "true" : undefined}
              >
                {servicesNavigation.label}
                <ChevronDownIcon aria-hidden="true" className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-52">
              {servicesNavigation.items.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(isActive && "font-medium text-foreground")}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        {restLinks.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={navLinkClassName(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
