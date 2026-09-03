import { type ExpertCardData } from "@/types/store/expert.types";
import { type ServiceCategory } from "@/config/services.config/services.config";

export type SearchQueryState = {
  q: string;
  cities: readonly string[];
};

export type SearchCatalogResult = {
  query: string;
  services: readonly ServiceCategory[];
  experts: readonly ExpertCardData[];
};

export type SearchActiveFilter = {
  id: string;
  label: string;
  href: string;
};
