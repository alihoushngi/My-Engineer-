import { Pagination } from "@/components/common/pagination/pagination";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserConversationRow } from "@/components/store/userAccount/userConversationRow/userConversationRow";
import { Empty } from "@/components/ui/empty/empty";
import { messagingCopy } from "@/config/messaging.config/messaging.config";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type UserConversation } from "@/types/store/user-account.types";

type UserMessagesPageProps = {
  conversations: readonly UserConversation[];
  pagination: PaginatedItems<UserConversation>;
  pathname: string;
};

export function UserMessagesPage({
  conversations,
  pagination,
  pathname,
}: UserMessagesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.messages}
        description={userAccountCopy.messagesDescription}
      />
      <p className="type-caption text-muted-foreground">
        {messagingCopy.noRealtimeNote}
      </p>
      {pagination.total === 0 ? (
        <Empty title={userAccountCopy.emptyMessages} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <UserConversationRow conversation={conversation} />
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
