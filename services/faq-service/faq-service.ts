/**
 * FAQ catalog access.
 * API CONTRACT REQUIRED. Employer surveying FAQ text is not in this repository.
 * Do not invent questions for missing categories.
 */
import {
  type FaqCategory,
  type FaqCategoryDetail,
} from "@/types/store/faq.types";

export async function listFaqCategories(): Promise<readonly FaqCategory[]> {
  return [];
}

export async function getFaqCategory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _slug: string,
): Promise<FaqCategoryDetail | null> {
  return null;
}
