import { notFound } from "next/navigation";
import { UserReviewDetailPage } from "@/components/store/userAccount/userReviewDetailPage/userReviewDetailPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import {
  getUserReview,
  getUserWorkspace,
} from "@/services/user-account-service/user-account-service";

type AccountReviewDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = userAccountMetadata(userAccountPageTitles.reviewDetail);
export const dynamic = "force-dynamic";

export default async function AccountReviewDetailRoute({
  params,
}: AccountReviewDetailRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const review = await getUserReview(id);

  if (!review) {
    notFound();
  }

  return <UserReviewDetailPage review={review} />;
}
