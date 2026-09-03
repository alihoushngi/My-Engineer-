import Link from "next/link";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { LegalDocument } from "@/components/common/legalDocument/legalDocument";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { type LegalPageProps } from "@/components/store/legal/legalPage/type/legalPage.types";
import { siteConfig } from "@/config/site.config/site.config";

export function LegalPage({
  title,
  intro,
  breadcrumbLabel,
  document,
  relatedHref,
  relatedLabel,
}: LegalPageProps) {
  return (
    <div className="container-narrow flex flex-col gap-8 py-8 sm:py-12">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: breadcrumbLabel },
        ]}
      />
      <ContentPageHeader title={title} description={intro} />
      <LegalDocument document={document} />
      <nav aria-label="اسناد مرتبط" className="border-t border-border pt-6">
        <Link
          href={relatedHref}
          className="rounded-md text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {relatedLabel}
        </Link>
      </nav>
    </div>
  );
}
