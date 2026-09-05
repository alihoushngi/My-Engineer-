import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ServiceDiscoveryLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-5 w-48 max-w-full" />
      <div className="max-w-2xl space-y-3">
        <Skeleton className="h-10 w-56 max-w-full" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <Skeleton className="h-12" />
          <Skeleton className="h-72" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-20" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </div>
  );
}
