import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, NewspaperIcon } from "lucide-react";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleCardData } from "@/types/store/article.types";

type ArticleFeaturedProps = {
  article: ArticleCardData;
};

export function ArticleFeatured({ article }: ArticleFeaturedProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={article.href}
      className="group grid overflow-hidden rounded-xl bg-primary-deep text-primary-deep-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring lg:grid-cols-[1.1fr_.9fr]"
    >
      <div className="relative min-h-52 bg-primary-deep lg:min-h-72">
        {article.coverSrc ? (
          <Image
            src={article.coverSrc}
            alt={`تصویر مقاله ${article.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full min-h-52 items-center justify-center text-primary-deep-foreground/70 lg:min-h-72"
          >
            <NewspaperIcon className="size-10" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center p-7 text-primary-deep-foreground sm:p-10">
        <p className="inline-flex items-center gap-2 type-label text-primary-deep-foreground/80">
          <NewspaperIcon aria-hidden="true" className="size-4" />
          {article.categoryLabel
            ? `${articlesCopy.featuredLabel} · ${article.categoryLabel}`
            : articlesCopy.featuredLabel}
        </p>
        <h2 className="mt-4 type-h1 text-primary-deep-foreground">
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="mt-4 type-body text-primary-deep-foreground/80">
            {article.excerpt}
          </p>
        ) : null}
        {meta ? (
          <p className="mt-3 type-caption text-primary-deep-foreground/70">
            {meta}
          </p>
        ) : null}
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 type-button text-primary-deep-foreground">
          {articlesCopy.readMoreCta}
          <ArrowLeftIcon
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </div>
    </Link>
  );
}
