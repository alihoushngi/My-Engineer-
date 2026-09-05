export const siteConfig = {
  name: "مهندس من",
  homeHref: "/",
  joinHref: "/expert-registration",
  joinLabel: "ثبت‌نام متخصص",
  engineerLoginHref: "/engineer/login",
  engineerLoginLabel: "ورود مهندس",
  engineerPanelHref: "/engineer",
  engineerPanelLabel: "پنل مهندس",
  userLoginHref: "/login",
  userRegisterHref: "/register",
  userAccountHref: "/account",
  userLoginLabel: "ورود / ثبت‌نام",
  userAccountLabel: "حساب من",
} as const;

export type SiteConfig = typeof siteConfig;
