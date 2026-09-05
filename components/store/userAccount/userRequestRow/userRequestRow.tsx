import Link from "next/link";
import { UserRequestStatusBadge } from "@/components/store/userAccount/userRequestStatusBadge/userRequestStatusBadge";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type UserRequest } from "@/types/store/user-account.types";

type UserRequestRowProps = {
  request: UserRequest;
};

export function UserRequestRow({ request }: UserRequestRowProps) {
  return (
    <Link
      href={`${userAccountPaths.requests}/${request.id}`}
      className="flex min-h-14 flex-col gap-2 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 space-y-1">
        <p className="type-body font-medium text-foreground">{request.title}</p>
        <p className="type-body-sm text-muted-foreground">{request.summary}</p>
        <p className="type-caption text-muted-foreground">
          {[
            request.serviceLabel,
            request.expertName,
            request.city,
            request.latestActivityLabel ?? request.createdAtLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <UserRequestStatusBadge status={request.status} />
      </div>
    </Link>
  );
}
