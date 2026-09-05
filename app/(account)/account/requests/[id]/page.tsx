import { notFound } from "next/navigation";
import { UserRequestDetailPage } from "@/components/store/userAccount/userRequestDetailPage/userRequestDetailPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import {
  getUserRequest,
  getUserWorkspace,
} from "@/services/user-account-service/user-account-service";

type AccountRequestDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = userAccountMetadata(
  userAccountPageTitles.requestDetail,
);
export const dynamic = "force-dynamic";

export default async function AccountRequestDetailRoute({
  params,
}: AccountRequestDetailRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const request = await getUserRequest(id);

  if (!request) {
    notFound();
  }

  return <UserRequestDetailPage request={request} />;
}
