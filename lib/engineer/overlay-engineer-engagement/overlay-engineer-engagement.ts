import { engineerNotificationViews } from "@/lib/notifications/notification-projections/notification-projections";
import { mergePublicReviews } from "@/lib/reviews/review-projections/review-projections";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { type AppNotification } from "@/types/store/notification.types";
import { type ServiceReview } from "@/types/store/review.types";

export function overlayEngineerReviews(
  workspace: EngineerWorkspace,
  reviews: readonly ServiceReview[],
): EngineerWorkspace {
  const merged = mergePublicReviews(
    workspace.reviews,
    reviews,
    workspace.account.publicExpertId,
  );

  if (merged === workspace.reviews) {
    return workspace;
  }

  return { ...workspace, reviews: merged };
}

export function overlayEngineerNotifications(
  workspace: EngineerWorkspace,
  notifications: readonly AppNotification[],
): EngineerWorkspace {
  return {
    ...workspace,
    notifications: engineerNotificationViews(notifications),
  };
}
