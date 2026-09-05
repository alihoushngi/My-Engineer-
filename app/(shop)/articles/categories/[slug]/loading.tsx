import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ArticleCategoryLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-5 w-56 max-w-full" />
      <Skeleton className="h-10 w-48 max-w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}
