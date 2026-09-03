import { type ExpertProfile } from "@/types/store/expert.types";
import { getDevExpertPreview } from "@/lib/experts/dev-expert-preview/dev-expert-preview";

/**
 * Public expert profile access.
 * API CONTRACT REQUIRED: no documented GET expert-by-id endpoint exists.
 * Do not call invented URLs from this module.
 */
export async function getExpertProfile(
  id: string,
): Promise<ExpertProfile | null> {
  if (process.env.NODE_ENV !== "production") {
    return getDevExpertPreview(id);
  }

  return null;
}
