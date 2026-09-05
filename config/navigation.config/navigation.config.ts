import { siteConfig } from "@/config/site.config/site.config";
import { serviceCategories } from "@/config/services.config/services.config";

export const storePaths = {
  home: "/",
  search: "/search",
  articles: "/articles",
  knowledge: "/knowledge",
  faq: "/faq",
  about: "/about",
  terms: "/terms",
  privacy: "/privacy-policy",
  expertRegistration: siteConfig.joinHref,
  engineerLogin: "/engineer/login",
  engineerPanel: "/engineer",
} as const;

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationLink[];
};

export const primaryNavigation: readonly NavigationLink[] = [
  { href: storePaths.home, label: "خانه" },
  { href: storePaths.articles, label: "مقالات" },
  { href: storePaths.knowledge, label: "دانش" },
  { href: storePaths.faq, label: "سوالات متداول" },
  { href: storePaths.about, label: "درباره ما" },
];

export const servicesNavigation: NavigationGroup = {
  id: "services",
  label: "خدمات",
  items: serviceCategories.map((service) => ({
    href: service.href,
    label: service.label,
  })),
};

export const legalNavigation: readonly NavigationLink[] = [
  { href: storePaths.terms, label: "شرایط استفاده" },
  { href: storePaths.privacy, label: "حریم خصوصی" },
];

export const contentNavigation: readonly NavigationLink[] = [
  { href: storePaths.articles, label: "مقالات" },
  { href: storePaths.knowledge, label: "دانش" },
  { href: storePaths.faq, label: "سوالات متداول" },
];

export const companyNavigation: readonly NavigationLink[] = [
  { href: storePaths.about, label: "درباره ما" },
];

export const footerNavigation: readonly NavigationGroup[] = [
  {
    id: "services",
    label: "خدمات",
    items: servicesNavigation.items,
  },
  {
    id: "content",
    label: "محتوا",
    items: contentNavigation,
  },
  {
    id: "company",
    label: "درباره ما",
    items: companyNavigation,
  },
  {
    id: "legal",
    label: "قوانین",
    items: legalNavigation,
  },
];

export const mobileUtilityNavigation: readonly NavigationLink[] = [
  ...legalNavigation,
];

export const joinNavigation: NavigationLink = {
  href: siteConfig.joinHref,
  label: siteConfig.joinLabel,
};

export const engineerLoginNavigation: NavigationLink = {
  href: storePaths.engineerLogin,
  label: "ورود مهندس",
};

export const engineerPanelNavigation: NavigationLink = {
  href: storePaths.engineerPanel,
  label: "پنل مهندس",
};

export function isActivePath(pathname: string, href: string): boolean {
  if (href === storePaths.home) {
    return pathname === storePaths.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isServicesPath(pathname: string): boolean {
  return pathname === "/services" || pathname.startsWith("/services/");
}
