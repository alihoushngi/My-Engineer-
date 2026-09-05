import { type ServiceSlug } from "@/config/services.config/services.config";
import { env } from "@/lib/env/env";
import { flattenKnowledgeTips } from "@/lib/home/flatten-knowledge-tips/flatten-knowledge-tips";
import {
  mockCities,
  mockDrawingServices,
  mockExpertCards,
  mockFaqCategories,
  mockHomePopularServices,
  mockKnowledgeCategories,
  mockServiceDetails,
} from "@/lib/mock-data/mock-data";
import { type HomeCatalogData } from "@/types/store/home.types";
import { type City } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

const emptyHomeCatalog: HomeCatalogData = {
  experts: [],
  cities: [],
  popularServices: [],
  drawingServices: [],
  faqCategories: [],
  knowledgeTips: [],
};

export type { HomeCatalogData };

export async function getHomeCatalog(): Promise<HomeCatalogData> {
  if (!env.useMockData) {
    return emptyHomeCatalog;
  }

  return {
    experts: mockExpertCards,
    cities: mockCities,
    popularServices: mockHomePopularServices,
    drawingServices: mockDrawingServices,
    faqCategories: mockFaqCategories,
    knowledgeTips: flattenKnowledgeTips(mockKnowledgeCategories),
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

export async function listCatalogCities(): Promise<readonly City[]> {
  if (!env.useMockData) {
    return [];
  }

  return mockCities;
}
