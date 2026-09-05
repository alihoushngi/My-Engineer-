import Link from "next/link";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedPageProps = {
  experts: readonly ExpertCardData[];
};

export function UserSavedPage({ experts }: UserSavedPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.saved}
        description={userAccountCopy.savedDescription}
      />
      {experts.length === 0 ? (
        <Empty
          title={userAccountCopy.emptySaved}
          description={userAccountCopy.emptySavedHint}
          action={
            <Button asChild>
              <Link href={siteConfig.homeHref}>
                {userAccountCopy.findExpert}
              </Link>
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {experts.map((expert) => (
            <li key={expert.id}>
              <ExpertCard expert={expert} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
