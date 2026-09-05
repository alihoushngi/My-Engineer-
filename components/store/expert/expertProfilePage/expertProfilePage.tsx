import { InfoIcon } from "lucide-react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { ExpertAbout } from "@/components/store/expert/expertAbout/expertAbout";
import { ExpertContactCta } from "@/components/store/expert/expertContactCta/expertContactCta";
import { ExpertExperience } from "@/components/store/expert/expertExperience/expertExperience";
import { ExpertPortfolio } from "@/components/store/expert/expertPortfolio/expertPortfolio";
import { ExpertProfessionalInfo } from "@/components/store/expert/expertProfessionalInfo/expertProfessionalInfo";
import { ExpertProfileHero } from "@/components/store/expert/expertProfileHero/expertProfileHero";
import { ExpertQuickFacts } from "@/components/store/expert/expertQuickFacts/expertQuickFacts";
import { ExpertReviews } from "@/components/store/expert/expertReviews/expertReviews";
import { ExpertSpecialties } from "@/components/store/expert/expertSpecialties/expertSpecialties";
import { ExpertStickyContactBar } from "@/components/store/expert/expertStickyContactBar/expertStickyContactBar";
import { ExpertTagSection } from "@/components/store/expert/expertTagSection/expertTagSection";
import { RelatedExperts } from "@/components/store/expert/relatedExperts/relatedExperts";
import { siteConfig } from "@/config/site.config/site.config";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import {
  hasItems,
  hasPublicContact,
  hasText,
} from "@/lib/experts/expert-profile/expert-profile";

type ExpertProfilePageProps = {
  expert: ExpertProfile;
  isDevelopmentPreview?: boolean;
};

export function ExpertProfilePage({
  expert,
  isDevelopmentPreview = false,
}: ExpertProfilePageProps) {
  const hasStickyContact = hasPublicContact(expert);

  return (
    <div className={hasStickyContact ? "pb-24 lg:pb-0" : undefined}>
      <div className="container-app pt-6 sm:pt-8">
        <StoreBreadcrumb
          items={[
            {
              label: expertProfileCopy.breadcrumbHome,
              href: siteConfig.homeHref,
            },
            { label: expertProfileCopy.breadcrumbExperts },
            { label: expert.name },
          ]}
        />
      </div>
      {isDevelopmentPreview ? (
        <div className="container-app py-6">
          <Alert variant="warning">
            <InfoIcon />
            <AlertTitle>{expertProfileCopy.developmentPreviewTitle}</AlertTitle>
            <AlertDescription>
              {expertProfileCopy.developmentPreviewDescription}
            </AlertDescription>
          </Alert>
        </div>
      ) : null}
      <ExpertProfileHero expert={expert} />
      <div className="container-app grid items-start gap-10 py-page lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
        <div className="min-w-0 divide-y divide-border">
          {hasText(expert.about) ? <ExpertAbout about={expert.about} /> : null}
          {hasItems(expert.specialties) ? (
            <ExpertSpecialties specialties={expert.specialties} />
          ) : null}
          <ExpertProfessionalInfo expert={expert} />
          {hasText(expert.history) ? (
            <ExpertExperience history={expert.history} />
          ) : null}
          {hasItems(expert.serviceCities) ? (
            <ExpertTagSection
              title={expertProfileCopy.citiesTitle}
              titleId="expert-cities-heading"
              items={expert.serviceCities}
            />
          ) : null}
          {hasItems(expert.software) ? (
            <ExpertTagSection
              title={expertProfileCopy.softwareTitle}
              titleId="expert-software-heading"
              items={expert.software}
            />
          ) : null}
          {hasItems(expert.portfolio) ? (
            <ExpertPortfolio items={expert.portfolio} />
          ) : null}
          {hasItems(expert.reviews) ||
          typeof expert.rating === "number" ||
          typeof expert.reviewCount === "number" ? (
            <ExpertReviews
              reviews={expert.reviews}
              rating={expert.rating}
              reviewCount={expert.reviewCount}
            />
          ) : null}
        </div>
        <aside className="min-w-0 space-y-8 rounded-lg bg-surface-subtle p-6 lg:sticky lg:top-24">
          <ExpertQuickFacts expert={expert} />
          <ExpertContactCta expert={expert} />
        </aside>
      </div>
      <RelatedExperts experts={expert.relatedExperts} excludeId={expert.id} />
      <ExpertStickyContactBar expert={expert} />
    </div>
  );
}
