import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { type ReactNode } from "react";
import { AppProvider } from "@/providers/app-provider/app-provider";
import { siteConfig } from "@/config/site.config/site.config";
import "@/css/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={vazirmatn.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
