import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, NewspaperIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card/card";
import { articlesCopy } from "@/config/articles.config/articles.config";
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
    <article className={cn("h-full", className)}>
      <Link
        href={article.href}
        className="group flex h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="h-full w-full overflow-hidden p-0">
          {article.coverSrc ? (
            <Image
              src={article.coverSrc}
              alt={`تصویر مقاله ${article.title}`}
              width={720}
              height={450}
              className="aspect-[16/10] w-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex aspect-[16/10] items-center justify-center bg-secondary text-secondary-foreground"
            >
              <NewspaperIcon className="size-8" />
            </div>
          )}
          <CardHeader className="gap-3 px-(--space-card) pt-4">
            {article.categoryLabel ? (
              <Badge variant="secondary">{article.categoryLabel}</Badge>
            ) : null}
            <h2 className="break-words type-h3 text-foreground group-hover:text-primary">
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
          <CardFooter className="mt-auto px-(--space-card) pt-2 pb-(--space-card)">
            <span className="inline-flex min-h-11 items-center gap-2 type-button text-primary">
              {articlesCopy.readMoreCta}
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
              />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
}
