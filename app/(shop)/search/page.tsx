import { type Metadata } from "next";
import { SearchResultsPage } from "@/components/store/search/searchResultsPage/searchResultsPage";
import { siteConfig } from "@/config/site.config/site.config";
import { parseSearchParams } from "@/lib/search/search-params/search-params";
import { searchCatalog } from "@/services/search-service/search-service";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    cities?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: `جستجو | ${siteConfig.name}`,
  description: "جستجوی خدمات و متخصصان ساختمان در مهندس من.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawParams = await searchParams;
  const queryState = parseSearchParams(rawParams);
  const result = await searchCatalog(queryState.q);

  return <SearchResultsPage queryState={queryState} result={result} />;
}
