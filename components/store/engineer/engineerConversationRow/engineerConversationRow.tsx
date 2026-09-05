import Link from "next/link";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type EngineerConversation } from "@/types/store/engineer.types";

type EngineerConversationRowProps = {
  conversation: EngineerConversation;
};

export function EngineerConversationRow({
  conversation,
}: EngineerConversationRowProps) {
  return (
    <Link
      href={`${engineerPanelPaths.messages}/${conversation.id}`}
      className="flex min-h-14 items-start justify-between gap-3 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="min-w-0 space-y-1">
        <p className="type-body font-medium text-foreground">
          {conversation.participantName}
        </p>
        <p className="truncate type-body-sm text-muted-foreground">
          {conversation.lastMessagePreview}
        </p>
        <p className="type-caption text-muted-foreground">
          {[conversation.relatedServiceLabel, conversation.lastMessageAtLabel]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      {conversation.unreadCount > 0 ? (
        <span className="mt-1 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 type-caption text-primary-foreground">
          {formatFaNumber(conversation.unreadCount)}
          <span className="sr-only"> خوانده‌نشده</span>
        </span>
      ) : null}
    </Link>
  );
}
