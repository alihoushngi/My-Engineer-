import { type ReactNode } from "react";
import { EngineerPanelShell } from "@/components/layout/engineerPanelShell/engineerPanelShell";
import { EngineerUnauthorized } from "@/components/layout/engineerUnauthorized/engineerUnauthorized";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import {
  isEngineerAccessGranted,
  toEngineerShellData,
} from "@/lib/engineer/access/access";
import { getEngineerAccess } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata("فضای کاری متخصص");

type EngineerLayoutProps = {
  children: ReactNode;
};

export default async function EngineerLayout({
  children,
}: EngineerLayoutProps) {
  const access = await getEngineerAccess();

  if (!isEngineerAccessGranted(access)) {
    return <EngineerUnauthorized access={access} />;
  }

  return (
    <EngineerPanelShell shell={toEngineerShellData(access)}>
      {children}
    </EngineerPanelShell>
  );
}
