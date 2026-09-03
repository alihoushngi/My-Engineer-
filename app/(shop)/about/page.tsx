import { type Metadata } from "next";
import { AboutPage } from "@/components/store/about/aboutPage/aboutPage";
import { aboutCopy } from "@/config/about.config/about.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export const metadata: Metadata = {
  title: aboutCopy.breadcrumb,
  description: aboutCopy.metadataDescription,
  alternates: {
    canonical: storePaths.about,
  },
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
