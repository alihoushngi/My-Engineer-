import { type EngineerReview } from "@/types/store/engineer.types";

export function findEngineerReview(
  reviews: readonly EngineerReview[],
  id: string,
): EngineerReview | null {
  return reviews.find((review) => review.id === id) ?? null;
}
