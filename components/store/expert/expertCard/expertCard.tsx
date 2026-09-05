import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import {
  expertCardCopy,
  expertProfileCopy,
} from "@/config/experts.config/experts.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import { getExpertInitials } from "@/lib/experts/expert-profile/expert-profile";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ExpertCardProps = { expert: ExpertCardData; className?: string };

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const specialties = expert.specialties ?? [];
  return (
    <article className={cn("h-full", className)}>
      <Link
        href={expert.href}
        className="group flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-4 outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:gap-5 sm:p-5 lg:p-6"
      >
        <div className="flex items-start gap-4">
          <Avatar className="size-16 rounded-lg">
            {expert.avatarSrc ? (
              <AvatarImage src={expert.avatarSrc} alt="" />
            ) : null}
            <AvatarFallback className="rounded-lg bg-primary-subtle text-primary">
              {getExpertInitials(expert.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1.5">
            <h3 className="type-h3 text-foreground group-hover:text-primary">
              {expert.name}
            </h3>
            <p className="type-body-sm text-muted-foreground">
              {expert.profession}
            </p>
            <ExpertStatusBadges
              isVerified={expert.isVerified}
              isActive={expert.isActive}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 type-body-sm">
          {expert.city ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              {expert.city}
            </span>
          ) : null}
          {typeof expert.experienceYears === "number" ? (
            <span>
              {formatFaNumber(expert.experienceYears)}{" "}
              {expertProfileCopy.yearsSuffix}
            </span>
          ) : null}
          {typeof expert.rating === "number" ? (
            <ExpertRating
              rating={expert.rating}
              reviewCount={expert.reviewCount}
            />
          ) : null}
        </div>
        {specialties.length > 0 ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 type-body-sm text-muted-foreground">
            {specialties.slice(0, 3).map((specialty) => (
              <li key={specialty}>{specialty}</li>
            ))}
            {specialties.length > 3 ? (
              <li>+{formatFaNumber(specialties.length - 3)}</li>
            ) : null}
          </ul>
        ) : null}
        <div className="mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-border pt-4 type-button text-primary">
          <span>{expertCardCopy.profileCta}</span>
          <ArrowLeftIcon aria-hidden="true" className="size-4 ltr:rotate-180" />
        </div>
      </Link>
    </article>
  );
}
