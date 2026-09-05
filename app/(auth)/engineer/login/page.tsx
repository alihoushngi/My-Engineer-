import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { EngineerLoginForm } from "@/components/store/engineerLogin/engineerLoginForm/engineerLoginForm";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { isMockLoginEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";

export const metadata: Metadata = {
  title: engineerLoginCopy.title,
  robots: {
    index: false,
    follow: false,
  },
};

type EngineerLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function EngineerLoginPage({
  searchParams,
}: EngineerLoginPageProps) {
  const session = await getEngineerSession();

  if (session) {
    redirect(engineerPanelPaths.dashboard);
  }

  const params = await searchParams;
  const nextPath = getSafeEngineerNext(params.next);

  return (
    <EngineerLoginForm nextPath={nextPath} isMockMode={isMockLoginEnabled()} />
  );
}
