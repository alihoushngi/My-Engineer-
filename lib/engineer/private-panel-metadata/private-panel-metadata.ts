import { type Metadata } from "next";
import { siteConfig } from "@/config/site.config/site.config";

export const engineerPanelRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export function engineerPageMetadata(title: string): Metadata {
  return {
    title,
    description: `فضای کاری خصوصی متخصص در ${siteConfig.name}`,
    robots: engineerPanelRobots,
  };
}
