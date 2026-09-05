"use client";

import { useMemo, useState } from "react";
import { type ServiceSlug } from "@/config/services.config/services.config";
import { HOME_DISCOVERY_PAGE_SIZE } from "@/config/home.config/home.config";
import { paginateItems } from "@/lib/home/paginate-items/paginate-items";
import { type ExpertCardData } from "@/types/store/expert.types";

export function useHomeMarketplace(experts: readonly ExpertCardData[]) {
  const [services, setServices] = useState<readonly ServiceSlug[]>([]);
  const [city, setCity] = useState("all");
  const [expertise, setExpertise] = useState("all");
  const [page, setPage] = useState(1);

  const expertiseOptions = useMemo(
    () => [...new Set(experts.flatMap((expert) => expert.specialties ?? []))],
    [experts],
  );

  const filteredExperts = useMemo(
    () =>
      experts.filter((expert) => {
        const serviceMatch =
          services.length === 0 ||
          services.some((slug) => expert.serviceSlugs?.includes(slug));
        const cityMatch = city === "all" || expert.city === city;
        const expertiseMatch =
          expertise === "all" || expert.specialties?.includes(expertise);
        return serviceMatch && cityMatch && expertiseMatch;
      }),
    [city, expertise, experts, services],
  );

  const pagination = paginateItems(
    filteredExperts,
    page,
    HOME_DISCOVERY_PAGE_SIZE,
  );
  const hasFilters =
    services.length > 0 || city !== "all" || expertise !== "all";

  function resetPage() {
    setPage(1);
  }

  function toggleService(slug: ServiceSlug) {
    resetPage();
    setServices((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  function changeCity(value: string) {
    resetPage();
    setCity(value);
  }

  function changeExpertise(value: string) {
    resetPage();
    setExpertise(value);
  }

  function reset() {
    setServices([]);
    setCity("all");
    setExpertise("all");
    setPage(1);
  }

  return {
    services,
    city,
    expertise,
    expertiseOptions,
    filteredExperts,
    pagination,
    hasFilters,
    toggleService,
    changeCity,
    changeExpertise,
    changePage: setPage,
    reset,
  };
}
