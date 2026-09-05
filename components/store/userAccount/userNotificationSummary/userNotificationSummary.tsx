import Link from "next/link";
import { NotificationLink } from "@/components/store/notifications/notificationLink/notificationLink";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { unreadCount } from "@/lib/user-account/workspace-selectors/workspace-selectors";
import { type UserNotification } from "@/types/store/user-account.types";

type UserNotificationSummaryProps = {
  notifications: readonly UserNotification[];
};

export function UserNotificationSummary({
  notifications,
}: UserNotificationSummaryProps) {
  const unread = unreadCount(notifications);
  const items = notifications.slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="type-h4 text-foreground">
            {userAccountCopy.notificationSummary}
          </h2>
          {unread > 0 ? (
            <Badge variant="info">
              {formatFaNumber(unread)} {userAccountCopy.unreadLabel}
            </Badge>
          ) : null}
        </div>
        <Button asChild variant="link" size="sm">
          <Link href={userAccountPaths.notifications}>
            {userAccountCopy.viewAll}
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty title={userAccountCopy.emptyNotifications} className="py-8" />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id}>
              <NotificationLink
                id={item.id}
                href={item.href}
                isRead={item.isRead}
                className="px-0"
              >
                <p className="type-body font-medium text-foreground">
                  {item.title}
                </p>
                <p className="line-clamp-2 type-body-sm text-muted-foreground">
                  {item.body}
                </p>
                <p className="type-caption text-muted-foreground">
                  {item.createdAtLabel}
                </p>
              </NotificationLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
