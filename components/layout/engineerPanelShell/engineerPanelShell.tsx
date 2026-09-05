import { type ReactNode } from "react";
import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { EngineerMobileNavigation } from "@/components/layout/engineerMobileNavigation/engineerMobileNavigation";
import { EngineerSidebar } from "@/components/layout/engineerSidebar/engineerSidebar";
import { EngineerStatusBanner } from "@/components/layout/engineerStatusBanner/engineerStatusBanner";
import { EngineerTopbar } from "@/components/layout/engineerTopbar/engineerTopbar";
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
      <div className="lg:flex">
        <EngineerSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <EngineerTopbar shell={shell} />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 px-4 py-6 outline-none pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-6 lg:pb-8"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
              <EngineerStatusBanner shell={shell} />
              {children}
            </div>
          </main>
        </div>
      </div>
      <EngineerMobileNavigation />
    </div>
  );
}
