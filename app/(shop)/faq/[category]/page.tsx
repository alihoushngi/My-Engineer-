import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqCategoryPage } from "@/components/store/faq/faqCategoryPage/faqCategoryPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { getFaqCategory } from "@/services/faq-service/faq-service";

type FaqCategoryRouteProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: FaqCategoryRouteProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getFaqCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  return {
    title: `${category.title} | ${faqCopy.landingTitle}`,
    description: category.description ?? faqCopy.metadataDescription,
    alternates: {
      canonical: category.href,
    },
  };
}

export default async function FaqCategoryRoutePage({
  params,
}: FaqCategoryRouteProps) {
  const { category: slug } = await params;
  const category = await getFaqCategory(slug);

  if (!category) {
    notFound();
  }

  return <FaqCategoryPage category={category} />;
}
