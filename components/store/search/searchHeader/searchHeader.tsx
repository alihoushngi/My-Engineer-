import { SearchFilters } from "@/components/store/search/searchFilters/searchFilters";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { searchCopy } from "@/config/search.config/search.config";

type SearchHeaderProps = {
  initialQuery: string;
  cities?: readonly string[];
};

export function SearchHeader({ initialQuery, cities }: SearchHeaderProps) {
  return (
    <header className="space-y-7 border-b border-border pb-8">
      <div className="max-w-2xl space-y-2">
        <h1 className="type-h1 text-foreground">{searchCopy.title}</h1>
        <p className="type-body text-muted-foreground">
          {searchCopy.description}
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-surface-subtle p-4 sm:flex-row sm:items-end sm:p-5">
        <div className="min-w-0 flex-1">
          <SearchInput
            key={initialQuery}
            initialQuery={initialQuery}
            cities={cities}
          />
        </div>
        <SearchFilters />
      </div>
    </header>
  );
}
