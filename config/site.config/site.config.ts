export const siteConfig = {
  name: "مهندس من",
  homeHref: "/",
  joinHref: "/expert-registration",
  joinLabel: "ثبت‌نام متخصص",
} as const;

export type SiteConfig = typeof siteConfig;
