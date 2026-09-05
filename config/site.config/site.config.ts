export const siteConfig = {
  name: "مهندس من",
  homeHref: "/",
  joinHref: "/expert-registration",
  joinLabel: "ثبت‌نام متخصص",
  engineerLoginHref: "/engineer/login",
  engineerLoginLabel: "ورود مهندس",
  engineerPanelHref: "/engineer",
  engineerPanelLabel: "پنل مهندس",
} as const;

export type SiteConfig = typeof siteConfig;
