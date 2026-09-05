import { UserReviewsPage } from "@/components/store/userAccount/userReviewsPage/userReviewsPage";
import {
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.reviews);

type AccountReviewsRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function AccountReviewsRoute({
  searchParams,
}: AccountReviewsRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.reviews,
    parsePageParam((await searchParams).page),
  );

  return (
    <UserReviewsPage
      reviews={pagination.items}
      pagination={pagination}
      pathname={userAccountPaths.reviews}
    />
  );
}
