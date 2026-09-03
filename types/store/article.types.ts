export type ArticleSlug = string;

export type ArticleCardData = {
  slug: ArticleSlug;
  href: `/articles/${string}`;
  title: string;
  excerpt?: string;
  coverSrc?: string;
  author?: string;
  publishedAt?: string;
  categorySlug?: string;
  categoryLabel?: string;
};

export type ArticleFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ArticleTocItem = {
  id: string;
  label: string;
};

export type Article = ArticleCardData & {
  body?: string;
  viewCount?: number;
  toc?: readonly ArticleTocItem[];
  faqs?: readonly ArticleFaqItem[];
  related?: readonly ArticleCardData[];
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export type ArticleCategory = {
  slug: string;
  href: `/articles/categories/${string}`;
  title: string;
  description?: string;
};
