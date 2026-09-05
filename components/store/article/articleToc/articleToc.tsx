import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleTocItem } from "@/types/store/article.types";
import { cn } from "@/lib/utils/cn/cn";

type ArticleTocProps = {
  items: readonly ArticleTocItem[];
  headingHidden?: boolean;
};

const LEVEL_PADDING: Record<ArticleTocItem["level"], string> = {
  2: "ps-0",
  3: "ps-3",
  4: "ps-6",
  5: "ps-9",
};

export function ArticleToc({ items, headingHidden = false }: ArticleTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby={headingHidden ? undefined : "article-toc-heading"}>
      {headingHidden ? (
        <h2 className="sr-only">{articlesCopy.tocHeading}</h2>
      ) : (
        <h2 id="article-toc-heading" className="mb-4 type-h4 text-foreground">
          {articlesCopy.tocHeading}
        </h2>
      )}
      <ol className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={LEVEL_PADDING[item.level]}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-flex min-h-11 items-center type-body-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                item.level === 2 && "font-medium text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
