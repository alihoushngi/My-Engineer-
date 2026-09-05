import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card/card";
import { type KnowledgeCategory } from "@/types/store/knowledge.types";
import { cn } from "@/lib/utils/cn/cn";

type KnowledgeCategoryCardProps = {
  category: KnowledgeCategory;
  tone?: string;
};

export function KnowledgeCategoryCard({
  category,
  tone,
}: KnowledgeCategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card
        className={cn(
          "h-full min-h-56 rounded-xl border-0 px-1 py-5 transition-transform group-hover:-translate-y-1 motion-reduce:transform-none",
          tone ?? "bg-secondary-subtle",
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-3">
              <h2 className="break-words type-h4 font-semibold text-card-foreground">
                {category.title}
              </h2>
              {category.description ? (
                <p className="type-body-sm text-muted-foreground">
                  {category.description}
                </p>
              ) : null}
            </div>
            <ChevronLeftIcon
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-muted-foreground ltr:hidden"
            />
            <ChevronRightIcon
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-muted-foreground rtl:hidden"
            />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
