import Link from "next/link";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserSavedList } from "@/components/store/userAccount/userSavedList/userSavedList";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type UserConversation } from "@/types/store/user-account.types";

type UserSavedPageProps = {
  experts: readonly ExpertCardData[];
  conversations: readonly UserConversation[];
};

export function UserSavedPage({ experts, conversations }: UserSavedPageProps) {
  const conversationIdByExpertId = Object.fromEntries(
    conversations.flatMap((conversation) =>
      conversation.expertId
        ? [[conversation.expertId, conversation.id] as const]
        : [],
    ),
  );

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
        <UserSavedList
          experts={experts}
          conversationIdByExpertId={conversationIdByExpertId}
        />
      )}
    </div>
  );
}
