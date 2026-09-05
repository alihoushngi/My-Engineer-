import { type ReactNode } from "react";
import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { AccountMobileNavigation } from "@/components/layout/accountMobileNavigation/accountMobileNavigation";
import { AccountSidebar } from "@/components/layout/accountSidebar/accountSidebar";
import { AccountTopbar } from "@/components/layout/accountTopbar/accountTopbar";
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
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 px-4 py-6 outline-none pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-6 lg:pb-8"
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      <AccountMobileNavigation />
    </div>
  );
}
