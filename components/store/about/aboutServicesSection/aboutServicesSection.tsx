import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import {
  aboutCopy,
  aboutServiceDomains,
} from "@/config/about.config/about.config";

export function AboutServicesSection() {
  return (
    <section
      aria-labelledby="about-services-heading"
      className="border-y border-border bg-surface py-12 sm:py-16"
    >
      <div className="container-app space-y-8">
        <SectionHeader
          titleId="about-services-heading"
          title={aboutCopy.servicesTitle}
          description={aboutCopy.servicesIntro}
        />
        <ul className="space-y-4">
          {aboutServiceDomains.map((domain) => (
            <li key={domain.slug} className="space-y-1">
              <h3 className="type-h4 text-foreground">{domain.title}</h3>
              <p className="type-body text-muted-foreground">
                {domain.description}
              </p>
            </li>
          ))}
        </ul>
        <ServiceCategoryGrid hideDescription />
      </div>
    </section>
  );
}
