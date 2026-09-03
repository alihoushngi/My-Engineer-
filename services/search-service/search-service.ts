import { type SearchCatalogResult } from "@/types/store/search.types";
import { matchServices } from "@/lib/search/match-services/match-services";

/**
 * Search catalog access.
 * Expert hits are API CONTRACT REQUIRED — no documented search endpoint exists.
 * Service matches use the static service taxonomy only.
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
