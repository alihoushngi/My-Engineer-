import { type SearchCatalogResult } from "@/types/store/search.types";
import { matchServices } from "@/lib/search/match-services/match-services";

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
    experts: [],
  };
}
