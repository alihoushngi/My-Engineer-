"use client";

import { BookmarkIcon, MessageSquareIcon } from "lucide-react";
import { ExpertContactDrawer } from "@/components/store/expert/expertContactDrawer/expertContactDrawer";
import { ExpertLegacyFeature } from "@/components/store/expert/expertLegacyFeature/expertLegacyFeature";
import { ExpertShareButton } from "@/components/store/expert/expertShareButton/expertShareButton";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import {
  getPublicPhone,
  getPublicSms,
  hasPublicContact,
  toExpertSharePath,
} from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";

type ExpertProfileToolbarProps = {
  expert: ExpertProfile;
};

export function ExpertProfileToolbar({ expert }: ExpertProfileToolbarProps) {
  const canContact = hasPublicContact(expert);

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col">
      {canContact ? (
        <ExpertContactDrawer
          expertName={expert.name}
          phone={getPublicPhone(expert.contact)}
          sms={getPublicSms(expert.contact)}
          trigger={
            <Button type="button" className="w-full sm:w-auto">
              {expertProfileCopy.contactLabel}
            </Button>
          }
        />
      ) : null}
      <ExpertLegacyFeature
        label={expertProfileCopy.chatLabel}
        title={expertProfileCopy.chatUnavailableTitle}
        description={expertProfileCopy.chatUnavailableDescription}
        icon={<MessageSquareIcon aria-hidden="true" />}
        className="w-full sm:w-auto"
      />
      <ExpertShareButton
        title={`${expert.name} | ${expert.profession}`}
        path={toExpertSharePath(expert.id)}
        className="w-full sm:w-auto"
      />
      <ExpertLegacyFeature
        label={expertProfileCopy.saveLabel}
        title={expertProfileCopy.saveUnavailableTitle}
        description={expertProfileCopy.saveUnavailableDescription}
        variant="ghost"
        icon={<BookmarkIcon aria-hidden="true" />}
        className="w-full sm:w-auto"
      />
    </div>
  );
}
