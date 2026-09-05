"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { type PaginationProps } from "@/components/common/pagination/type/pagination.types";
import { paginationCopy } from "@/config/pagination.config/pagination.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { getVisiblePages } from "@/lib/pagination/visible-pages/visible-pages";
import { cn } from "@/lib/utils/cn/cn";

export function Pagination({
  page,
  pageCount,
  ariaLabel,
  buildHref,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const status = paginationCopy.pageStatus(
    formatFaNumber(page),
    formatFaNumber(pageCount),
  );

  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      <PaginationControl
        label={paginationCopy.previousLabel}
        disabled={page <= 1}
        href={buildHref?.(page - 1)}
        onClick={onPageChange ? () => onPageChange(page - 1) : undefined}
      />
      <p className="type-caption text-muted-foreground sm:hidden">{status}</p>
      <ol className="hidden flex-wrap items-center justify-center gap-1 sm:flex">
        {getVisiblePages(page, pageCount).map((token) =>
          token.type === "ellipsis" ? (
            <li key={token.key}>
              <span
                className="flex min-h-11 min-w-11 items-center justify-center type-caption text-muted-foreground"
                aria-label={paginationCopy.ellipsisLabel}
              >
                …
              </span>
            </li>
          ) : (
            <li key={token.page}>
              <PaginationControl
                label={formatFaNumber(token.page)}
                ariaLabel={`${paginationCopy.pageNumberLabel} ${formatFaNumber(token.page)}`}
                current={token.page === page}
                href={buildHref?.(token.page)}
                onClick={
                  onPageChange ? () => onPageChange(token.page) : undefined
                }
              />
            </li>
          ),
        )}
      </ol>
      <PaginationControl
        label={paginationCopy.nextLabel}
        disabled={page >= pageCount}
        href={buildHref?.(page + 1)}
        onClick={onPageChange ? () => onPageChange(page + 1) : undefined}
      />
    </nav>
  );
}

function PaginationControl({
  label,
  ariaLabel,
  href,
  current = false,
  disabled = false,
  onClick,
}: {
  label: string;
  ariaLabel?: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const className = cn(current && "pointer-events-none");

  if (href && !disabled) {
    return (
      <Button
        asChild
        variant={current ? "primary" : "outline"}
        size="sm"
        className={className}
      >
        <Link
          href={href}
          aria-label={ariaLabel}
          aria-current={current ? "page" : undefined}
        >
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={current ? "primary" : "outline"}
      size="sm"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={current ? "page" : undefined}
      className={className}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
