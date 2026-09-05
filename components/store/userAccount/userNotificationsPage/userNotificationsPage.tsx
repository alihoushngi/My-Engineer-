import Link from "next/link";
import { Pagination } from "@/components/common/pagination/pagination";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Empty } from "@/components/ui/empty/empty";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type UserNotification } from "@/types/store/user-account.types";
import { cn } from "@/lib/utils/cn/cn";

type UserNotificationsPageProps = {
  notifications: readonly UserNotification[];
  pagination: PaginatedItems<UserNotification>;
  pathname: string;
};

export function UserNotificationsPage({
  notifications,
  pagination,
  pathname,
}: UserNotificationsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.notifications}
        description={userAccountCopy.notificationsDescription}
      />
      {pagination.total === 0 ? (
        <Empty title={userAccountCopy.emptyNotifications} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {notifications.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-14 flex-col gap-1 px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !item.isRead && "bg-primary-subtle/60",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="type-body font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="type-caption text-muted-foreground">
                      {item.createdAtLabel}
                    </p>
                  </div>
                  <p className="type-body-sm text-muted-foreground">
                    {item.body}
                  </p>
                  {!item.isRead ? (
                    <span className="type-caption text-primary">
                      {userAccountCopy.unreadLabel}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
