"use client";

import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { Separator } from "@/components/ui/separator/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { MobileNavLink } from "@/components/layout/mobileNavigation/mobileNavLink/mobileNavLink";
import { type MobileNavigationProps } from "@/components/layout/mobileNavigation/type/mobileNavigation.types";
import {
  engineerLoginNavigation,
  engineerPanelNavigation,
  isActivePath,
  isServicesPath,
  mobileUtilityNavigation,
  primaryNavigation,
  servicesNavigation,
} from "@/config/navigation.config/navigation.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";

export function MobileNavigation({
  open,
  onOpenChange,
  authChrome,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const homeLink = primaryNavigation[0];
  const restLinks = primaryNavigation.slice(1);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-navigation"
        side="start"
        className="w-full gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border pe-14">
          <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
          <SheetDescription className="sr-only">
            پیوندهای فروشگاه مهندس من
          </SheetDescription>
          <BrandLogo />
        </SheetHeader>
        <nav
          aria-label="ناوبری موبایل"
          className="flex flex-1 flex-col overflow-y-auto px-4 py-5"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a"))
              onOpenChange(false);
          }}
        >
          <ul className="flex flex-col gap-1">
            {homeLink ? (
              <li>
                <MobileNavLink
                  href={homeLink.href}
                  label={homeLink.label}
                  isActive={isActivePath(pathname, homeLink.href)}
                />
              </li>
            ) : null}
            <li>
              <Accordion
                key={pathname}
                type="single"
                collapsible
                defaultValue={isServicesPath(pathname) ? "services" : undefined}
              >
                <AccordionItem value="services" className="border-b-0">
                  <AccordionTrigger className="px-3 type-body">
                    {servicesNavigation.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <ul className="flex flex-col gap-1 ps-3">
                      {servicesNavigation.items.map((item) => (
                        <li key={item.href}>
                          <MobileNavLink
                            href={item.href}
                            label={item.label}
                            isActive={isActivePath(pathname, item.href)}
                          />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            {restLinks.map((item) => (
              <li key={item.href}>
                <MobileNavLink
                  href={item.href}
                  label={item.label}
                  isActive={isActivePath(pathname, item.href)}
                />
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <ul className="flex flex-col gap-1">
            {mobileUtilityNavigation.map((item) => (
              <li key={item.href}>
                <MobileNavLink
                  href={item.href}
                  label={item.label}
                  isActive={isActivePath(pathname, item.href)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <MobileAuthActions chrome={authChrome} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileAuthActions({
  chrome,
}: {
  chrome: MobileNavigationProps["authChrome"];
}) {
  if (chrome.status === "user") {
    return (
      <Button asChild className="w-full">
        <Link href={userAuthPaths.account}>{userAuthCopy.accountCta}</Link>
      </Button>
    );
  }

  if (chrome.status === "engineer") {
    return (
      <Button asChild className="w-full">
        <Link href={engineerPanelNavigation.href}>
          {engineerPanelNavigation.label}
        </Link>
      </Button>
    );
  }

  return (
    <>
      <Button asChild className="w-full">
        <Link href={userAuthPaths.login}>{userAuthCopy.loginCta}</Link>
      </Button>
      <Button asChild variant="ghost" className="w-full">
        <Link href={engineerLoginNavigation.href}>
          {engineerLoginNavigation.label}
        </Link>
      </Button>
      <JoinLink variant="outline" className="w-full" />
    </>
  );
}
