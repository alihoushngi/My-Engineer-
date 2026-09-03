import type { Metadata } from "next";
import { type ReactNode } from "react";
import { AppProvider } from "@/providers/app-provider/app-provider";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { siteConfig } from "@/config/site.config/site.config";
import { kalameh } from "@/lib/fonts/kalameh/kalameh";
import "@/css/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: homeHeroCopy.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.name,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className={kalameh.variable}>
      <body className={kalameh.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
