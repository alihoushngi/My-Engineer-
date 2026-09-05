import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

export function EngineerPanelLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">{engineerPanelCopy.loadingLabel}</span>
      <Skeleton className="h-10 w-48 max-w-full" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="h-56" />
    </div>
  );
}
