import Link from "next/link";
import { UsersIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import { siteConfig } from "@/config/site.config/site.config";
import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";

type ServiceDiscoveryPageProps = {
  service: ServiceCategory;
};

export function ServiceDiscoveryPage({ service }: ServiceDiscoveryPageProps) {
  return (
    <div className="container-app flex flex-col gap-8 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: serviceDiscoveryCopy.breadcrumb },
          { label: service.label },
        ]}
      />
      <ContentPageHeader
        title={service.label}
        description={service.description}
      />
      <Empty
        icon={<UsersIcon aria-hidden="true" />}
        title={serviceDiscoveryCopy.emptyTitle}
        description={serviceDiscoveryCopy.emptyDescription}
        action={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <SearchCityTrigger className="w-auto" />
            <Button asChild variant="outline">
              <Link href={siteConfig.homeHref}>
                {serviceDiscoveryCopy.homeCta}
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
