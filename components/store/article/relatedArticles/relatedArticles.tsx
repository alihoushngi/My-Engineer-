import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleCardData } from "@/types/store/article.types";

type RelatedArticlesProps = {
  items: readonly ArticleCardData[];
  heading?: string;
  headingId?: string;
  description?: string;
};

export function RelatedArticles({
  items,
  heading = articlesCopy.relatedHeading,
  headingId = "related-articles-heading",
  description,
}: RelatedArticlesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-labelledby={headingId}>
      <div className="space-y-2">
        <h2 id={headingId} className="type-h3 text-foreground">
          {heading}
        </h2>
        {description ? (
          <p className="type-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
