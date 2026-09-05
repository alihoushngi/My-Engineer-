import { Suspense } from "react";
import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { ServiceDiscoveryHero } from "@/components/store/service/serviceDiscoveryHero/serviceDiscoveryHero";
import { ServiceExpertMarketplace } from "@/components/store/service/serviceExpertMarketplace/serviceExpertMarketplace";
import { ServiceProcessSection } from "@/components/store/service/serviceProcessSection/serviceProcessSection";
import { ServiceRelatedSection } from "@/components/store/service/serviceRelatedSection/serviceRelatedSection";
import { ServiceScopeSection } from "@/components/store/service/serviceScopeSection/serviceScopeSection";
import { ServiceSuggestedExperts } from "@/components/store/service/serviceSuggestedExperts/serviceSuggestedExperts";
import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { type City } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceDiscoveryPageProps = {
  service: ServiceCategory;
  detail: ServiceDetailData;
  cities: readonly City[];
};

export function ServiceDiscoveryPage({
  service,
  detail,
  cities,
}: ServiceDiscoveryPageProps) {
  const suggestedExperts = detail.showSuggestedExperts
    ? detail.experts.filter((expert) => expert.isVerified).slice(0, 3)
    : [];

  return (
    <>
      <ServiceDiscoveryHero service={service} detail={detail} />
      <ServiceScopeSection detail={detail} />
      <div className="bg-background-subtle py-section">
        <div className="container-app space-y-10">
          {suggestedExperts.length > 0 ? (
            <ServiceSuggestedExperts experts={suggestedExperts} />
          ) : null}
          <Suspense
            fallback={
              <p className="type-body-sm text-muted-foreground">
                در حال آماده‌سازی فهرست متخصصان...
              </p>
            }
          >
            <ServiceExpertMarketplace
              slug={service.slug}
              experts={detail.experts}
              cities={cities}
            />
          </Suspense>
        </div>
      </div>
      <ServiceProcessSection detail={detail} />
      {detail.faqs.length > 0 ? (
        <section className="bg-secondary-subtle py-section">
          <div className="container-narrow">
            <p className="type-label text-secondary">
              {serviceDiscoveryCopy.faqLabel}
            </p>
            <h2 className="mt-3 type-h1">{serviceDiscoveryCopy.faqTitle}</h2>
            <div className="mt-7">
              <FaqAccordion items={detail.faqs} />
            </div>
          </div>
        </section>
      ) : null}
      <ServiceRelatedSection service={service} />
    </>
  );
}
