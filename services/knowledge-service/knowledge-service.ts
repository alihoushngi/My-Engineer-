/**
 * Knowledge catalog access.
 * API CONTRACT REQUIRED. Do not invent tips, taxonomies, or counts.
 */
import {
  type KnowledgeCategory,
  type KnowledgeCategoryDetail,
} from "@/types/store/knowledge.types";

export async function listKnowledgeCategories(): Promise<
  readonly KnowledgeCategory[]
> {
  return [];
}

export async function getKnowledgeCategory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _slug: string,
): Promise<KnowledgeCategoryDetail | null> {
  return null;
}
