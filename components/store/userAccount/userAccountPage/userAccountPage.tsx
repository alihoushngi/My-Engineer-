import { UserLogoutButton } from "@/components/store/userAccount/userLogoutButton/userLogoutButton";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { type UserSession } from "@/types/store/user-auth.types";

type UserAccountPageProps = {
  session: UserSession;
};

const upcomingItems = [
  userAuthCopy.upcomingConversations,
  userAuthCopy.upcomingRequests,
  userAuthCopy.upcomingSaved,
  userAuthCopy.upcomingReviews,
  userAuthCopy.upcomingNotifications,
] as const;

export function UserAccountPage({ session }: UserAccountPageProps) {
  const displayName = session.profile?.displayName ?? userAuthCopy.accountCta;

  return (
    <div className="container-narrow space-y-8 py-page">
      <header className="space-y-2">
        <p className="type-caption text-muted-foreground">
          {userAuthCopy.accountGreeting}
        </p>
        <h1 className="type-h1 text-foreground">{displayName}</h1>
        {session.profile?.phoneMasked ? (
          <p className="type-body text-muted-foreground" dir="ltr">
            {session.profile.phoneMasked}
          </p>
        ) : null}
      </header>
      <section className="space-y-3 rounded-xl border border-border bg-surface p-5">
        <h2 className="type-h3 text-foreground">
          {userAuthCopy.upcomingTitle}
        </h2>
        <p className="type-body-sm text-muted-foreground">
          {userAuthCopy.upcomingHint}
        </p>
        <ul className="list-disc space-y-2 ps-5 type-body text-foreground">
          {upcomingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <UserLogoutButton />
    </div>
  );
}
