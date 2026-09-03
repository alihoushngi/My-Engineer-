import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function FaqCategoryLoading() {
  return (
    <div
      className="container-narrow flex flex-col gap-6 py-8 sm:py-12"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-48 max-w-full" />
      <Skeleton className="h-10 w-56 max-w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}
