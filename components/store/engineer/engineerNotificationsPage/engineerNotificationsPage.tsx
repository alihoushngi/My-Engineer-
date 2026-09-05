import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { NotificationLink } from "@/components/store/notifications/notificationLink/notificationLink";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type EngineerNotification } from "@/types/store/engineer.types";

type EngineerNotificationsPageProps = {
  notifications: readonly EngineerNotification[];
  pagination: PaginatedItems<EngineerNotification>;
  pathname: string;
};

export function EngineerNotificationsPage({
  notifications,
  pagination,
  pathname,
}: EngineerNotificationsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.notifications}
        description="اعلان‌های فضای کاری. ارسال لحظه‌ای و اعلان پوش فعال نیست."
      />
      {pagination.total === 0 ? (
        <Empty title={engineerPanelCopy.emptyNotifications} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {notifications.map((item) => (
              <li key={item.id}>
                <NotificationLink
                  id={item.id}
                  href={item.href}
                  isRead={item.isRead}
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
                      خوانده‌نشده
                    </span>
                  ) : null}
                </NotificationLink>
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
