import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Card } from "@/components/ui/card/card";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import { Badge } from "@/components/ui/badge/badge";
import {
  expertCardCopy,
  expertProfileCopy,
} from "@/config/experts.config/experts.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import { getExpertInitials } from "@/lib/experts/expert-profile/expert-profile";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ExpertCardProps = {
  expert: ExpertCardData;
  className?: string;
};

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const initials = getExpertInitials(expert.name);
  const specialties = expert.specialties ?? [];
  const meta = [
    typeof expert.experienceYears === "number"
      ? `${formatFaNumber(expert.experienceYears)} ${expertProfileCopy.yearsSuffix}`
      : undefined,
    expert.city,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={cn(className)}>
      <Link
        href={expert.href}
        className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="h-full p-4 transition-colors group-hover:border-border-strong group-hover:bg-accent/40">
          <div className="flex items-start gap-3">
            <Avatar size="lg" className="size-12">
              {expert.avatarSrc ? (
                <AvatarImage src={expert.avatarSrc} alt="" />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="space-y-1">
                <h3 className="break-words type-h4 font-semibold text-card-foreground">
                  {expert.name}
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  {expert.profession}
                </p>
              </div>
              <ExpertStatusBadges
                isVerified={expert.isVerified}
                isActive={expert.isActive}
              />
              {typeof expert.rating === "number" ? (
                <ExpertRating
                  rating={expert.rating}
                  reviewCount={expert.reviewCount}
                />
              ) : null}
              {specialties.length > 0 ? (
                <ul className="flex flex-wrap gap-1.5">
                  {specialties.map((specialty) => (
                    <li key={specialty}>
                      <Badge variant="secondary">{specialty}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
              {meta ? (
                <p className="type-caption text-muted-foreground">{meta}</p>
              ) : null}
              <p className="type-body-sm font-medium text-primary">
                {expertCardCopy.profileCta}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </article>
  );
}
