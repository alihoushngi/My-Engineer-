import { type Metadata } from "next";
import { LegalPage } from "@/components/store/legal/legalPage/legalPage";
import { termsCopy, termsDocument } from "@/config/legal.config/legal.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

export const metadata: Metadata = {
  title: `${termsCopy.breadcrumb} | ${siteConfig.name}`,
  description: termsCopy.metadataDescription,
  alternates: {
    canonical: storePaths.terms,
  },
};

export default function TermsRoutePage() {
  return (
    <LegalPage
      title={termsCopy.title}
      intro={termsCopy.intro}
      breadcrumbLabel={termsCopy.breadcrumb}
      document={termsDocument}
      relatedHref={storePaths.privacy}
      relatedLabel={termsCopy.relatedLabel}
    />
  );
}
