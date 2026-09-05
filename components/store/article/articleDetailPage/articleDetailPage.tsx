import Link from "next/link";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleToc } from "@/components/store/article/articleToc/articleToc";
import { RelatedArticles } from "@/components/store/article/relatedArticles/relatedArticles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { Button } from "@/components/ui/button/button";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type Article } from "@/types/store/article.types";

type ArticleDetailPageProps = {
  article: Article;
};

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");
  const faqs = article.faqs ?? [];
  const toc = article.toc ?? [];
  const related = article.related ?? [];
  const categoryHref = article.categorySlug
    ? (`/articles/categories/${article.categorySlug}` as const)
    : undefined;

  return (
    <article className="container-narrow flex flex-col gap-10 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: articlesCopy.hubBreadcrumb, href: storePaths.articles },
          ...(article.categoryLabel && categoryHref
            ? [{ label: article.categoryLabel, href: categoryHref }]
            : []),
          { label: article.title },
        ]}
      />
      <header className="space-y-5 border-b border-border pb-8">
        {article.categoryLabel && categoryHref ? (
          <p className="type-caption text-muted-foreground">
            <Link
              href={categoryHref}
              className="outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {article.categoryLabel}
            </Link>
          </p>
        ) : null}
        <h1 className="type-h1 text-foreground">{article.title}</h1>
        {meta ? (
          <p className="type-body-sm text-muted-foreground">{meta}</p>
        ) : null}
      </header>
      {article.coverSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverSrc}
          alt=""
          className="aspect-[16/9] w-full rounded-lg object-cover"
        />
      ) : null}
      <ArticleToc items={toc} />
      {article.body ? (
        <div className="prose-reading space-y-5 whitespace-pre-line type-body text-foreground">
          {article.body}
        </div>
      ) : null}
      {faqs.length > 0 ? (
        <section className="space-y-4" aria-labelledby="article-faqs-heading">
          <h2 id="article-faqs-heading" className="type-h3 text-foreground">
            {articlesCopy.faqsHeading}
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}
      <RelatedArticles items={related} />
      {article.relatedServiceHref && article.relatedServiceLabel ? (
        <Button
          asChild
          variant="outline"
          className="max-w-full min-w-0 whitespace-normal"
        >
          <Link href={article.relatedServiceHref}>
            {articlesCopy.serviceCtaPrefix}: {article.relatedServiceLabel}
          </Link>
        </Button>
      ) : null}
    </article>
  );
}
