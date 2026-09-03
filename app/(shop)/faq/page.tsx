import { type Metadata } from "next";
import { FaqLandingPage } from "@/components/store/faq/faqLandingPage/faqLandingPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listFaqCategories } from "@/services/faq-service/faq-service";

export const metadata: Metadata = {
  title: `${faqCopy.landingTitle} | ${siteConfig.name}`,
  description: faqCopy.metadataDescription,
  alternates: {
    canonical: storePaths.faq,
  },
};

export default async function FaqRoutePage() {
  const categories = await listFaqCategories();

  return <FaqLandingPage categories={categories} />;
}
