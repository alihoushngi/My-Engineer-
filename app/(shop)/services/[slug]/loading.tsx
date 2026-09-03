import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ServiceDiscoveryLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-48 max-w-full" />
      <div className="max-w-2xl space-y-3">
        <Skeleton className="h-10 w-56 max-w-full" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </div>
  );
}
