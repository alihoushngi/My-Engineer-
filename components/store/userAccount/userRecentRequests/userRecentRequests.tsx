import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { UserRequestRow } from "@/components/store/userAccount/userRequestRow/userRequestRow";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type UserRequest } from "@/types/store/user-account.types";

type UserRecentRequestsProps = {
  requests: readonly UserRequest[];
};

export function UserRecentRequests({ requests }: UserRecentRequestsProps) {
  const items = requests.slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {userAccountCopy.recentRequests}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={userAccountPaths.requests}>
            {userAccountCopy.viewAll}
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty
          title={userAccountCopy.emptyRequests}
          description={userAccountCopy.emptyRequestsHint}
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
          {items.map((request) => (
            <li key={request.id}>
              <UserRequestRow request={request} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
