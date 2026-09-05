"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountNavIcon } from "@/components/layout/accountNavIcon/accountNavIcon";
import {
  isUserAccountNavActive,
  type UserAccountNavItem,
} from "@/config/user-account.config/user-account.config";
import { cn } from "@/lib/utils/cn/cn";

type AccountNavLinkProps = {
  item: UserAccountNavItem;
  onNavigate?: () => void;
};

export function AccountNavLink({ item, onNavigate }: AccountNavLinkProps) {
  const pathname = usePathname();
  const isActive = isUserAccountNavActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-md px-3 type-body-sm font-medium outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-primary-subtle text-primary"
          : "text-foreground hover:bg-surface-subtle",
      )}
    >
      <AccountNavIcon name={item.icon} />
      <span className="min-w-0">{item.label}</span>
    </Link>
  );
}
