"use client";

import { MessageSquareIcon } from "lucide-react";
import { ExpertSaveButton } from "@/components/store/expert/expertSaveButton/expertSaveButton";
import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { ExpertShareButton } from "@/components/store/expert/expertShareButton/expertShareButton";
import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";
import { toExpertSharePath } from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type ExpertProfileToolbarProps = {
  expert: ExpertProfile;
  expertOption: RequestExpertOption;
  cities: readonly City[];
  isUserAuthenticated?: boolean;
  isSaved?: boolean;
};

export function ExpertProfileToolbar({
  expert,
  expertOption,
  cities,
  isUserAuthenticated = false,
  isSaved = false,
}: ExpertProfileToolbarProps) {
  const nextPath = toExpertSharePath(expert.id);

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col">
      <RequestCreateDialog
        experts={[expertOption]}
        cities={cities}
        isUserAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        lockedExpertId={expert.id}
        triggerClassName="w-full sm:w-auto"
      />
      <StartConversationButton
        expertId={expert.id}
        isUserAuthenticated={isUserAuthenticated}
        className="w-full sm:w-auto"
        icon={<MessageSquareIcon aria-hidden="true" />}
      />
      <ExpertSaveButton
        expertId={expert.id}
        isSaved={isSaved}
        isUserAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        className="w-full sm:w-auto"
      />
      <ExpertShareButton
        title={`${expert.name} | ${expert.profession}`}
        path={nextPath}
        className="w-full sm:w-auto"
      />
    </div>
  );
}
