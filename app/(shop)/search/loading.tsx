import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function SearchLoading() {
  return (
    <div
      className="container-wide flex flex-col gap-8 py-8 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-40 max-w-full" />
      <div className="max-w-2xl space-y-3">
        <Skeleton className="h-10 w-64 max-w-full" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <Skeleton className="h-11 min-w-0 flex-1" />
        <Skeleton className="h-11 w-full lg:w-40" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}
