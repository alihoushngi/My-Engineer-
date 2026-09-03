import { type Metadata } from "next";

export const notFoundMetadata = {
  title: "صفحه پیدا نشد",
  robots: {
    index: false,
    follow: true,
  },
} satisfies Metadata;
