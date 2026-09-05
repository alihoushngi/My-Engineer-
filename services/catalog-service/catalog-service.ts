import { type ServiceSlug } from "@/config/services.config/services.config";
import { env } from "@/lib/env/env";
import {
  mockCities,
  mockDrawingServices,
  mockExpertCards,
  mockHomePopularServices,
  mockServiceDetails,
} from "@/lib/mock-data/mock-data";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

export type HomeCatalogData = {
  experts: readonly ExpertCardData[];
  cities: readonly City[];
  popularServices: readonly (typeof mockHomePopularServices)[number][];
  drawingServices: readonly (typeof mockDrawingServices)[number][];
};

export async function getHomeCatalog(): Promise<HomeCatalogData> {
  if (!env.useMockData) {
    return {
      experts: [],
      cities: [],
      popularServices: [],
      drawingServices: [],
    };
  }

  return {
    experts: mockExpertCards,
    cities: mockCities,
    popularServices: mockHomePopularServices,
    drawingServices: mockDrawingServices,
  };
}

export async function getServiceDetail(
  slug: ServiceSlug,
): Promise<ServiceDetailData | null> {
  if (!env.useMockData) {
    return null;
  }

  return mockServiceDetails.find((service) => service.slug === slug) ?? null;
}
