import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "مهندس من",
    short_name: "مهندس من",
    description:
      "بازار تخصصی معرفی و مقایسه متخصصان ساختمان بر پایه تخصص، شهر و سابقه حرفه‌ای.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F6FAFA",
    theme_color: "#24313E",
    lang: "fa",
    dir: "rtl",
    categories: ["business", "education", "utilities"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
