"use server";

import { revalidatePath } from "next/cache";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { reviewsCopy } from "@/config/reviews.config/reviews.config";
import {
  mutationFailed,
  mutationUnauthorized,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { readCreatedRequests } from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import { applyCreateNotification } from "@/lib/notifications/notification-store/notification-store";
import {
  readNotificationOverlay,
  writeNotificationOverlay,
} from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { canCustomerReviewRequest } from "@/lib/reviews/review-eligibility/review-eligibility";
import {
  readReviewCatalog,
  readReviewOverlay,
  writeReviewOverlay,
} from "@/lib/reviews/mock-review-overlay/mock-review-overlay";
import { applyCreateReview } from "@/lib/reviews/review-store/review-store";
import { type AppNotification } from "@/types/store/notification.types";
import { type ServiceReview } from "@/types/store/review.types";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 2000;

export async function submitReviewAction(input: {
  requestId: string;
  rating: number;
  body: string;
}): Promise<ServiceMutationResult & { reviewId?: string }> {
  if (!isMockUserAuthEnabled()) {
    return mutationUnavailable(reviewsCopy.submitUnavailable);
  }

  const session = await getUserSession();

  if (!session) {
    return mutationUnauthorized(reviewsCopy.submitUnauthorized);
  }

  const rating = input.rating;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return mutationFailed(reviewsCopy.ratingRequired);
  }

  const text = input.body.trim();

  if (text.length < MIN_COMMENT_LENGTH) {
    return mutationFailed(reviewsCopy.commentMinError);
  }

  if (text.length > MAX_COMMENT_LENGTH) {
    return mutationFailed(reviewsCopy.commentMaxError);
  }

  const requests = [...(await readCreatedRequests()), ...mockServiceRequests];
  const request = requests.find((item) => item.id === input.requestId.trim());
  const reviews = await readReviewCatalog();

  if (
    !request ||
    !canCustomerReviewRequest({
      request,
      customerId: mockCurrentUser.id,
      reviews,
    })
  ) {
    return mutationFailed(reviewsCopy.submitIneligible);
  }

  const review: ServiceReview = {
    id: `rev-${request.id}`,
    expertId: request.expertId,
    expertName: request.expertName,
    authorCustomerId: mockCurrentUser.id,
    authorDisplayName:
      session.profile?.displayName ?? mockCurrentUser.displayName,
    relatedRequestId: request.id,
    relatedServiceLabel: request.serviceLabel,
    rating,
    text,
    dateLabel: "همین الان",
    createdAtMs: Date.now(),
  };

  await writeReviewOverlay(
    applyCreateReview(await readReviewOverlay(), review),
  );

  let notifications = await readNotificationOverlay();
  notifications = applyCreateNotification(
    notifications,
    engineerReviewNotification(review),
  );
  notifications = applyCreateNotification(
    notifications,
    userReviewNotification(review),
  );
  await writeNotificationOverlay(notifications);

  revalidateReviewSurfaces(review);
  return { ok: true, reviewId: review.id };
}

function engineerReviewNotification(review: ServiceReview): AppNotification {
  return {
    id: `ntf-review-${review.id}`,
    recipientRole: "engineer",
    recipientId: review.expertId,
    kind: "review",
    title: "نظر جدید",
    body: `${review.authorDisplayName} برای ${review.relatedServiceLabel} نظر ثبت کرده است.`,
    createdAtLabel: "همین الان",
    createdAtMs: review.createdAtMs,
    isRead: false,
    href: `${engineerPanelPaths.reviews}/${review.id}`,
  };
}

function userReviewNotification(review: ServiceReview): AppNotification {
  return {
    id: `user-ntf-review-${review.id}`,
    recipientRole: "user",
    recipientId: review.authorCustomerId,
    kind: "review",
    title: "نظر شما ثبت شد",
    body: `نظر ثبت‌شده برای ${review.expertName} در حساب شما نمایش داده می‌شود.`,
    createdAtLabel: "همین الان",
    createdAtMs: review.createdAtMs,
    isRead: false,
    href: `${userAccountPaths.reviews}/${review.id}`,
  };
}

function revalidateReviewSurfaces(review: ServiceReview): void {
  revalidatePath("/account");
  revalidatePath(userAccountPaths.reviews);
  revalidatePath(`${userAccountPaths.reviews}/${review.id}`);
  revalidatePath(userAccountPaths.notifications);
  revalidatePath(`${userAccountPaths.requests}/${review.relatedRequestId}`);
  revalidatePath("/engineer");
  revalidatePath(engineerPanelPaths.reviews);
  revalidatePath(`${engineerPanelPaths.reviews}/${review.id}`);
  revalidatePath(engineerPanelPaths.notifications);
  revalidatePath(`/experts/${review.expertId}`);
}
