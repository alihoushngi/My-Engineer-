import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { UserLoginForm } from "@/components/store/userLogin/userLoginForm/userLoginForm";
import { isMockUserLoginEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";

export const metadata: Metadata = {
  title: userAuthCopy.loginTitle,
  robots: {
    index: false,
    follow: false,
  },
};

type UserLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function UserLoginPage({
  searchParams,
}: UserLoginPageProps) {
  const session = await getUserSession();
  const params = await searchParams;
  const nextPath = getSafeUserNext(params.next);

  if (session) {
    redirect(nextPath);
  }

  return (
    <UserLoginForm nextPath={nextPath} isMockMode={isMockUserLoginEnabled()} />
  );
}
