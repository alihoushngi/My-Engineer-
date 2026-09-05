"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerRequestRow } from "@/components/store/engineer/engineerRequestRow/engineerRequestRow";
import { Empty } from "@/components/ui/empty/empty";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { type EngineerRequest } from "@/types/store/engineer.types";
import { cn } from "@/lib/utils/cn/cn";

type FilterId = "all" | "new" | "in_review" | "closed";

const FILTERS: readonly { id: FilterId; label: string }[] = [
  { id: "all", label: engineerPanelCopy.filterAll },
  { id: "new", label: engineerPanelCopy.filterNew },
  { id: "in_review", label: engineerPanelCopy.filterInReview },
  { id: "closed", label: engineerPanelCopy.filterClosed },
];

type EngineerRequestListProps = {
  requests: readonly EngineerRequest[];
};

export function EngineerRequestList({ requests }: EngineerRequestListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = parseFilter(searchParams.get("status"));
  const items = useMemo(() => {
    if (filter === "all") return requests;
    if (filter === "new")
      return requests.filter((item) => item.status === "new");
    return requests.filter((item) => item.status === filter);
  }, [filter, requests]);
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
        <Empty title={engineerPanelCopy.emptyRequests} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
            {pagination.items.map((request) => (
              <li key={request.id}>
                <EngineerRequestRow request={request} />
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
            query={searchParams.toString()}
          />
        </>
      )}
    </div>
  );
}

function parseFilter(value: string | null): FilterId {
  if (value === "new" || value === "in_review" || value === "closed") {
    return value;
  }

  return "all";
}

function filterHref(pathname: string, id: FilterId): string {
  if (id === "all") {
    return pathname;
  }

  return `${pathname}?status=${id}`;
}
