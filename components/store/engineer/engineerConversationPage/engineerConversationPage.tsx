import { EngineerMessageComposer } from "@/components/store/engineer/engineerMessageComposer/engineerMessageComposer";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { cn } from "@/lib/utils/cn/cn";
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
};

export function EngineerConversationPage({
  conversation,
  messages,
}: EngineerConversationPageProps) {
  return (
    <div className="flex flex-col gap-4">
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
      <div className="-mx-4 flex min-h-[60dvh] flex-col overflow-hidden rounded-none border-y border-border bg-surface sm:mx-0 sm:rounded-lg sm:border">
        <ol className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2",
                message.fromEngineer
                  ? "self-start bg-primary-subtle text-foreground"
                  : "self-end bg-surface-subtle text-foreground",
              )}
            >
              <p className="type-body leading-relaxed">{message.body}</p>
              <p className="mt-1 type-caption text-muted-foreground">
                {message.sentAtLabel}
              </p>
            </li>
          ))}
        </ol>
        <EngineerMessageComposer conversationId={conversation.id} />
      </div>
    </div>
  );
}
