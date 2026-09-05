/**
 * Knowledge catalog access.
 * API CONTRACT REQUIRED. Do not invent tips, taxonomies, or counts.
 */
import {
  type KnowledgeCategory,
  type KnowledgeCategoryDetail,
} from "@/types/store/knowledge.types";
import { env } from "@/lib/env/env";
import { mockKnowledgeCategories } from "@/lib/mock-data/mock-data";

export async function listKnowledgeCategories(): Promise<
  readonly KnowledgeCategory[]
> {
  return env.useMockData ? mockKnowledgeCategories : [];
}

export async function getKnowledgeCategory(
  _slug: string,
): Promise<KnowledgeCategoryDetail | null> {
  if (!env.useMockData) return null;
  return (
    mockKnowledgeCategories.find((category) => category.slug === _slug) ?? null
  );
}
