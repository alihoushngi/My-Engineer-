import { type ExpertProfile } from "@/types/store/expert.types";
import { getDevExpertPreview } from "@/lib/experts/dev-expert-preview/dev-expert-preview";
import { env } from "@/lib/env/env";
import { mockExperts } from "@/lib/mock-data/mock-data";

/**
 * Public expert profile access.
 * API CONTRACT REQUIRED: no documented GET expert-by-id endpoint exists.
 * Do not call invented URLs from this module.
 *
 * The development preview is a local layout fixture, not an API response.
 */
export async function getExpertProfile(
  id: string,
): Promise<ExpertProfile | null> {
  if (env.useMockData) {
    return mockExperts.find((expert) => expert.id === id) ?? null;
  }

  if (process.env.NODE_ENV !== "production") {
    return getDevExpertPreview(id);
  }

  return null;
}
