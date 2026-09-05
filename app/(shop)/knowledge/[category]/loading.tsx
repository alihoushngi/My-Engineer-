import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function KnowledgeCategoryLoading() {
  return (
    <div
      className="container-app flex flex-col gap-6 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">در حال بارگذاری…</span>
      <Skeleton className="h-5 w-48 max-w-full" />
      <Skeleton className="h-10 w-56 max-w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
