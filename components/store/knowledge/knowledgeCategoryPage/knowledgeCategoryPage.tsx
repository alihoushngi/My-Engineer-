import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { KnowledgeTipList } from "@/components/store/knowledge/knowledgeTipList/knowledgeTipList";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type KnowledgeCategoryDetail } from "@/types/store/knowledge.types";

type KnowledgeCategoryPageProps = {
  category: KnowledgeCategoryDetail;
};

export function KnowledgeCategoryPage({
  category,
}: KnowledgeCategoryPageProps) {
  return (
    <div className="container-app flex flex-col gap-8 py-8 sm:py-12">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: knowledgeCopy.breadcrumb, href: storePaths.knowledge },
          { label: category.title },
        ]}
      />
      <ContentPageHeader
        title={category.title}
        description={category.description}
      />
      {category.tips.length > 0 ? (
        <KnowledgeTipList tips={category.tips} />
      ) : (
        <Empty
          icon={<BookOpenIcon aria-hidden="true" />}
          title={knowledgeCopy.emptyCategoryTitle}
          description={knowledgeCopy.emptyCategoryDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.knowledge}>{knowledgeCopy.browseCta}</Link>
            </Button>
          }
        />
      )}
      {category.relatedServiceHref && category.relatedServiceLabel ? (
        <Button asChild variant="outline">
          <Link href={category.relatedServiceHref}>
            {knowledgeCopy.serviceCtaLabel}: {category.relatedServiceLabel}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
