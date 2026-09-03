import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type StoreBreadcrumbItem } from "@/components/common/storeBreadcrumb/type/storeBreadcrumb.types";
import { cn } from "@/lib/utils/cn/cn";

type StoreBreadcrumbProps = {
  items: readonly StoreBreadcrumbItem[];
  className?: string;
};

export function StoreBreadcrumb({ items, className }: StoreBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="مسیر صفحه" className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-2 type-body-sm text-muted-foreground">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-2"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="inline-flex text-border-strong"
                >
                  <ChevronLeftIcon className="size-3.5 ltr:hidden" />
                  <ChevronRightIcon className="size-3.5 rtl:hidden" />
                </span>
              ) : null}
              {isCurrent || !item.href ? (
                <span
                  className={cn(
                    "min-w-0 truncate",
                    isCurrent && "font-medium text-foreground",
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-md outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
