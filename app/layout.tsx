import type { Metadata } from "next";
import { type ReactNode } from "react";
import { AppProvider } from "@/providers/app-provider/app-provider";
import { siteConfig } from "@/config/site.config/site.config";
import { kalameh } from "@/lib/fonts/kalameh/kalameh";
import "@/css/globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
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
