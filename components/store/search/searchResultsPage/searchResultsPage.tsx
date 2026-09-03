import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ActiveFilters } from "@/components/store/search/activeFilters/activeFilters";
import { SearchEmptyState } from "@/components/store/search/searchEmptyState/searchEmptyState";
import { SearchHeader } from "@/components/store/search/searchHeader/searchHeader";
import { SearchResults } from "@/components/store/search/searchResults/searchResults";
import { SearchSummary } from "@/components/store/search/searchSummary/searchSummary";
import { searchCopy } from "@/config/search.config/search.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  type SearchCatalogResult,
  type SearchQueryState,
} from "@/types/store/search.types";

type SearchResultsPageProps = {
  queryState: SearchQueryState;
  result: SearchCatalogResult;
};

export function SearchResultsPage({
  queryState,
  result,
}: SearchResultsPageProps) {
  const { q, cities } = queryState;
  const hasQuery = q !== "";
  const hasResults = result.services.length > 0 || result.experts.length > 0;

  return (
    <div className="container-wide flex flex-col gap-8 py-8 sm:py-12">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: searchCopy.breadcrumb },
        ]}
      />
      <SearchHeader initialQuery={q} cities={cities} />
      <SearchSummary query={q} />
      <ActiveFilters items={[]} clearHref={storePaths.search} />
      {hasQuery && hasResults ? (
        <SearchResults services={result.services} experts={result.experts} />
      ) : (
        <SearchEmptyState variant={hasQuery ? "no-results" : "no-query"} />
      )}
    </div>
  );
}
