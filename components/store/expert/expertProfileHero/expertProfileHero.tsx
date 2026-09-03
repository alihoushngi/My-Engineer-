import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { ExpertContactDrawer } from "@/components/store/expert/expertContactDrawer/expertContactDrawer";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertShareButton } from "@/components/store/expert/expertShareButton/expertShareButton";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import {
  getExpertInitials,
  getPublicPhone,
  getPublicSms,
  getReviewCount,
  hasPublicContact,
  toExpertSharePath,
} from "@/lib/experts/expert-profile/expert-profile";

type ExpertProfileHeroProps = {
  expert: ExpertProfile;
};

export function ExpertProfileHero({ expert }: ExpertProfileHeroProps) {
  const initials = getExpertInitials(expert.name);
  const phone = getPublicPhone(expert.contact);
  const sms = getPublicSms(expert.contact);
  const canContact = hasPublicContact(expert);
  const reviewCount = getReviewCount(expert);

  return (
    <header className="border-b border-border bg-surface-muted">
      <div className="container-app py-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
            <Avatar className="size-24 sm:size-28">
              {expert.avatarSrc ? (
                <AvatarImage src={expert.avatarSrc} alt="" />
              ) : null}
              <AvatarFallback className="type-h3">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 space-y-4">
              <div className="space-y-2">
                <h1 className="break-words type-h1 text-foreground">
                  {expert.name}
                </h1>
                <p className="type-body-lg text-muted-foreground">
                  {expert.profession}
                  {expert.primarySpecialty
                    ? ` · ${expert.primarySpecialty}`
                    : ""}
                </p>
              </div>
              <ExpertStatusBadges
                isVerified={expert.isVerified}
                isActive={expert.isActive}
              />
              {typeof expert.rating === "number" ? (
                <ExpertRating
                  rating={expert.rating}
                  reviewCount={reviewCount}
                />
              ) : null}
              {expert.shortIntroduction ? (
                <p className="max-w-2xl type-body text-muted-foreground">
                  {expert.shortIntroduction}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
            {canContact ? (
              <ExpertContactDrawer
                expertName={expert.name}
                phone={phone}
                sms={sms}
                trigger={
                  <Button type="button" className="w-full sm:w-auto">
                    {expertProfileCopy.contactLabel}
                  </Button>
                }
              />
            ) : null}
            <ExpertShareButton
              title={`${expert.name} | ${expert.profession}`}
              path={toExpertSharePath(expert.id)}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
