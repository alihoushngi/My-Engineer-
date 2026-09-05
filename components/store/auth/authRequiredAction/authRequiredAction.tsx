"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button/button";
import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";

type AuthRequiredActionProps = {
  isAuthenticated: boolean;
  nextPath: string;
  label: string;
  variant?: "outline" | "ghost" | "primary";
  icon?: ReactNode;
  className?: string;
  onAuthenticatedClick: () => void;
};

export function AuthRequiredAction({
  isAuthenticated,
  nextPath,
  label,
  variant = "outline",
  icon,
  className,
  onAuthenticatedClick,
}: AuthRequiredActionProps) {
  const loginHref = userLoginHref(nextPath);

  if (!isAuthenticated) {
    return (
      <Button asChild variant={variant} className={className}>
        <Link href={loginHref}>
          {icon}
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={onAuthenticatedClick}
    >
      {icon}
      {label}
    </Button>
  );
}
