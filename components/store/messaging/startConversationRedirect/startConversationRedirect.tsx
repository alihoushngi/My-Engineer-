"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { messagingCopy } from "@/config/messaging.config/messaging.config";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { startOrOpenConversation } from "@/services/messaging-service/messaging-service";

type StartConversationRedirectProps = {
  expertId: string;
};

export function StartConversationRedirect({
  expertId,
}: StartConversationRedirectProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    void startOrOpenConversation(expertId)
      .then((conversationId) => {
        if (!cancelled) {
          router.replace(`${userAccountPaths.messages}/${conversationId}`);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(toUserErrorMessage(caught, messagingCopy.startUnavailable));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, expertId, router]);

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <p className="type-body text-danger" role="alert">
          {error}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              setError(null);
              setAttempt((value) => value + 1);
            }}
          >
            {messagingCopy.retryLabel}
          </Button>
          <Button asChild variant="outline">
            <Link href={userAccountPaths.messages}>
              {userAccountCopy.viewMessages}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <p className="type-body text-muted-foreground">
      {userAccountCopy.loadingLabel}
    </p>
  );
}
