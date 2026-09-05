import Link from "next/link";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type UserConversation } from "@/types/store/user-account.types";

type UserConversationRowProps = {
  conversation: UserConversation;
};

export function UserConversationRow({
  conversation,
}: UserConversationRowProps) {
  return (
    <Link
      href={`${userAccountPaths.messages}/${conversation.id}`}
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
          {conversation.lastMessageAtLabel}
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
