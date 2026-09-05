import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils/cn/cn";
import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import {
  type UserConversation,
  type UserMessage,
} from "@/types/store/user-account.types";

type UserConversationPageProps = {
  conversation: UserConversation;
  messages: readonly UserMessage[];
};

export function UserConversationPage({
  conversation,
  messages,
}: UserConversationPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <AccountPageHeader
        title={conversation.participantName}
        description={userAccountCopy.conversationDescription}
      />
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>{userAccountCopy.messagingSoonTitle}</AlertTitle>
        <AlertDescription>
          {userAccountCopy.messagingSoonDescription}
        </AlertDescription>
      </Alert>
      {conversation.relatedRequestId ? (
        <Button asChild variant="outline" size="sm" className="self-start">
          <Link
            href={`${userAccountPaths.requests}/${conversation.relatedRequestId}`}
          >
            {userAccountPageTitles.requestDetail}
          </Link>
        </Button>
      ) : null}
      <div className="-mx-4 flex min-h-80 flex-col overflow-hidden rounded-none border-y border-border bg-surface sm:mx-0 sm:h-[min(70dvh,42rem)] sm:rounded-lg sm:border">
        <ol className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2",
                message.fromUser
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
      </div>
    </div>
  );
}
