import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function FaqLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-5 w-40 max-w-full" />
      <Skeleton className="h-10 w-56 max-w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}
