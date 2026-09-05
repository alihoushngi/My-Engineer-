"use client";

import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import {
  type ActiveFilterChip,
  type FilterKey,
} from "@/lib/service/filter-experts/filter-experts";

type ServiceActiveFiltersProps = {
  chips: readonly ActiveFilterChip[];
  onClear: (key: FilterKey) => void;
  onReset: () => void;
};

export function ServiceActiveFilters({
  chips,
  onClear,
  onReset,
}: ServiceActiveFiltersProps) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Badge
          key={chip.key}
          variant="outline"
          className="max-w-full gap-1 pe-1"
        >
          <span className="min-w-0 truncate">{chip.label}</span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`حذف فیلتر ${chip.label}`}
            onClick={() => {
              onClear(chip.key);
            }}
          >
            <XIcon aria-hidden="true" className="size-3.5" />
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={onReset}>
        {serviceFilterCopy.resetLabel}
      </Button>
    </div>
  );
}
