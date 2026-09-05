import { type ReactNode } from "react";
import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { AccountMobileNavigation } from "@/components/layout/accountMobileNavigation/accountMobileNavigation";
import { AccountSidebar } from "@/components/layout/accountSidebar/accountSidebar";
import { AccountTopbar } from "@/components/layout/accountTopbar/accountTopbar";
import { PanelWorkspaceFrame } from "@/components/layout/panelWorkspaceFrame/panelWorkspaceFrame";
import { type UserShellData } from "@/types/store/user-account.types";

type AccountPanelShellProps = {
  shell: UserShellData;
  children: ReactNode;
};

export function AccountPanelShell({ shell, children }: AccountPanelShellProps) {
  return (
    <div className="min-h-dvh bg-background-subtle">
      <SkipLink />
      <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:grid-rows-[minmax(100dvh,auto)] lg:items-stretch">
        <AccountSidebar />
        <div className="flex min-h-0 min-w-0 flex-col lg:min-h-full">
          <AccountTopbar shell={shell} />
          <PanelWorkspaceFrame
            panel="account"
            maxWidthClass="max-w-5xl"
            navigation={<AccountMobileNavigation />}
          >
            {children}
          </PanelWorkspaceFrame>
        </div>
      </div>
    </div>
  );
}
