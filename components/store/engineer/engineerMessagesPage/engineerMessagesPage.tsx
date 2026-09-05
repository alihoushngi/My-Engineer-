import { EngineerConversationRow } from "@/components/store/engineer/engineerConversationRow/engineerConversationRow";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerConversation } from "@/types/store/engineer.types";

type EngineerMessagesPageProps = {
  conversations: readonly EngineerConversation[];
};

export function EngineerMessagesPage({
  conversations,
}: EngineerMessagesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.messages}
        description="گفت‌وگوهای مرتبط با درخواست‌ها. ارسال لحظه‌ای و پیوست در این نسخه وجود ندارد."
      />
      {conversations.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyMessages} />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <EngineerConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
