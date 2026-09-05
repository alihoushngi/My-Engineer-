import Link from "next/link";
import Image from "next/image";
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
        <Card className="h-full overflow-hidden rounded-none border-0 border-b border-border bg-transparent p-0 pb-6">
          {article.coverSrc ? (
            <Image
              src={article.coverSrc}
              alt={`تصویر مقاله ${article.title}`}
              width={720}
              height={450}
              className="aspect-[16/10] w-full rounded-lg object-cover"
            />
          ) : null}
          <CardHeader className="gap-3 py-4">
            {article.categoryLabel ? (
              <p className="type-caption text-muted-foreground">
                {article.categoryLabel}
              </p>
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
        </Card>
      </Link>
    </article>
  );
}
