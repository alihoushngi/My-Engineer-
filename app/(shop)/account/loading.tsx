import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

export default function AccountLoading() {
  return (
    <div
      className="container-narrow space-y-6 py-page"
      aria-busy="true"
      aria-live="polite"
      aria-label={userAuthCopy.checkingTitle}
    >
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
