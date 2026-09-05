import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { InfoIcon } from "lucide-react";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { type UserAccount } from "@/types/store/user-account.types";

type UserProfilePageProps = {
  account: UserAccount;
};

export function UserProfilePage({ account }: UserProfilePageProps) {
  const initials = getDisplayInitials(account.displayName);

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.profile}
        description={userAccountCopy.profileDescription}
      />
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <div className="mb-6 flex items-center gap-4">
          <Avatar className="size-16">
            {account.avatarSrc ? (
              <AvatarImage src={account.avatarSrc} alt="" />
            ) : null}
            <AvatarFallback className="bg-primary-subtle text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="type-h3 text-foreground">{account.displayName}</h2>
            <p className="type-body-sm text-muted-foreground">
              {userAccountCopy.profilePrivateNote}
            </p>
          </div>
        </div>
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
          {account.city ? (
            <div>
              <dt className="type-caption text-muted-foreground">
                {userAccountCopy.cityLabel}
              </dt>
              <dd className="type-body">{account.city}</dd>
            </div>
          ) : null}
        </dl>
      </section>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>{userAccountPageTitles.profile}</AlertTitle>
        <AlertDescription>
          {userAccountCopy.profileEditUnavailable}
        </AlertDescription>
      </Alert>
    </div>
  );
}
