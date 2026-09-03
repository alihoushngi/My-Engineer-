import localFont from "next/font/local";

export const kalameh = localFont({
  src: [
    {
      path: "../../../fonts/_Woff2/KalamehWeb(FaNum)-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../fonts/_Woff2/KalamehWeb(FaNum)-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../fonts/_Woff2/KalamehWeb(FaNum)-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../fonts/_Woff2/KalamehWeb(FaNum)-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kalameh",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
