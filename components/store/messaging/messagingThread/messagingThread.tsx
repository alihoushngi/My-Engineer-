"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  messagingCopy,
  MESSAGING_VISIBLE_PAGE,
} from "@/config/messaging.config/messaging.config";
import { cn } from "@/lib/utils/cn/cn";
import { type ParticipantRole } from "@/types/store/messaging.types";

type ThreadMessage = {
  id: string;
  body: string;
  sentAtLabel: string;
  senderRole: ParticipantRole;
};

type MessagingThreadProps = {
  messages: readonly ThreadMessage[];
  viewerRole: ParticipantRole;
};

export function MessagingThread({
  messages,
  viewerRole,
}: MessagingThreadProps) {
  const [visible, setVisible] = useState(MESSAGING_VISIBLE_PAGE);
  const hidden = Math.max(0, messages.length - visible);
  const shown = messages.slice(hidden);

  if (messages.length === 0) {
    return (
      <p className="p-4 type-body text-muted-foreground">
        {messagingCopy.emptyThread}
      </p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {hidden > 0 ? (
        <div className="border-b border-border p-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setVisible((count) => count + MESSAGING_VISIBLE_PAGE);
            }}
          >
            {messagingCopy.loadOlder}
          </Button>
        </div>
      ) : null}
      <ol className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {shown.map((message) => {
          const own = message.senderRole === viewerRole;
          return (
            <li
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2",
                own
                  ? "self-start bg-primary-subtle text-foreground"
                  : "self-end bg-surface-subtle text-foreground",
              )}
            >
              <p className="sr-only">
                {own ? messagingCopy.ownMessage : messagingCopy.peerMessage}
              </p>
              <p className="type-body leading-relaxed">{message.body}</p>
              <p className="mt-1 type-caption text-muted-foreground">
                {message.sentAtLabel}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
