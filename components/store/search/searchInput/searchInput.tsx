"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { searchCopy } from "@/config/search.config/search.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { buildSearchHref } from "@/lib/search/search-params/search-params";
import { type SearchInputProps } from "@/components/store/search/searchInput/type/searchInput.types";

export function SearchInput({
  initialQuery,
  cities = [],
  id = "search-query",
  requireQuery = false,
  navigateOnClear = true,
  autoFocus = false,
  labelHidden = false,
  onSubmitted,
}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const trimmedValue = value.trim();
  const hasValue = trimmedValue !== "";
  const canSubmit = !requireQuery || hasValue;
  const citiesValue = cities.join(",");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    router.push(buildSearchHref({ q: value, cities }));
    onSubmitted?.();
  }

  return (
    <form
      action={storePaths.search}
      method="get"
      className="w-full"
      onSubmit={submitSearch}
    >
      {citiesValue !== "" ? (
        <input type="hidden" name="cities" value={citiesValue} />
      ) : null}
      <Field>
        <FieldLabel
          htmlFor={id}
          className={labelHidden ? "sr-only" : undefined}
        >
          {searchCopy.inputLabel}
        </FieldLabel>
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="relative min-w-0 flex-1">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={id}
              name="q"
              type="search"
              value={value}
              autoFocus={autoFocus}
              autoComplete="off"
              enterKeyHint="search"
              placeholder={searchCopy.placeholder}
              className="ps-10 pe-12 [&::-webkit-search-cancel-button]:hidden"
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            />
            {hasValue ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 end-1 size-11 -translate-y-1/2 text-muted-foreground"
                aria-label={searchCopy.clearLabel}
                onClick={() => {
                  setValue("");

                  if (navigateOnClear) {
                    router.push(buildSearchHref({ cities }));
                  }
                }}
              >
                <XIcon aria-hidden="true" />
              </Button>
            ) : null}
          </div>
          <Button type="submit" disabled={!canSubmit} className="px-4 sm:px-6">
            {searchCopy.submitLabel}
          </Button>
        </div>
      </Field>
    </form>
  );
}
