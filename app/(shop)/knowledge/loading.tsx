import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function KnowledgeLoading() {
  return (
    <div
      className="container-app flex flex-col gap-8 py-8 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-32 max-w-full" />
      <Skeleton className="h-10 w-40 max-w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}
