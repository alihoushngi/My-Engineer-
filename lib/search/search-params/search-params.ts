import { type SearchQueryState } from "@/types/store/search.types";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";

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
  page?: string | string[];
}): SearchQueryState {
  const q = firstValue(params.q)?.trim() ?? "";
  const cities = collectCities(params.cities);

  return { q, cities, page: parsePageParam(params.page) };
}

export function buildSearchHref(state: {
  q?: string;
  cities?: readonly string[];
  page?: number;
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

  if (state.page && state.page > 1) {
    params.set("page", String(state.page));
  }

  const serialized = params.toString();

  return serialized === ""
    ? storePaths.search
    : `${storePaths.search}?${serialized}`;
}
