import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerConversation } from "@/types/store/engineer.types";
import { EngineerConversationRow } from "@/components/store/engineer/engineerConversationRow/engineerConversationRow";

type EngineerRecentMessagesProps = {
  conversations: readonly EngineerConversation[];
};

export function EngineerRecentMessages({
  conversations,
}: EngineerRecentMessagesProps) {
  const unread = conversations.filter((item) => item.unreadCount > 0);
  const items = (unread.length > 0 ? unread : conversations).slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {engineerPanelCopy.unreadMessages}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.messages}>
            {engineerPanelCopy.viewAll}
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyMessages} className="py-8" />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((conversation) => (
            <li key={conversation.id}>
              <EngineerConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
