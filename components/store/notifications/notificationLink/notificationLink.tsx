"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { markNotificationRead } from "@/services/notification-service/notification-service";
import { cn } from "@/lib/utils/cn/cn";

type NotificationLinkProps = {
  id: string;
  href: string;
  isRead: boolean;
  children: ReactNode;
  className?: string;
};

export function NotificationLink({
  id,
  href,
  isRead,
  children,
  className,
}: NotificationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-14 flex-col gap-1 px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !isRead && "bg-primary-subtle/60",
        className,
      )}
      onClick={() => {
        if (!isRead) {
          void markNotificationRead(id);
        }
      }}
    >
      {children}
    </Link>
  );
}
