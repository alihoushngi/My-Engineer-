"use client";

import { useMemo, useState } from "react";
import { EngineerRequestRow } from "@/components/store/engineer/engineerRequestRow/engineerRequestRow";
import { Empty } from "@/components/ui/empty/empty";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
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
  const [filter, setFilter] = useState<FilterId>("all");
  const items = useMemo(() => {
    if (filter === "all") return requests;
    if (filter === "new")
      return requests.filter((item) => item.status === "new");
    return requests.filter((item) => item.status === filter);
  }, [filter, requests]);

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="فیلتر درخواست‌ها"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "min-h-11 rounded-full px-3 type-caption font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-foreground hover:bg-surface-subtle",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyRequests} />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
          {items.map((request) => (
            <li key={request.id}>
              <EngineerRequestRow request={request} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
