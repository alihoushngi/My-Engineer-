import {
  MOCK_MARKETPLACE_CUSTOMER_ID,
  mockServiceRequests,
} from "@/lib/mock-data/service-request-mock-data";
import { type ServiceReview } from "@/types/store/review.types";

const closedKaraj = mockServiceRequests.find(
  (item) => item.id === "req-closed-karaj",
);

export const mockServiceReviews: readonly ServiceReview[] = [
  {
    id: "rev-req-closed-karaj",
    expertId: "amirhossein-rostami",
    expertName: "امیرحسین رستمی",
    authorCustomerId: MOCK_MARKETPLACE_CUSTOMER_ID,
    authorDisplayName: "سارا مشتری",
    relatedRequestId: "req-closed-karaj",
    relatedServiceLabel: closedKaraj?.serviceLabel ?? "نقشه برداری",
    rating: 5,
    text: "خروجی نقشه دقیق بود و هماهنگی بازدید به‌موقع انجام شد.",
    dateLabel: "ماه گذشته",
    createdAtMs: 1_700_000_100_000,
  },
];
