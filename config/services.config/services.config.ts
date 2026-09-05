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

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((service) => service.slug === slug);
}

export const serviceDiscoveryCopy = {
  breadcrumb: "خدمات",
  emptyTitle: "متخصصی برای این خدمت پیدا نشد.",
  emptyDescription: "شهر را تغییر دهید یا یکی از خدمات دیگر را ببینید.",
  homeCta: "بازگشت به خانه",
  expertsCta: "مشاهده متخصصان",
  scopeLabel: "دامنه خدمت",
  scopeTitle: "این خدمت چه مسئله‌ای را حل می‌کند؟",
  processLabel: "مسیر همکاری",
  processTitle: "از تعریف نیاز تا شروع کار",
  prepareTitle: "پیش از تماس آماده باشید",
  prepareBody:
    "موقعیت پروژه، مرحله فعلی، مدارک موجود و خروجی مورد انتظار را کوتاه و روشن بنویسید؛ این اطلاعات مقایسه متخصصان را دقیق‌تر می‌کند.",
  faqLabel: "پرسش‌های متداول",
  faqTitle: "پیش از انتخاب متخصص",
  relatedTitle: "خدمات مرتبط",
} as const;
