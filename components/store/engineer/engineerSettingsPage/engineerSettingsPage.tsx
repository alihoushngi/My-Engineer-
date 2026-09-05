import { EngineerLogoutButton } from "@/components/store/engineer/engineerLogoutButton/engineerLogoutButton";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { InfoIcon } from "lucide-react";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerSettingsPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerSettingsPage({ workspace }: EngineerSettingsPageProps) {
  const { account } = workspace;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.settings}
        description="تنظیمات حساب متخصص. گزینه‌هایی که محصول پشتیبانی نمی‌کند نمایش داده نمی‌شوند."
      />
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-4 type-h4">اطلاعات حساب</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="type-caption text-muted-foreground">نام نمایشی</dt>
            <dd className="type-body">{account.displayName}</dd>
          </div>
          {account.mobileDisplay ? (
            <div>
              <dt className="type-caption text-muted-foreground">موبایل</dt>
              <dd className="type-body ltr-data" dir="ltr">
                {account.mobileDisplay}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>ورود با رمز یک‌بارمصرف</AlertTitle>
        <AlertDescription>{engineerPanelCopy.otpAuthNote}</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>ترجیحات اعلان</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.notificationPrefsUnavailable}
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>حذف حساب</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.accountDeletionUnavailable}
        </AlertDescription>
      </Alert>
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-4 type-h4">{engineerPanelCopy.logoutLabel}</h2>
        <EngineerLogoutButton />
      </section>
    </div>
  );
}
