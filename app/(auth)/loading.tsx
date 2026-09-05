import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function AuthLoading() {
  return (
    <div
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-lg bg-surface p-6"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="mx-auto h-8 w-40" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
