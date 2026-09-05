import { type SearchCatalogResult } from "@/types/store/search.types";
import { matchServices } from "@/lib/search/match-services/match-services";
import { env } from "@/lib/env/env";
import { mockExpertCards } from "@/lib/mock-data/mock-data";
import { normalizeSearchText } from "@/lib/search/normalize-search-text/normalize-search-text";

/**
 * Search catalog access.
 *
 * Service matches use the static storefront taxonomy in `config/`.
 * That is not an API call and does not invent ranking.
 *
 * Expert hits are API CONTRACT REQUIRED — no documented search endpoint exists.
 */
export async function searchCatalog(
  query: string,
  cities: readonly string[] = [],
): Promise<SearchCatalogResult> {
  const normalizedQuery = query.trim();

  if (normalizedQuery === "") {
    return {
      query: "",
      services: [],
      experts: [],
    };
  }

  return {
    query: normalizedQuery,
    services: matchServices(normalizedQuery),
    experts: env.useMockData
      ? mockExpertCards.filter((expert) => {
          const haystack = normalizeSearchText(
            [
              expert.name,
              expert.profession,
              expert.city,
              ...(expert.specialties ?? []),
            ]
              .filter(Boolean)
              .join(" "),
          );
          return (
            haystack.includes(normalizeSearchText(normalizedQuery)) &&
            (cities.length === 0 ||
              (expert.city ? cities.includes(expert.city) : false))
          );
        })
      : [],
  };
}
