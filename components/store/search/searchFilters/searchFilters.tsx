import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";

type Props = { cities?: readonly string[] };

export function SearchFilters({ cities }: Props) {
  return (
    <div className="flex w-full shrink-0 sm:w-auto">
      <SearchCityTrigger cities={cities} />
    </div>
  );
}
