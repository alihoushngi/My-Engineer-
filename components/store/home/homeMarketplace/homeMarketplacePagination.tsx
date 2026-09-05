"use client";

import { Button } from "@/components/ui/button/button";
import { homeMarketplaceCopy } from "@/config/home.config/home.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type HomeMarketplacePaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function HomeMarketplacePagination({
  page,
  pageCount,
  onPageChange,
}: HomeMarketplacePaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={homeMarketplaceCopy.paginationLabel}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        {homeMarketplaceCopy.previousLabel}
      </Button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (item) => (
          <Button
            key={item}
            variant={item === page ? "primary" : "outline"}
            size="sm"
            aria-current={item === page ? "page" : undefined}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {formatFaNumber(item)}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => {
          onPageChange(page + 1);
        }}
      >
        {homeMarketplaceCopy.nextLabel}
      </Button>
    </nav>
  );
}
