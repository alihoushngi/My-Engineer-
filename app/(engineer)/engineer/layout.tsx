import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { EngineerPanelShell } from "@/components/layout/engineerPanelShell/engineerPanelShell";
import { EngineerUnauthorized } from "@/components/layout/engineerUnauthorized/engineerUnauthorized";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import {
  isEngineerAccessGranted,
  toEngineerShellData,
} from "@/lib/engineer/access/access";
import { getEngineerAccess } from "@/services/engineer-service/engineer-access-service";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";

export const metadata = engineerPageMetadata("فضای کاری متخصص");

type EngineerLayoutProps = {
  children: ReactNode;
};

export default async function EngineerLayout({
  children,
}: EngineerLayoutProps) {
  const access = await getEngineerAccess();

  if (access.kind === "unauthenticated") {
    redirect(engineerPanelPaths.login);
  }

  if (!isEngineerAccessGranted(access)) {
    return <EngineerUnauthorized access={access} />;
  }

  return (
    <EngineerPanelShell shell={toEngineerShellData(access)}>
      {children}
    </EngineerPanelShell>
  );
}
