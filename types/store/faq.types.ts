export type FaqCategory = {
  slug: string;
  href: `/faq/${string}`;
  title: string;
  description?: string;
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategoryDetail = FaqCategory & {
  items: readonly FaqItem[];
  relatedCategories?: readonly FaqCategory[];
};
