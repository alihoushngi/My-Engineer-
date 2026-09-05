"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/common/pagination/pagination";
import { UserRequestRow } from "@/components/store/userAccount/userRequestRow/userRequestRow";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  filterRequestsByStatus,
  parseUserRequestFilter,
  type UserRequestFilterId,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";
import { type UserRequest } from "@/types/store/user-account.types";
import { cn } from "@/lib/utils/cn/cn";

const FILTERS: readonly { id: UserRequestFilterId; label: string }[] = [
  { id: "all", label: userAccountCopy.filterAll },
  { id: "sent", label: userAccountCopy.filterSent },
  { id: "in_review", label: userAccountCopy.filterInReview },
  { id: "closed", label: userAccountCopy.filterClosed },
];

type UserRequestListProps = {
  requests: readonly UserRequest[];
};

export function UserRequestList({ requests }: UserRequestListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = parseUserRequestFilter(searchParams.get("status"));
  const items = useMemo(
    () => filterRequestsByStatus(requests, filter),
    [filter, requests],
  );
  const pagination = paginateItems(
    items,
    parsePageParam(searchParams.get("page")),
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="فیلتر درخواست‌ها"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((item) => (
          <Link
            key={item.id}
            href={filterHref(pathname, item.id)}
            scroll={false}
            role="tab"
            aria-selected={filter === item.id}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-3 type-caption font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-foreground hover:bg-surface-subtle",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {pagination.total === 0 ? (
        <Empty
          title={userAccountCopy.emptyRequests}
          description={userAccountCopy.emptyRequestsHint}
          action={
            <Button asChild>
              <Link href={siteConfig.homeHref}>
                {userAccountCopy.findExpert}
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
            {pagination.items.map((request) => (
              <li key={request.id}>
                <UserRequestRow request={request} />
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
            query={searchParams.toString()}
          />
        </>
      )}
    </div>
  );
}

function filterHref(pathname: string, id: UserRequestFilterId): string {
  if (id === "all") {
    return pathname;
  }

  return `${pathname}?status=${id}`;
}
