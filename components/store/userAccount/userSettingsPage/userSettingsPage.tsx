import { InfoIcon } from "lucide-react";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserLogoutButton } from "@/components/store/userAccount/userLogoutButton/userLogoutButton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { type UserAccount } from "@/types/store/user-account.types";

type UserSettingsPageProps = {
  account: UserAccount;
};

export function UserSettingsPage({ account }: UserSettingsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.settings}
        description={userAccountCopy.settingsDescription}
      />
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-4 type-h4">{userAccountPageTitles.profile}</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="type-caption text-muted-foreground">
              {userAccountCopy.displayNameLabel}
            </dt>
            <dd className="type-body">{account.displayName}</dd>
          </div>
          {account.mobileDisplay ? (
            <div>
              <dt className="type-caption text-muted-foreground">
                {userAccountCopy.mobileLabel}
              </dt>
              <dd className="type-body ltr-data" dir="ltr">
                {account.mobileDisplay}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>{userAccountPageTitles.notifications}</AlertTitle>
        <AlertDescription>
          {userAccountCopy.notificationPrefsUnavailable}
        </AlertDescription>
      </Alert>
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-4 type-h4">{userAccountCopy.logoutLabel}</h2>
        <UserLogoutButton />
      </section>
    </div>
  );
}
