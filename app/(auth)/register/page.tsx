import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { UserRegisterForm } from "@/components/store/userRegister/userRegisterForm/userRegisterForm";
import { isMockUserRegisterEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";

export const metadata: Metadata = {
  title: userAuthCopy.registerTitle,
  robots: {
    index: false,
    follow: false,
  },
};

type UserRegisterPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function UserRegisterPage({
  searchParams,
}: UserRegisterPageProps) {
  const session = await getUserSession();
  const params = await searchParams;
  const nextPath = getSafeUserNext(params.next);

  if (session) {
    redirect(nextPath);
  }

  return (
    <UserRegisterForm
      nextPath={nextPath}
      isMockMode={isMockUserRegisterEnabled()}
    />
  );
}
