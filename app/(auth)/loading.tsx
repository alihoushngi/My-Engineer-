import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function AuthLoading() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
      <Skeleton className="mx-auto h-8 w-40" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
