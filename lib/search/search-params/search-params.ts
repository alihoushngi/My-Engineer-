import { type SearchQueryState } from "@/types/store/search.types";
import { storePaths } from "@/config/navigation.config/navigation.config";

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function collectCities(value: string | string[] | undefined): string[] {
  if (value === undefined) {
    return [];
  }

  const entries = Array.isArray(value) ? value : [value];
  const cities: string[] = [];

  for (const entry of entries) {
    for (const part of entry.split(",")) {
      const city = part.trim();

      if (city !== "" && !cities.includes(city)) {
        cities.push(city);
      }
    }
  }

  return cities;
}

export function parseSearchParams(params: {
  q?: string | string[];
  cities?: string | string[];
}): SearchQueryState {
  const q = firstValue(params.q)?.trim() ?? "";
  const cities = collectCities(params.cities);

  return { q, cities };
}

export function buildSearchHref(state: {
  q?: string;
  cities?: readonly string[];
}): string {
  const params = new URLSearchParams();
  const query = state.q?.trim() ?? "";
  const cities = (state.cities ?? []).filter((entry) => entry.trim() !== "");

  if (query !== "") {
    params.set("q", query);
  }

  if (cities.length > 0) {
    params.set("cities", cities.join(","));
  }

  const serialized = params.toString();

  return serialized === ""
    ? storePaths.search
    : `${storePaths.search}?${serialized}`;
}
