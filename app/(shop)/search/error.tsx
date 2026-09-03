"use client";

import { SearchErrorState } from "@/components/store/search/searchErrorState/searchErrorState";

type SearchErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SearchError({ reset }: SearchErrorProps) {
  return <SearchErrorState onRetry={reset} />;
}
