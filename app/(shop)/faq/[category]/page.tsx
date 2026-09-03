import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqCategoryPage } from "@/components/store/faq/faqCategoryPage/faqCategoryPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { siteConfig } from "@/config/site.config/site.config";
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
    return { title: siteConfig.name };
  }

  return {
    title: `${category.title} | ${faqCopy.landingTitle} | ${siteConfig.name}`,
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
