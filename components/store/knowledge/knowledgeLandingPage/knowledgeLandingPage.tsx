import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { KnowledgeCategoryCard } from "@/components/store/knowledge/knowledgeCategoryCard/knowledgeCategoryCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type KnowledgeCategory } from "@/types/store/knowledge.types";

type KnowledgeLandingPageProps = {
  categories: readonly KnowledgeCategory[];
};

export function KnowledgeLandingPage({
  categories,
}: KnowledgeLandingPageProps) {
  return (
    <div className="container-app flex flex-col gap-8 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: knowledgeCopy.breadcrumb },
        ]}
      />
      <ContentPageHeader
        title={knowledgeCopy.landingTitle}
        description={knowledgeCopy.landingDescription}
      />
      {categories.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <KnowledgeCategoryCard
                category={category}
                tone={
                  [
                    "bg-category-blue",
                    "bg-category-green",
                    "bg-category-violet",
                    "bg-category-orange",
                  ][index % 4] ?? "bg-category-blue"
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          icon={<BookOpenIcon aria-hidden="true" />}
          title={knowledgeCopy.emptyTitle}
          description={knowledgeCopy.emptyDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.home}>{knowledgeCopy.homeCta}</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
