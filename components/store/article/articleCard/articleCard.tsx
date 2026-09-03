import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card/card";
import { type ArticleCardData } from "@/types/store/article.types";
import { cn } from "@/lib/utils/cn/cn";

type ArticleCardProps = {
  article: ArticleCardData;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={cn(className)}>
      <Link
        href={article.href}
        className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="h-full overflow-hidden p-0 transition-colors group-hover:border-border-strong group-hover:bg-accent/40">
          {article.coverSrc ? (
            // Remote hosts are API CONTRACT REQUIRED; native img until domains exist.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverSrc}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          ) : null}
          <CardHeader className="p-5">
            {article.categoryLabel ? (
              <p className="type-caption text-muted-foreground">
                {article.categoryLabel}
              </p>
            ) : null}
            <h2 className="type-h4 font-semibold text-card-foreground">
              {article.title}
            </h2>
            {article.excerpt ? (
              <p className="type-body-sm text-muted-foreground">
                {article.excerpt}
              </p>
            ) : null}
            {meta ? (
              <p className="type-caption text-muted-foreground">{meta}</p>
            ) : null}
          </CardHeader>
        </Card>
      </Link>
    </article>
  );
}
