import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";

export function AccountPanelLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">{userAccountCopy.loadingLabel}</span>
      <Skeleton className="h-10 w-48 max-w-full" />
      <Skeleton className="h-16 w-full max-w-xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}
