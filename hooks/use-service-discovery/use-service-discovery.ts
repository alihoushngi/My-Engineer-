"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  degreeFilterOptions,
  disciplineFilterOptions,
  getServiceFilterDefinition,
  licenseFilterOptions,
} from "@/config/service-filters.config/service-filters.config";
import { type ServiceSlug } from "@/config/services.config/services.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  ALL_FILTER,
  applyServiceFilterDefaults,
  createEmptyFilters,
  filterServiceExperts,
  getActiveFilterChips,
  getDefaultTab,
  getOverlayFilterKeys,
  getVisibleFilterKeys,
  hasActiveServiceFilters,
  parseServiceFilterParams,
  serializeServiceFilterParams,
  withTabFilters,
  type FilterKey,
  type ServiceFilterValues,
} from "@/lib/service/filter-experts/filter-experts";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type UseServiceDiscoveryArgs = {
  slug: ServiceSlug;
  experts: readonly ExpertCardData[];
  cities: readonly City[];
};

export function useServiceDiscovery({
  slug,
  experts,
  cities,
}: UseServiceDiscoveryArgs) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const definition = getServiceFilterDefinition(slug);
  const defaultTab = getDefaultTab(definition.tabs);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [draft, setDraft] = useState<ServiceFilterValues>(() =>
    createEmptyFilters(defaultTab),
  );
  const applied = applyServiceFilterDefaults(
    parseServiceFilterParams(Object.fromEntries(searchParams.entries())),
    defaultTab,
  );

  const visibleKeys = getVisibleFilterKeys(
    definition.keys,
    definition.tabs,
    applied.tab,
  );
  const overlayKeys = getOverlayFilterKeys(visibleKeys);
  const filteredExperts = filterServiceExperts(experts, applied, {
    skills: definition.skills,
    experienceBands: definition.experienceBands,
    tabs: definition.tabs,
    visibleKeys,
  });
  const pagination = paginateItems(filteredExperts, applied.page);
  const activeChips = getActiveFilterChips(applied, {
    cities,
    skills: definition.skills,
    experienceBands: definition.experienceBands,
    licenses: licenseFilterOptions,
    disciplines: disciplineFilterOptions,
    degrees: degreeFilterOptions,
    visibleKeys,
  });
  const draftCount = filterServiceExperts(experts, draft, {
    skills: definition.skills,
    experienceBands: definition.experienceBands,
    tabs: definition.tabs,
    visibleKeys: getVisibleFilterKeys(
      definition.keys,
      definition.tabs,
      draft.tab,
    ),
  }).length;

  function replaceQuery(filters: ServiceFilterValues, page: number) {
    const params = serializeServiceFilterParams(filters, page, defaultTab);
    const serialized = params.toString();
    router.replace(serialized === "" ? pathname : `${pathname}?${serialized}`, {
      scroll: false,
    });
  }

  function openOverlay() {
    setDraft({
      city: applied.city,
      skill: applied.skill,
      experience: applied.experience,
      license: applied.license,
      discipline: applied.discipline,
      degree: applied.degree,
      tab: applied.tab,
    });
    setOverlayOpen(true);
  }

  return {
    definition,
    applied,
    draft,
    overlayOpen,
    overlayKeys,
    visibleKeys,
    filteredExperts,
    pagination,
    activeChips,
    draftCount,
    hasFilters: hasActiveServiceFilters(applied, defaultTab),
    pathname,
    query: searchParams.toString(),
    setOverlayOpen,
    openOverlay,
    setDraftValue: (key: FilterKey, value: string) => {
      setDraft((current) => ({ ...current, [key]: value }));
    },
    changeCity: (city: string) => {
      setOverlayOpen(false);
      replaceQuery({ ...applied, city }, 1);
    },
    changeTab: (tab: string) => {
      setOverlayOpen(false);
      replaceQuery(withTabFilters(applied, tab, definition.tabs), 1);
    },
    clearChip: (key: FilterKey) => {
      replaceQuery({ ...applied, [key]: ALL_FILTER }, 1);
    },
    applyDraft: () => {
      replaceQuery(draft, 1);
      setOverlayOpen(false);
    },
    reset: () => {
      replaceQuery(createEmptyFilters(defaultTab), 1);
      setDraft(createEmptyFilters(defaultTab));
      setOverlayOpen(false);
    },
  };
}
