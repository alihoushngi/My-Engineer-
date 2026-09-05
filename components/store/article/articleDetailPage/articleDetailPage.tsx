import Link from "next/link";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleBody } from "@/components/store/article/articleBody/articleBody";
import { ArticleComments } from "@/components/store/article/articleComments/articleComments";
import { ArticleSidebar } from "@/components/store/article/articleSidebar/articleSidebar";
import { ArticleTocMobile } from "@/components/store/article/articleTocMobile/articleTocMobile";
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
import {
  parseArticleBody,
  tocFromArticleBlocks,
} from "@/lib/articles/parse-article-body/parse-article-body";
import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
  type ArticleComment,
} from "@/types/store/article.types";

type ArticleDetailPageProps = {
  article: Article;
  categories: readonly ArticleCategory[];
  related: readonly ArticleCardData[];
  comments: readonly ArticleComment[];
};

export function ArticleDetailPage({
  article,
  categories,
  related,
  comments,
}: ArticleDetailPageProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");
  const faqs = article.faqs ?? [];
  const blocks = parseArticleBody(article.body ?? "");
  const toc = tocFromArticleBlocks(blocks);
  const categoryHref = article.categorySlug
    ? (`/articles/categories/${article.categorySlug}` as const)
    : undefined;

  return (
    <div className="container-app flex flex-col gap-10 py-page">
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
      <div className="grid gap-10 lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start">
        <ArticleSidebar
          categories={categories}
          currentCategorySlug={article.categorySlug}
          toc={toc}
        />
        <article className="min-w-0 max-w-3xl space-y-8">
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
          <ArticleTocMobile items={toc} />
          {article.body ? <ArticleBody markdown={article.body} /> : null}
          {faqs.length > 0 ? (
            <section
              className="space-y-4"
              aria-labelledby="article-faqs-heading"
            >
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
      </div>
      <RelatedArticles
        items={related}
        heading={articlesCopy.relatedHeading}
        description={articlesCopy.relatedDescription}
      />
      <ArticleComments articleId={article.id} comments={comments} />
    </div>
  );
}
