import { EyeIcon, MapPinIcon } from "lucide-react";
import { ExpertAvatarPreview } from "@/components/store/expert/expertAvatarPreview/expertAvatarPreview";
import { ExpertProfileToolbar } from "@/components/store/expert/expertProfileToolbar/expertProfileToolbar";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  getExpertInitials,
  getPrimaryDegree,
  getReviewCount,
} from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";

type ExpertProfileHeroProps = {
  expert: ExpertProfile;
};

export function ExpertProfileHero({ expert }: ExpertProfileHeroProps) {
  const initials = getExpertInitials(expert.name);
  const reviewCount = getReviewCount(expert);
  const degree = getPrimaryDegree(expert.education);
  const competencies = expert.license?.competencies ?? [];

  return (
    <header className="bg-primary-deep text-primary-foreground">
      <div className="container-app py-page">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 type-caption text-primary-foreground/70">
          {typeof expert.viewCount === "number" ? (
            <p className="inline-flex items-center gap-2">
              <EyeIcon aria-hidden="true" className="size-4" />
              {formatFaNumber(expert.viewCount)} {expertProfileCopy.viewsLabel}
            </p>
          ) : (
            <span />
          )}
          <ExpertStatusBadges
            isVerified={expert.isVerified}
            isActive={expert.isActive}
            className="**:data-[slot=badge]:border-primary-foreground/20 **:data-[slot=badge]:bg-primary-foreground/10 **:data-[slot=badge]:text-primary-foreground"
          />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
            <ExpertAvatarPreview
              name={expert.name}
              initials={initials}
              avatarSrc={expert.avatarSrc}
            />
            <div className="min-w-0 space-y-4">
              <div className="space-y-2">
                <h1 className="wrap-break-word type-h1">{expert.name}</h1>
                <p className="type-body-lg text-primary-foreground/75">
                  {expert.profession}
                  {degree ? ` · ${degree}` : ""}
                </p>
              </div>
              {expert.license?.title ? (
                <p className="type-body-sm text-primary-foreground/75">
                  {expert.license.title}
                  {competencies.length > 0
                    ? ` ← ${competencies.join("، ")}`
                    : ""}
                </p>
              ) : null}
              {expert.organizationMembership?.label ? (
                <p className="type-body-sm text-primary-foreground/75">
                  {expert.organizationMembership.label}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 type-body-sm text-primary-foreground/75">
                {typeof expert.experienceYears === "number" ? (
                  <span>
                    {expertProfileCopy.experienceYearsLabel}{" "}
                    {formatFaNumber(expert.experienceYears)}{" "}
                    {expertProfileCopy.yearsSuffix}
                  </span>
                ) : null}
                {expert.city ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon aria-hidden="true" className="size-4" />
                    {expert.city}
                  </span>
                ) : null}
              </div>
              {typeof expert.rating === "number" ? (
                <ExpertRating
                  rating={expert.rating}
                  reviewCount={reviewCount}
                  className="text-primary-foreground/80"
                />
              ) : null}
              <p className="type-body">{expertProfileCopy.freeContactCta}</p>
            </div>
          </div>
          <ExpertProfileToolbar expert={expert} />
        </div>
      </div>
    </header>
  );
}
