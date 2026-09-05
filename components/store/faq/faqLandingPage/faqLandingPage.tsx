import Link from "next/link";
import { CircleHelpIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqCategoryCard } from "@/components/store/faq/faqCategoryCard/faqCategoryCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { faqCopy } from "@/config/faq.config/faq.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type FaqCategory } from "@/types/store/faq.types";

type FaqLandingPageProps = {
  categories: readonly FaqCategory[];
};

export function FaqLandingPage({ categories }: FaqLandingPageProps) {
  return (
    <div className="container-app flex flex-col gap-8 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: faqCopy.breadcrumb },
        ]}
      />
      <ContentPageHeader
        title={faqCopy.landingTitle}
        description={faqCopy.landingDescription}
      />
      {categories.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <FaqCategoryCard
                category={category}
                tone={
                  [
                    "bg-category-teal",
                    "bg-category-orange",
                    "bg-category-blue",
                    "bg-category-green",
                    "bg-category-rose",
                  ][index % 5] ?? "bg-category-teal"
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          icon={<CircleHelpIcon aria-hidden="true" />}
          title={faqCopy.emptyTitle}
          description={faqCopy.emptyDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.home}>{faqCopy.homeCta}</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
