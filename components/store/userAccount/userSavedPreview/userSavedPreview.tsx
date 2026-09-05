import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedPreviewProps = {
  experts: readonly ExpertCardData[];
};

export function UserSavedPreview({ experts }: UserSavedPreviewProps) {
  const items = experts.slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {userAccountCopy.savedExperts}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={userAccountPaths.saved}>{userAccountCopy.viewAll}</Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty
          title={userAccountCopy.emptySaved}
          description={userAccountCopy.emptySavedHint}
          action={
            <Button asChild variant="outline" size="sm">
              <Link href={siteConfig.homeHref}>
                {userAccountCopy.findExpert}
              </Link>
            </Button>
          }
          className="py-8"
        />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((expert) => (
            <li key={expert.id}>
              <Link
                href={expert.href}
                className="flex min-h-14 flex-col gap-1 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="type-body font-medium text-foreground">
                  {expert.name}
                </p>
                <p className="type-caption text-muted-foreground">
                  {[expert.profession, expert.city].filter(Boolean).join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
