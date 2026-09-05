"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EngineerNavIcon } from "@/components/layout/engineerNavIcon/engineerNavIcon";
import {
  isEngineerNavActive,
  type EngineerNavItem,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { cn } from "@/lib/utils/cn/cn";

type EngineerNavLinkProps = {
  item: EngineerNavItem;
  onNavigate?: () => void;
};

export function EngineerNavLink({ item, onNavigate }: EngineerNavLinkProps) {
  const pathname = usePathname();
  const isActive = isEngineerNavActive(pathname, item.href);

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
      <EngineerNavIcon name={item.icon} />
      <span className="min-w-0">{item.label}</span>
    </Link>
  );
}
