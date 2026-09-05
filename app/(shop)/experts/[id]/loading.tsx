import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ExpertProfileLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-5 w-48 max-w-full" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Skeleton className="size-24 rounded-lg sm:size-28" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-10 w-56 max-w-full" />
          <Skeleton className="h-6 w-40 max-w-full" />
          <Skeleton className="h-16 w-full max-w-xl" />
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
