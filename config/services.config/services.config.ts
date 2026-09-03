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
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "land-surveying",
    label: "نقشه برداری",
    href: "/services/land-surveying",
  },
  {
    slug: "construction-workers",
    label: "استادکار و پیمانکار",
    href: "/services/construction-workers",
  },
  {
    slug: "drawing",
    label: "ترسیم نقشه",
    href: "/services/drawing",
  },
  {
    slug: "interior-design",
    label: "طراحی نما و داخلی",
    href: "/services/interior-design",
  },
  {
    slug: "building-permit",
    label: "پروانه ساخت و پایان کار",
    href: "/services/building-permit",
  },
  {
    slug: "administrative-services",
    label: "خدمات اداری",
    href: "/services/administrative-services",
  },
];
