"use client";

import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { searchCopy } from "@/config/search.config/search.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

type SearchErrorStateProps = {
  onRetry: () => void;
};

export function SearchErrorState({ onRetry }: SearchErrorStateProps) {
  return (
    <div className="container-wide flex flex-col gap-6 py-section">
      <Alert variant="danger">
        <CircleAlertIcon />
        <AlertTitle>{searchCopy.errorTitle}</AlertTitle>
        <AlertDescription>{searchCopy.errorDescription}</AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={onRetry}>
          {searchCopy.retryLabel}
        </Button>
        <Button asChild variant="outline">
          <Link href={storePaths.search}>{searchCopy.changeSearchLabel}</Link>
        </Button>
      </div>
      <SearchInput
        id="search-error-query"
        initialQuery=""
        navigateOnClear={false}
      />
    </div>
  );
}
