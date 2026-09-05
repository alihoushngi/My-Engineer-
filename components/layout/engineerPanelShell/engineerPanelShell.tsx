import { type ReactNode } from "react";
import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { EngineerMobileNavigation } from "@/components/layout/engineerMobileNavigation/engineerMobileNavigation";
import { EngineerSidebar } from "@/components/layout/engineerSidebar/engineerSidebar";
import { EngineerStatusBanner } from "@/components/layout/engineerStatusBanner/engineerStatusBanner";
import { EngineerTopbar } from "@/components/layout/engineerTopbar/engineerTopbar";
import { PanelWorkspaceFrame } from "@/components/layout/panelWorkspaceFrame/panelWorkspaceFrame";
import { type EngineerShellData } from "@/types/store/engineer.types";

type EngineerPanelShellProps = {
  shell: EngineerShellData;
  children: ReactNode;
};

export function EngineerPanelShell({
  shell,
  children,
}: EngineerPanelShellProps) {
  return (
    <div className="min-h-dvh bg-background-subtle">
      <SkipLink />
      <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:grid-rows-[minmax(100dvh,auto)] lg:items-stretch">
        <EngineerSidebar />
        <div className="flex min-h-0 min-w-0 flex-col lg:min-h-full">
          <EngineerTopbar shell={shell} />
          <PanelWorkspaceFrame
            panel="engineer"
            maxWidthClass="max-w-6xl"
            banner={<EngineerStatusBanner shell={shell} />}
            navigation={<EngineerMobileNavigation />}
          >
            {children}
          </PanelWorkspaceFrame>
        </div>
      </div>
    </div>
  );
}
