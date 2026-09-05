"use client";

import { MessageSquareIcon } from "lucide-react";
import { ExpertLegacyFeature } from "@/components/store/expert/expertLegacyFeature/expertLegacyFeature";
import { ExpertSaveButton } from "@/components/store/expert/expertSaveButton/expertSaveButton";
import { ExpertShareButton } from "@/components/store/expert/expertShareButton/expertShareButton";
import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
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
      <ExpertLegacyFeature
        label={expertProfileCopy.chatLabel}
        title={expertProfileCopy.chatUnavailableTitle}
        description={expertProfileCopy.chatUnavailableDescription}
        icon={<MessageSquareIcon aria-hidden="true" />}
        className="w-full sm:w-auto"
        auth={{ isAuthenticated: isUserAuthenticated, nextPath }}
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
