import Link from "next/link";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { cn } from "@/lib/utils/cn/cn";
import { type ArticleCategory } from "@/types/store/article.types";

type ArticleCategoryNavProps = {
  categories: readonly ArticleCategory[];
  currentSlug?: string;
};

export function ArticleCategoryNav({
  categories,
  currentSlug,
}: ArticleCategoryNavProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="article-categories-heading">
      <h2
        id="article-categories-heading"
        className="mb-4 type-h4 text-foreground"
      >
        {articlesCopy.categoriesHeading}
      </h2>
      <ul className="space-y-1">
        {categories.map((category) => {
          const current = category.slug === currentSlug;

          return (
            <li key={category.slug}>
              <Link
                href={category.href}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center type-body-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  current
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
