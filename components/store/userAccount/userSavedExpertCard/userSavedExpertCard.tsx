"use client";

import Link from "next/link";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ExpertSaveButton } from "@/components/store/expert/expertSaveButton/expertSaveButton";
import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { Button } from "@/components/ui/button/button";
import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedExpertCardProps = {
  expert: ExpertCardData;
  conversationId?: string;
};

export function UserSavedExpertCard({
  expert,
  conversationId,
}: UserSavedExpertCardProps) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ExpertCard expert={expert} />
      <div className="flex flex-wrap gap-2">
        <ExpertSaveButton
          expertId={expert.id}
          isSaved
          isUserAuthenticated
          nextPath={userAccountPaths.saved}
          savedLabel={marketplaceCopy.removeSavedLabel}
          unsavedLabel={marketplaceCopy.removeSavedLabel}
          className="min-w-0 flex-1"
        />
        {conversationId ? (
          <Button asChild variant="outline" className="min-w-0 flex-1">
            <Link href={`${userAccountPaths.messages}/${conversationId}`}>
              {marketplaceCopy.messageEngineerLabel}
            </Link>
          </Button>
        ) : (
          <StartConversationButton
            expertId={expert.id}
            isUserAuthenticated
            className="min-w-0 flex-1"
          />
        )}
      </div>
    </div>
  );
}
