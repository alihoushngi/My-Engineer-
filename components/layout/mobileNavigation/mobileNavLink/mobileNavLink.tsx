"use client";

import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet/sheet";
import { cn } from "@/lib/utils/cn/cn";

type MobileNavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export function MobileNavLink({ href, label, isActive }: MobileNavLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-h-11 items-center rounded-md px-3 type-body",
          "text-foreground transition-colors hover:bg-primary-subtle",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          isActive && "bg-primary-subtle font-medium text-primary",
        )}
      >
        {label}
      </Link>
    </SheetClose>
  );
}
