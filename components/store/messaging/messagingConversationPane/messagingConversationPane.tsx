import { type ReactNode } from "react";
import { MessagingComposer } from "@/components/store/messaging/messagingComposer/messagingComposer";
import { MessagingMarkRead } from "@/components/store/messaging/messagingMarkRead/messagingMarkRead";
import { MessagingThread } from "@/components/store/messaging/messagingThread/messagingThread";
import { messagingCopy } from "@/config/messaging.config/messaging.config";
import { type ParticipantRole } from "@/types/store/messaging.types";

type ThreadMessage = {
  id: string;
  body: string;
  sentAtLabel: string;
  senderRole: ParticipantRole;
};

type MessagingConversationPaneProps = {
  conversationId: string;
  title: string;
  meta?: string;
  relatedLink?: ReactNode;
  messages: readonly ThreadMessage[];
  viewerRole: ParticipantRole;
};

export function MessagingConversationPane({
  conversationId,
  title,
  meta,
  relatedLink,
  messages,
  viewerRole,
}: MessagingConversationPaneProps) {
  return (
    <section className="-mx-4 flex min-h-[min(70dvh,42rem)] flex-1 flex-col overflow-hidden rounded-none border-y border-border bg-surface sm:mx-0 sm:rounded-lg sm:border lg:min-h-0">
      <header className="shrink-0 space-y-2 border-b border-border px-4 py-3">
        <h2 className="type-h4 text-foreground">{title}</h2>
        {meta ? (
          <p className="type-caption text-muted-foreground">{meta}</p>
        ) : null}
        {relatedLink}
        <p className="type-caption text-muted-foreground">
          {messagingCopy.noRealtimeNote}
        </p>
      </header>
      <MessagingMarkRead conversationId={conversationId} />
      <MessagingThread messages={messages} viewerRole={viewerRole} />
      <MessagingComposer conversationId={conversationId} />
    </section>
  );
}
