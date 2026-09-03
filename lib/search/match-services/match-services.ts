import {
  serviceCategories,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { normalizeSearchText } from "@/lib/search/normalize-search-text/normalize-search-text";

export function matchServices(query: string): readonly ServiceCategory[] {
  const normalizedQuery = normalizeSearchText(query);

  if (normalizedQuery === "") {
    return [];
  }

  return serviceCategories.filter((service) => {
    const haystack = normalizeSearchText(
      `${service.label} ${service.description} ${service.slug}`,
    );

    return haystack.includes(normalizedQuery);
  });
}
