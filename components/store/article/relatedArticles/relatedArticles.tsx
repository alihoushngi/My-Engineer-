import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleCardData } from "@/types/store/article.types";

type RelatedArticlesProps = {
  items: readonly ArticleCardData[];
};

export function RelatedArticles({ items }: RelatedArticlesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="type-h3 text-foreground">
        {articlesCopy.relatedHeading}
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
