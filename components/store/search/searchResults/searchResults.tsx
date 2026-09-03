import { UsersIcon } from "lucide-react";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { Empty } from "@/components/ui/empty/empty";
import { searchCopy } from "@/config/search.config/search.config";
import { type SearchResultsProps } from "@/components/store/search/searchResults/type/searchResults.types";

export function SearchResults({ services, experts }: SearchResultsProps) {
  return (
    <div className="space-y-10">
      {services.length > 0 ? (
        <section
          className="space-y-4"
          aria-labelledby="search-services-heading"
        >
          <h2 id="search-services-heading" className="type-h3 text-foreground">
            {searchCopy.servicesHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard
                  href={service.href}
                  title={service.label}
                  description={service.description}
                  icon={<ServiceIcon slug={service.slug} />}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="space-y-4" aria-labelledby="search-experts-heading">
        <h2 id="search-experts-heading" className="type-h3 text-foreground">
          {searchCopy.expertsHeading}
        </h2>
        {experts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {experts.map((expert) => (
              <li key={expert.id}>
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            icon={<UsersIcon aria-hidden="true" />}
            title={searchCopy.expertsUnavailable}
          />
        )}
      </section>
    </div>
  );
}
