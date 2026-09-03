import { type ExpertCardData } from "@/types/store/expert.types";
import { type ServiceCategory } from "@/config/services.config/services.config";

export type SearchResultsProps = {
  services: readonly ServiceCategory[];
  experts: readonly ExpertCardData[];
};
