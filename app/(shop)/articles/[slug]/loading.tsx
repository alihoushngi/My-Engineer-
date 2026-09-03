import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ArticleDetailLoading() {
  return (
    <div
      className="container-narrow flex flex-col gap-6 py-page"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-48 max-w-full" />
      <Skeleton className="h-10 w-full max-w-lg" />
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
