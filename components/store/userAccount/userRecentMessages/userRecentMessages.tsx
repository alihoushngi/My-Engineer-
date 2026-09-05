import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { UserConversationRow } from "@/components/store/userAccount/userConversationRow/userConversationRow";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { type UserConversation } from "@/types/store/user-account.types";

type UserRecentMessagesProps = {
  conversations: readonly UserConversation[];
};

export function UserRecentMessages({ conversations }: UserRecentMessagesProps) {
  const unread = conversations.filter((item) => item.unreadCount > 0);
  const items = (unread.length > 0 ? unread : conversations).slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {userAccountCopy.recentMessages}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={userAccountPaths.messages}>
            {userAccountCopy.viewAll}
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty title={userAccountCopy.emptyMessages} className="py-8" />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((conversation) => (
            <li key={conversation.id}>
              <UserConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
