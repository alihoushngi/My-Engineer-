import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import {
  engineerLoginNavigation,
  engineerPanelNavigation,
  joinNavigation,
} from "@/config/navigation.config/navigation.config";
import { cn } from "@/lib/utils/cn/cn";

type EngineerHeaderActionsProps = {
  isAuthenticated: boolean;
  className?: string;
};

export function EngineerHeaderActions({
  isAuthenticated,
  className,
}: EngineerHeaderActionsProps) {
  if (isAuthenticated) {
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
      <Button asChild variant="ghost">
        <Link href={engineerLoginNavigation.href}>
          {engineerLoginNavigation.label}
        </Link>
      </Button>
      <Button asChild variant="primary">
        <Link href={joinNavigation.href}>{joinNavigation.label}</Link>
      </Button>
    </div>
  );
}
