import { type Metadata } from "next";
import { SearchResultsPage } from "@/components/store/search/searchResultsPage/searchResultsPage";
import { searchCopy } from "@/config/search.config/search.config";
import { parseSearchParams } from "@/lib/search/search-params/search-params";
import { searchCatalog } from "@/services/search-service/search-service";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    cities?: string | string[];
    page?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: searchCopy.title,
  description: searchCopy.description,
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawParams = await searchParams;
  const queryState = parseSearchParams(rawParams);
  const result = await searchCatalog(queryState.q, queryState.cities);

  return <SearchResultsPage queryState={queryState} result={result} />;
}
