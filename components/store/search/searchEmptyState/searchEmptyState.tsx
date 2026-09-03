import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import { searchCopy } from "@/config/search.config/search.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type SearchEmptyVariant } from "@/components/store/search/searchEmptyState/type/searchEmptyState.types";

type SearchEmptyStateProps = {
  variant: SearchEmptyVariant;
};

export function SearchEmptyState({ variant }: SearchEmptyStateProps) {
  const isNoQuery = variant === "no-query";

  return (
    <div className="space-y-8">
      <Empty
        icon={<SearchIcon aria-hidden="true" />}
        title={isNoQuery ? searchCopy.noQueryTitle : searchCopy.noResultsTitle}
        description={
          isNoQuery
            ? searchCopy.noQueryDescription
            : searchCopy.noResultsDescription
        }
        action={
          isNoQuery ? (
            <SearchCityTrigger className="w-auto" />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button asChild variant="outline">
                <Link href={storePaths.search}>
                  {searchCopy.changeSearchLabel}
                </Link>
              </Button>
              <SearchCityTrigger className="w-auto" />
            </div>
          )
        }
      />
      <section className="space-y-4" aria-labelledby="search-browse-services">
        <h2 id="search-browse-services" className="type-h3 text-foreground">
          {searchCopy.browseServices}
        </h2>
        <ServiceCategoryGrid />
      </section>
    </div>
  );
}
