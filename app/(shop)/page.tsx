import { type Metadata } from "next";
import { HomePage } from "@/components/store/home/homePage/homePage";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: homeHeroCopy.description,
  alternates: {
    canonical: storePaths.home,
  },
};

export default function ShopHomePage() {
  return <HomePage />;
}
