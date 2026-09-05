import { UsersIcon } from "lucide-react";
import { Pagination } from "@/components/common/pagination/pagination";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { Empty } from "@/components/ui/empty/empty";
import { searchCopy } from "@/config/search.config/search.config";
import { type SearchResultsProps } from "@/components/store/search/searchResults/type/searchResults.types";

export function SearchResults({
  services,
  experts,
  expertPagination,
  expertPageHref,
}: SearchResultsProps) {
  const visibleExperts = expertPagination?.items ?? experts;

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
              <li key={service.slug} className="min-w-0">
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
        {visibleExperts.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {visibleExperts.map((expert) => (
                <li key={expert.id} className="min-w-0">
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>
            {expertPagination && expertPageHref ? (
              <Pagination
                page={expertPagination.page}
                pageCount={expertPagination.pageCount}
                ariaLabel={searchCopy.paginationLabel}
                buildHref={expertPageHref}
              />
            ) : null}
          </>
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
