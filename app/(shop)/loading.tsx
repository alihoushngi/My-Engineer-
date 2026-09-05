import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ShopLoading() {
  return (
    <div
      className="container-app flex flex-col gap-6 py-section"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-10 w-48 max-w-full" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </div>
  );
}
