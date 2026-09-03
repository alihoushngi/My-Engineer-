import { searchCopy } from "@/config/search.config/search.config";

type SearchSummaryProps = {
  query: string;
};

export function SearchSummary({ query }: SearchSummaryProps) {
  if (query === "") {
    return null;
  }

  return (
    <p className="type-body text-muted-foreground">
      {searchCopy.summaryPrefix} «{query}»
    </p>
  );
}
