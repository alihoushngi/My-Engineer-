export const serviceSlugs = [
  "land-surveying",
  "construction-workers",
  "drawing",
  "interior-design",
  "building-permit",
  "administrative-services",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceCategory = {
  slug: ServiceSlug;
  label: string;
  href: `/services/${ServiceSlug}`;
  description: string;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "land-surveying",
    label: "نقشه برداری",
    href: "/services/land-surveying",
    description: "متخصصان نقشه‌برداری ساختمان",
  },
  {
    slug: "construction-workers",
    label: "استادکار و پیمانکار",
    href: "/services/construction-workers",
    description: "نیروی اجرایی و پیمانکاری ساختمان",
  },
  {
    slug: "drawing",
    label: "ترسیم نقشه",
    href: "/services/drawing",
    description: "ترسیم نقشه‌های ساختمانی",
  },
  {
    slug: "interior-design",
    label: "طراحی نما و داخلی",
    href: "/services/interior-design",
    description: "طراحی نما و فضای داخلی",
  },
  {
    slug: "building-permit",
    label: "پروانه ساخت و پایان کار",
    href: "/services/building-permit",
    description: "پروانه ساخت و پایان کار",
  },
  {
    slug: "administrative-services",
    label: "خدمات اداری",
    href: "/services/administrative-services",
    description: "امور اداری ساختمان",
  },
];
