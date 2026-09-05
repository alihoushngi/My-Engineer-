/**
 * FAQ catalog access.
 * API CONTRACT REQUIRED. Employer surveying FAQ text is not in this repository.
 * Do not invent questions for missing categories.
 */
import {
  type FaqCategory,
  type FaqCategoryDetail,
} from "@/types/store/faq.types";
import { env } from "@/lib/env/env";
import { mockFaqCategories } from "@/lib/mock-data/mock-data";

export async function listFaqCategories(): Promise<readonly FaqCategory[]> {
  return env.useMockData ? mockFaqCategories : [];
}

export async function getFaqCategory(
  _slug: string,
): Promise<FaqCategoryDetail | null> {
  if (!env.useMockData) return null;
  const category = mockFaqCategories.find((item) => item.slug === _slug);
  if (!category) return null;
  return {
    ...category,
    relatedCategories: mockFaqCategories
      .filter((item) => item.slug !== _slug)
      .slice(0, 3),
  };
}
