import Link from "next/link";
import { UsersIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import { siteConfig } from "@/config/site.config/site.config";
import {
  serviceCategories,
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import {
  aboutCopy,
  aboutServiceDomains,
} from "@/config/about.config/about.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type ServiceDiscoveryPageProps = { service: ServiceCategory };

export function ServiceDiscoveryPage({ service }: ServiceDiscoveryPageProps) {
  const introduction = aboutServiceDomains.find(
    (item) => item.slug === service.slug,
  );
  return (
    <div className="container-app space-y-10 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          {
            label: serviceDiscoveryCopy.breadcrumb,
            href: "/#service-categories",
          },
          { label: service.label },
        ]}
      />
      <ContentPageHeader
        title={service.label}
        description={service.description}
      />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <section
          aria-labelledby="service-experts-heading"
          className="min-w-0 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <h2 id="service-experts-heading" className="type-h3">
              متخصصان
            </h2>
            <SearchCityTrigger />
          </div>
          <Empty
            icon={<UsersIcon aria-hidden="true" />}
            title={serviceDiscoveryCopy.emptyTitle}
            description={serviceDiscoveryCopy.emptyDescription}
            action={
              <Button asChild variant="outline">
                <Link href="/#service-categories">مشاهده خدمات دیگر</Link>
              </Button>
            }
          />
        </section>
        <aside className="space-y-7 border-s-2 border-border ps-6">
          {introduction ? (
            <div className="space-y-3">
              <h2 className="type-h4">{introduction.title}</h2>
              <p className="type-body text-muted-foreground">
                {introduction.description}
              </p>
            </div>
          ) : null}
          <div className="space-y-4">
            <h2 className="type-h4">{aboutCopy.howTitle}</h2>
            <ol className="space-y-5">
              {aboutCopy.howSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="type-label text-primary">
                    {formatFaNumber(index + 1)}
                  </span>
                  <div className="space-y-1">
                    <h3 className="type-label">{step.title}</h3>
                    <p className="type-body-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
      <section
        aria-labelledby="related-services-heading"
        className="space-y-4 border-t border-border pt-8"
      >
        <h2 id="related-services-heading" className="type-h3">
          خدمات دیگر
        </h2>
        <ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <li key={item.slug}>
                <ServiceCard
                  href={item.href}
                  title={item.label}
                  icon={<ServiceIcon slug={item.slug} />}
                />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
