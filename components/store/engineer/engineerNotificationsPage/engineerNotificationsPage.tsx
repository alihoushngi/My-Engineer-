import Link from "next/link";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerNotification } from "@/types/store/engineer.types";
import { cn } from "@/lib/utils/cn/cn";

type EngineerNotificationsPageProps = {
  notifications: readonly EngineerNotification[];
};

export function EngineerNotificationsPage({
  notifications,
}: EngineerNotificationsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.notifications}
        description="اعلان‌های فضای کاری. ارسال لحظه‌ای و اعلان پوش فعال نیست."
      />
      {notifications.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyNotifications} />
      ) : (
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
                  <span className="type-caption text-primary">خوانده‌نشده</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
