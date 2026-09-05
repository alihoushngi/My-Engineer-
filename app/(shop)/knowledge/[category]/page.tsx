import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeCategoryPage } from "@/components/store/knowledge/knowledgeCategoryPage/knowledgeCategoryPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  buildPageHref,
  parsePageParam,
} from "@/lib/pagination/page-param/page-param";
import { getKnowledgeCategory } from "@/services/knowledge-service/knowledge-service";

type KnowledgeCategoryRouteProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: KnowledgeCategoryRouteProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getKnowledgeCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  return {
    title: `${category.title} | ${knowledgeCopy.landingTitle}`,
    description: category.description ?? knowledgeCopy.metadataDescription,
    alternates: {
      canonical: category.href,
    },
  };
}

export default async function KnowledgeCategoryRoutePage({
  params,
  searchParams,
}: KnowledgeCategoryRouteProps) {
  const { category: slug } = await params;
  const category = await getKnowledgeCategory(slug);

  if (!category) {
    notFound();
  }

  const pagination = paginateItems(
    category.tips,
    parsePageParam((await searchParams).page),
  );

  return (
    <KnowledgeCategoryPage
      category={category}
      tips={pagination.items}
      pagination={pagination}
      pageHref={(page) => buildPageHref(category.href, page)}
    />
  );
}
