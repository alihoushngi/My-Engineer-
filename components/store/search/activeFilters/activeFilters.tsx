import Link from "next/link";
import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { searchCopy } from "@/config/search.config/search.config";
import { type SearchActiveFilter } from "@/types/store/search.types";

type ActiveFiltersProps = {
  items: readonly SearchActiveFilter[];
  clearHref: string;
};

export function ActiveFilters({ items, clearHref }: ActiveFiltersProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Badge variant="secondary" asChild>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
                <XIcon aria-hidden="true" className="size-3" />
                <span className="sr-only">حذف {item.label}</span>
              </Link>
            </Badge>
          </li>
        ))}
      </ul>
      <Button asChild variant="ghost" size="sm">
        <Link href={clearHref}>{searchCopy.clearFilters}</Link>
      </Button>
    </div>
  );
}
