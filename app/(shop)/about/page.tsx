import { type Metadata } from "next";
import { AboutPage } from "@/components/store/about/aboutPage/aboutPage";
import { aboutCopy } from "@/config/about.config/about.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

export const metadata: Metadata = {
  title: `${aboutCopy.breadcrumb} | ${siteConfig.name}`,
  description: aboutCopy.metadataDescription,
  alternates: {
    canonical: storePaths.about,
  },
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
