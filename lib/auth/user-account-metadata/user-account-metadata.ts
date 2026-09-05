import { type Metadata } from "next";
import { siteConfig } from "@/config/site.config/site.config";

export const userAccountRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export function userAccountMetadata(title: string): Metadata {
  return {
    title,
    description: `حساب کاربری مشتری در ${siteConfig.name}`,
    robots: userAccountRobots,
  };
}
