import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeCategoryPage } from "@/components/store/knowledge/knowledgeCategoryPage/knowledgeCategoryPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { siteConfig } from "@/config/site.config/site.config";
import { getKnowledgeCategory } from "@/services/knowledge-service/knowledge-service";

type KnowledgeCategoryRouteProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: KnowledgeCategoryRouteProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getKnowledgeCategory(slug);

  if (!category) {
    return { title: siteConfig.name };
  }

  return {
    title: `${category.title} | ${knowledgeCopy.landingTitle} | ${siteConfig.name}`,
    description: category.description ?? knowledgeCopy.metadataDescription,
    alternates: {
      canonical: category.href,
    },
  };
}

export default async function KnowledgeCategoryRoutePage({
  params,
}: KnowledgeCategoryRouteProps) {
  const { category: slug } = await params;
  const category = await getKnowledgeCategory(slug);

  if (!category) {
    notFound();
  }

  return <KnowledgeCategoryPage category={category} />;
}
