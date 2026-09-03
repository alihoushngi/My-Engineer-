import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ExpertProfileLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-8 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-48 max-w-full" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Skeleton className="size-24 rounded-full sm:size-28" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-10 w-56 max-w-full" />
          <Skeleton className="h-6 w-40 max-w-full" />
          <Skeleton className="h-16 w-full max-w-xl" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
      <Skeleton className="h-32 w-full" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </div>
  );
}
