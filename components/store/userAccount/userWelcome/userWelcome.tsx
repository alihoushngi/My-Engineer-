import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { type UserWorkspace } from "@/types/store/user-account.types";

type UserWelcomeProps = {
  workspace: UserWorkspace;
};

export function UserWelcome({ workspace }: UserWelcomeProps) {
  const { account } = workspace;
  const initials = getDisplayInitials(account.displayName);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          {account.avatarSrc ? (
            <AvatarImage src={account.avatarSrc} alt="" />
          ) : null}
          <AvatarFallback className="bg-primary-subtle text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1">
          <p className="type-caption text-muted-foreground">
            {userAccountCopy.welcomeGreeting}
          </p>
          <h2 className="type-h3 text-foreground">{account.displayName}</h2>
          {account.city ? (
            <p className="type-body-sm text-muted-foreground">{account.city}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
