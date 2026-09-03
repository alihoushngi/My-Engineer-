import { searchCopy } from "@/config/search.config/search.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type SearchSummaryProps = {
  query: string;
  serviceCount?: number;
  expertCount?: number;
};

export function SearchSummary({
  query,
  serviceCount,
  expertCount,
}: SearchSummaryProps) {
  if (query === "") {
    return null;
  }

  const hasCounts =
    typeof serviceCount === "number" && typeof expertCount === "number";

  return (
    <p className="type-body text-muted-foreground" aria-live="polite">
      {searchCopy.summaryPrefix} «{query}»
      {hasCounts
        ? ` — ${searchCopy.resultCount(
            formatFaNumber(serviceCount),
            formatFaNumber(expertCount),
          )}`
        : null}
    </p>
  );
}
