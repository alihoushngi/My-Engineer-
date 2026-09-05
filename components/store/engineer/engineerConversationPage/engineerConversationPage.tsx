import Link from "next/link";
import { EngineerConversationRow } from "@/components/store/engineer/engineerConversationRow/engineerConversationRow";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { MessagingConversationPane } from "@/components/store/messaging/messagingConversationPane/messagingConversationPane";
import { MessagingSplitLayout } from "@/components/store/messaging/messagingSplitLayout/messagingSplitLayout";
import { Button } from "@/components/ui/button/button";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  type EngineerConversation,
  type EngineerMessage,
} from "@/types/store/engineer.types";

type EngineerConversationPageProps = {
  conversation: EngineerConversation;
  messages: readonly EngineerMessage[];
  conversations: readonly EngineerConversation[];
};

export function EngineerConversationPage({
  conversation,
  messages,
  conversations,
}: EngineerConversationPageProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <EngineerPageHeader
        title={conversation.participantName}
        description={[
          conversation.relatedServiceLabel,
          conversation.lastMessageAtLabel,
        ]
          .filter(Boolean)
          .join(" · ")}
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          {
            label: engineerPageTitles.messages,
            href: engineerPanelPaths.messages,
          },
          { label: engineerPageTitles.conversation },
        ]}
      />
      <MessagingSplitLayout
        sidebar={conversations.map((item) => (
          <li key={item.id}>
            <EngineerConversationRow
              conversation={item}
              active={item.id === conversation.id}
            />
          </li>
        ))}
      >
        <MessagingConversationPane
          conversationId={conversation.id}
          title={conversation.participantName}
          meta={[
            conversation.relatedServiceLabel,
            conversation.lastMessageAtLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
          relatedLink={
            conversation.relatedRequestId ? (
              <Button asChild variant="outline" size="sm">
                <Link
                  href={`${engineerPanelPaths.requests}/${conversation.relatedRequestId}`}
                >
                  {engineerPageTitles.requestDetail}
                </Link>
              </Button>
            ) : null
          }
          messages={messages}
          viewerRole="engineer"
        />
      </MessagingSplitLayout>
    </div>
  );
}
