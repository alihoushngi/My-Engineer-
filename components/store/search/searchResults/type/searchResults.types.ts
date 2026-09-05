import { type ExpertCardData } from "@/types/store/expert.types";
import { type ServiceCategory } from "@/config/services.config/services.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

export type SearchResultsProps = {
  services: readonly ServiceCategory[];
  experts: readonly ExpertCardData[];
  expertPagination?: PaginatedItems<ExpertCardData>;
  paginationPathname?: string;
  paginationQuery?: string;
};
