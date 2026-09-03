"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getProvinces,
  getCitiesByProvince,
} from "@/services/city-service/city-service";
import { type Province, type City } from "@/types/store/registration.types";

type UseProvinceCitiesReturn = {
  provinces: readonly Province[];
  cities: readonly City[];
  isLoadingProvinces: boolean;
  isLoadingCities: boolean;
  provinceError: string | null;
  cityError: string | null;
  retryProvinces: () => void;
  retryCities: () => void;
  selectedProvinceId: string;
  setSelectedProvince: (provinceId: string) => void;
};

export function useProvinceCities(): UseProvinceCitiesReturn {
  const [provinces, setProvinces] = useState<readonly Province[]>([]);
  const [cities, setCities] = useState<readonly City[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [provinceError, setProvinceError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [provinceTrigger, setProvinceTrigger] = useState(0);
  const [cityTrigger, setCityTrigger] = useState(0);

  const retryProvinces = useCallback(() => {
    setProvinceTrigger((prev) => prev + 1);
  }, []);

  const retryCities = useCallback(() => {
    setCityTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!cancelled) {
        setIsLoadingProvinces(true);
        setProvinceError(null);
      }

      try {
        const result = await getProvinces();

        if (!cancelled) {
          setProvinces(result);
          setIsLoadingProvinces(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setProvinceError(
            err instanceof Error ? err.message : "خطا در بارگذاری استان‌ها",
          );
          setIsLoadingProvinces(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [provinceTrigger]);

  useEffect(() => {
    if (!selectedProvinceId) {
      return;
    }

    let cancelled = false;

    async function load() {
      if (!cancelled) {
        setIsLoadingCities(true);
        setCityError(null);
        setCities([]);
      }

      try {
        const result = await getCitiesByProvince(selectedProvinceId);

        if (!cancelled) {
          setCities(result);
          setIsLoadingCities(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setCityError(
            err instanceof Error ? err.message : "خطا در بارگذاری شهرها",
          );
          setIsLoadingCities(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [selectedProvinceId, cityTrigger]);

  const setSelectedProvince = useCallback((provinceId: string) => {
    setSelectedProvinceId(provinceId);
    // Clearing cities happens in the city effect when selectedProvinceId changes
  }, []);

  return {
    provinces,
    cities,
    isLoadingProvinces,
    isLoadingCities,
    provinceError,
    cityError,
    retryProvinces,
    retryCities,
    selectedProvinceId,
    setSelectedProvince,
  };
}
