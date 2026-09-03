import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleTocItem } from "@/types/store/article.types";

type ArticleTocProps = {
  items: readonly ArticleTocItem[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="article-toc-heading" className="space-y-3">
      <h2 id="article-toc-heading" className="type-h4 text-foreground">
        {articlesCopy.tocHeading}
      </h2>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="type-body-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
