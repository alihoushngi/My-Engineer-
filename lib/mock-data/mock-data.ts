import { type ServiceSlug } from "@/config/services.config/services.config";
import {
  type Article,
  type ArticleCategory,
} from "@/types/store/article.types";
import {
  type ExpertCardData,
  type ExpertProfile,
} from "@/types/store/expert.types";
import { type FaqCategoryDetail } from "@/types/store/faq.types";
import { type KnowledgeCategoryDetail } from "@/types/store/knowledge.types";
import { type City, type Province } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

/**
 * Centralized design-review fixtures. These records are display content, not
 * authentication, mutation, upload, authorization, or transaction results.
 */

export const mockProvinces: readonly Province[] = [
  { id: "tehran", name: "تهران" },
  { id: "gilan", name: "گیلان" },
  { id: "alborz", name: "البرز" },
  { id: "isfahan", name: "اصفهان" },
  { id: "fars", name: "فارس" },
];

export const mockCities: readonly City[] = [
  { id: "tehran", name: "تهران", provinceId: "tehran" },
  { id: "rasht", name: "رشت", provinceId: "gilan" },
  { id: "bandar-anzali", name: "بندر انزلی", provinceId: "gilan" },
  { id: "karaj", name: "کرج", provinceId: "alborz" },
  { id: "isfahan", name: "اصفهان", provinceId: "isfahan" },
  { id: "shiraz", name: "شیراز", provinceId: "fars" },
];

export const mockSoftware = [
  "AutoCAD",
  "Civil 3D",
  "Revit",
  "ETABS",
  "SAFE",
  "SketchUp",
  "Lumion",
] as const;

const expertCards: readonly ExpertCardData[] = [
  {
    id: "amirhossein-rostami",
    href: "/experts/amirhossein-rostami",
    name: "امیرحسین رستمی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه UTM و جانمایی پلاک ثبتی",
    city: "تهران",
    experienceYears: 12,
    isVerified: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 28,
    specialties: ["نقشه UTM", "جانمایی پلاک ثبتی", "نقشه ازبیلت"],
    serviceSlugs: ["land-surveying", "building-permit"],
  },
  {
    id: "nazanin-farhadi",
    href: "/experts/nazanin-farhadi",
    name: "نازنین فرهادی",
    profession: "مهندس معماری و طراح داخلی",
    primarySpecialty: "طراحی نما و فضای داخلی",
    city: "کرج",
    experienceYears: 8,
    isVerified: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 19,
    specialties: ["طراحی داخلی", "طراحی نما", "مدل‌سازی سه‌بعدی"],
    serviceSlugs: ["interior-design", "drawing"],
  },
  {
    id: "mahdi-karimi",
    href: "/experts/mahdi-karimi",
    name: "مهدی کریمی",
    profession: "پیمانکار ساختمان",
    primarySpecialty: "اجرای سازه و بازسازی",
    city: "رشت",
    experienceYears: 15,
    isVerified: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 34,
    specialties: ["اسکلت بتنی", "بازسازی", "مدیریت اجرا"],
    serviceSlugs: ["construction-workers"],
  },
  {
    id: "sara-tavakoli",
    href: "/experts/sara-tavakoli",
    name: "سارا توکلی",
    profession: "مهندس عمران",
    primarySpecialty: "پروانه ساختمان و پایان کار",
    city: "اصفهان",
    experienceYears: 9,
    isVerified: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 16,
    specialties: ["پروانه ساخت", "پایان کار", "امور شهرداری"],
    serviceSlugs: ["building-permit", "administrative-services"],
  },
  {
    id: "ali-rezaei",
    href: "/experts/ali-rezaei",
    name: "علی رضایی",
    profession: "مهندس سازه",
    primarySpecialty: "طراحی و محاسبات سازه",
    city: "شیراز",
    experienceYears: 11,
    isVerified: true,
    rating: 4.6,
    reviewCount: 12,
    specialties: ["سازه بتنی", "سازه فولادی", "ETABS و SAFE"],
    serviceSlugs: ["drawing"],
  },
  {
    id: "reza-azadi",
    href: "/experts/reza-azadi",
    name: "رضا آزادی",
    profession: "کارشناس امور ثبتی ساختمان",
    primarySpecialty: "امور اداره ثبت و اسناد",
    city: "بندر انزلی",
    experienceYears: 7,
    isVerified: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 9,
    specialties: ["امور ثبتی", "سند مالکیت", "تغییر کاربری"],
    serviceSlugs: ["administrative-services", "land-surveying"],
  },
];

export const mockExperts: readonly ExpertProfile[] = expertCards.map(
  (expert) => ({
    ...expert,
    shortIntroduction: `${expert.primarySpecialty ?? expert.profession}؛ آماده بررسی نیاز پروژه و ارائه مسیر اجرایی روشن.`,
    about:
      "این پروفایل نمایشی برای بررسی تجربه کاربری بازار متخصصان مهندس من است. اطلاعات واقعی متخصصان پس از اتصال سرویس عمومی پروفایل نمایش داده خواهد شد.",
    discipline: expert.profession.includes("معماری") ? "معماری" : "عمران",
    serviceCities: expert.city ? [expert.city] : [],
    software:
      expert.id === "nazanin-farhadi"
        ? ["AutoCAD", "Revit", "SketchUp", "Lumion"]
        : ["AutoCAD", "Civil 3D"],
    education: [{ degree: "کارشناسی ارشد", field: expert.profession }],
    organizationMembership: { label: "عضو سازمان نظام مهندسی" },
    license: { title: "پروانه اشتغال", competencies: ["طراحی", "نظارت"] },
    history: `بیش از ${expert.experienceYears ?? 0} سال تجربه در پروژه‌های مرتبط با ${expert.primarySpecialty ?? expert.profession}.`,
    portfolio: [
      {
        id: `${expert.id}-p1`,
        title: "نمونه پروژه اجرایی",
        imageSrc: "/images/portfolio/project-01.jpg",
        imageAlt: "نمونه پروژه ساختمانی اجراشده",
      },
      {
        id: `${expert.id}-p2`,
        title: "برداشت و مستندسازی پروژه",
        imageSrc: "/images/portfolio/project-02.jpg",
        imageAlt: "نمونه مستندات یک پروژه مهندسی",
      },
      {
        id: `${expert.id}-p3`,
        title: "جزئیات نهایی پروژه",
        imageSrc: "/images/portfolio/project-03.jpg",
        imageAlt: "جزئیات نمونه‌کار مهندسی",
      },
    ],
    reviews: [
      {
        id: `${expert.id}-r1`,
        authorName: "کاربر نمایشی",
        dateLabel: "نمونه طراحی",
        rating: 5,
        text: "پاسخ‌گویی منظم و توضیح روشن مراحل کار، انتخاب متخصص را برای ما ساده‌تر کرد.",
      },
      {
        id: `${expert.id}-r2`,
        authorName: "مالک پروژه",
        dateLabel: "هفته گذشته",
        rating: 4,
        text: "بازدید در زمان وعده‌داده‌شده انجام شد و گزارش کار برای ادامه پرونده قابل استفاده بود.",
      },
      {
        id: `${expert.id}-r3`,
        authorName: "همکار ساختمانی",
        dateLabel: "ماه گذشته",
        rating: 5,
        text: "توضیح محدوده خدمت شفاف بود و هماهنگی برای برداشت نقشه بدون رفت‌وبرگشت اضافه پیش رفت.",
      },
    ],
    relatedExperts: expertCards
      .filter(
        (item) =>
          item.id !== expert.id &&
          item.serviceSlugs?.some((slug) =>
            expert.serviceSlugs?.includes(slug),
          ),
      )
      .slice(0, 3),
  }),
);

const defaultProcess = [
  {
    id: "request",
    title: "نیازتان را مشخص کنید",
    description: "خدمت و شهر مورد نظر را انتخاب کنید.",
  },
  {
    id: "compare",
    title: "متخصصان را مقایسه کنید",
    description: "تخصص، سابقه و نمونه‌کارها را کنار هم ببینید.",
  },
  {
    id: "contact",
    title: "مستقیم ارتباط بگیرید",
    description: "پس از انتخاب، از راه تماس عمومی پروفایل گفتگو را شروع کنید.",
  },
] as const;

const surveyingFaqs = [
  {
    id: "survey-use",
    question: "نقشه‌برداری دقیقاً چه کاربردی دارد؟",
    answer:
      "نقشه‌برداری برای تعیین موقعیت، ابعاد، حدود و تراز ملک یا پروژه به‌کار می‌رود و مبنای بسیاری از تصمیم‌های ثبتی و اجرایی است.",
  },
  {
    id: "utm",
    question: "نقشه UTM چیست و چرا به آن نیاز داریم؟",
    answer:
      "نقشه UTM مختصات دقیق ملک را در یک سامانه مختصات مشخص ثبت می‌کند و در فرایندهایی مانند جانمایی، سند و بررسی حدود کاربرد دارد.",
  },
  {
    id: "documents",
    question: "برای تهیه نقشه UTM چه مدارکی لازم است؟",
    answer:
      "مدارک دقیق به نوع ملک و مرجع درخواست‌کننده بستگی دارد؛ تصویر سند و اطلاعات موقعیت ملک معمولاً نقطه شروع بررسی متخصص است.",
  },
  {
    id: "duration",
    question: "انجام خدمات نقشه‌برداری چقدر زمان می‌برد؟",
    answer:
      "زمان به مساحت، دسترسی، نوع برداشت و خروجی مورد نیاز وابسته است و پس از بررسی اولیه مشخص می‌شود.",
  },
  {
    id: "price",
    question: "هزینه خدمات نقشه‌برداری چگونه محاسبه می‌شود؟",
    answer:
      "مساحت، محل ملک، پیچیدگی سوابق و نوع خروجی در برآورد اثر دارند؛ برای عدد دقیق باید مدارک و موقعیت بررسی شود.",
  },
  {
    id: "as-built",
    question: "نقشه ازبیلت چیست؟",
    answer:
      "نقشه ازبیلت وضعیت اجراشده بنا یا تأسیسات را ثبت می‌کند تا تفاوت آن با نقشه طراحی مشخص شود.",
  },
] as const;

const serviceBase: Record<ServiceSlug, Omit<ServiceDetailData, "experts">> = {
  "land-surveying": {
    slug: "land-surveying",
    title: "نقشه‌برداری و سند مالکیت",
    eyebrow: "شبکه متخصصان نقشه‌برداری",
    description:
      "برای برداشت دقیق، نقشه UTM، جانمایی پلاک ثبتی و نقشه ازبیلت، متخصص مناسب شهر خود را پیدا کنید.",
    longDescription:
      "از تعیین مختصات و حدود ملک تا مستندسازی وضعیت اجراشده، اطلاعات متخصصان را شفاف مقایسه کنید و مسیر مناسب پروژه را بشناسید.",
    imageSrc: "/images/home/hero-construction.png",
    imageAlt: "متخصصان در حال بررسی نقشه در کارگاه ساختمانی",
    accent: "teal",
    specialties: [
      {
        id: "utm",
        title: "نقشه UTM",
        description:
          "تعیین مختصات دقیق و آماده‌سازی خروجی مورد نیاز فرایندهای ثبتی.",
      },
      {
        id: "cadastral",
        title: "جانمایی پلاک ثبتی",
        description: "بررسی سوابق و تطبیق موقعیت ملک با اطلاعات ثبتی.",
      },
      {
        id: "as-built",
        title: "نقشه ازبیلت",
        description:
          "ثبت وضعیت اجراشده ساختمان برای کنترل و پیگیری مراحل بعدی.",
      },
      {
        id: "apartment",
        title: "تفکیک آپارتمان",
        description: "برداشت و ترسیم بخش‌های مستقل و مشترک ساختمان.",
      },
    ],
    process: defaultProcess,
    faqs: surveyingFaqs,
  },
  "construction-workers": {
    slug: "construction-workers",
    title: "استادکار و پیمانکار ساختمان",
    eyebrow: "اجرای مطمئن پروژه",
    description:
      "از گودبرداری و سازه تا تأسیسات، نازک‌کاری و بازسازی، مجری مناسب پروژه را پیدا کنید.",
    longDescription:
      "پروفایل استادکاران و پیمانکاران را بر اساس حوزه اجرا، شهر و سابقه بررسی کنید؛ سپس برای ارزیابی دقیق محدوده کار مستقیم گفتگو کنید.",
    imageSrc: "/images/home/project-engineer.png",
    imageAlt: "مهندس در کارگاه در حال بررسی نقشه پروژه",
    accent: "orange",
    specialties: [
      {
        id: "structure",
        title: "اجرای سازه",
        description: "آرماتوربندی، قالب‌بندی و اجرای اسکلت بتنی یا فولادی.",
      },
      {
        id: "renovation",
        title: "بازسازی",
        description: "هماهنگی عملیات تخریب کنترل‌شده، اصلاح و تکمیل فضا.",
      },
      {
        id: "utilities",
        title: "تأسیسات",
        description: "اجرای برق، مکانیک و لوله‌کشی توسط نیروی متخصص.",
      },
      {
        id: "finishing",
        title: "نازک‌کاری",
        description: "اجرای دیوار، کف، رنگ و جزئیات پایانی ساختمان.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "contractor-choice",
        question: "چطور پیمانکار مناسب را انتخاب کنیم؟",
        answer:
          "حوزه تخصص، سابقه پروژه‌های مشابه، محدوده مسئولیت و شیوه گزارش‌دهی را پیش از شروع همکاری مقایسه کنید.",
      },
      {
        id: "scope",
        question: "چه اطلاعاتی برای برآورد اولیه لازم است؟",
        answer:
          "موقعیت پروژه، مرحله فعلی، نقشه‌ها، حجم تقریبی کار و زمان مورد انتظار به ارزیابی اولیه کمک می‌کند.",
      },
    ],
  },
  drawing: {
    slug: "drawing",
    title: "ترسیم نقشه‌های ساختمان",
    eyebrow: "معماری و مهندسی یکپارچه",
    description:
      "برای نقشه‌های معماری، سازه، برق و مکانیک با متخصص همان رشته ارتباط بگیرید.",
    longDescription:
      "هر بخش از نقشه ساختمان مسئولیت و خروجی متفاوتی دارد. تخصص و نرم‌افزارهای مورد استفاده مهندسان را ببینید و فرد متناسب با مرحله پروژه را انتخاب کنید.",
    imageSrc: "/images/articles/surveying.jpg",
    imageAlt: "نقشه‌ها و ابزار بررسی پروژه مهندسی",
    accent: "blue",
    specialties: [
      {
        id: "architecture",
        title: "نقشه معماری",
        description: "پلان، نما، مقطع و جزئیات معماری.",
      },
      {
        id: "structure",
        title: "نقشه سازه",
        description: "طراحی و ترسیم سازه بتنی، فولادی و صنعتی.",
      },
      {
        id: "electrical",
        title: "نقشه برق",
        description: "جانمایی و مسیرهای برق و سیستم‌های مرتبط.",
      },
      {
        id: "mechanical",
        title: "نقشه مکانیک",
        description: "تأسیسات مکانیکی، لوله‌کشی و تهویه.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "drawing-types",
        question: "کدام نقشه‌ها برای پروژه لازم است؟",
        answer:
          "نیاز پروژه به مرحله طراحی، ضوابط محل و نوع بنا وابسته است؛ معماری، سازه، برق و مکانیک معمولاً باید هماهنگ بررسی شوند.",
      },
      {
        id: "software",
        question: "نرم‌افزار متخصص چه اهمیتی دارد؟",
        answer:
          "نرم‌افزار ابزار تولید است؛ مهم‌تر از آن، تسلط متخصص، هماهنگی بین رشته‌ها و انطباق خروجی با نیاز پروژه است.",
      },
    ],
  },
  "interior-design": {
    slug: "interior-design",
    title: "طراحی نما و فضای داخلی",
    eyebrow: "فضایی زیبا، کاربردی و قابل اجرا",
    description:
      "طراح مناسب را برای نمای ساختمان، فضای داخلی یا محوطه پروژه پیدا کنید.",
    longDescription:
      "طراحی حرفه‌ای باید زیبایی، عملکرد، بودجه و امکان اجرا را کنار هم ببیند. نمونه‌کارها و رویکرد هر طراح را پیش از ارتباط بررسی کنید.",
    imageSrc: "/images/home/interior-design.png",
    imageAlt: "فضای داخلی روشن و معاصر",
    accent: "violet",
    specialties: [
      {
        id: "facade",
        title: "طراحی نما",
        description: "هویت بیرونی ساختمان با توجه به زمینه و امکان اجرا.",
      },
      {
        id: "interior",
        title: "طراحی داخلی",
        description: "سازمان‌دهی فضا، نور، متریال و جزئیات داخلی.",
      },
      {
        id: "landscape",
        title: "محوطه‌سازی",
        description: "طراحی مسیر، فضای سبز و ارتباط فضای باز با بنا.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "designer",
        question: "طراح داخلی چه کمکی به پروژه می‌کند؟",
        answer:
          "طراح نیازهای فضایی، نور، متریال، مبلمان و جزئیات اجرا را در یک راه‌حل هماهنگ جمع می‌کند.",
      },
      {
        id: "brief",
        question: "پیش از شروع طراحی چه چیزهایی آماده کنیم؟",
        answer:
          "ابعاد یا نقشه وضع موجود، نیازهای کاربران، محدودیت بودجه و نمونه‌های سلیقه‌ای نقطه شروع مناسبی هستند.",
      },
    ],
  },
  "building-permit": {
    slug: "building-permit",
    title: "پروانه ساخت و پایان کار",
    eyebrow: "مسیر مدارک و هماهنگی فنی",
    description:
      "برای بررسی مدارک، نقشه‌ها و مراحل فنی پروانه یا پایان کار، متخصص مرتبط را پیدا کنید.",
    longDescription:
      "فرایند دقیق به موقعیت و مرجع محلی وابسته است. متخصص می‌تواند مدارک موجود را بررسی کند، نیازهای فنی را توضیح دهد و مسیر اقدام را شفاف سازد.",
    imageSrc: "/images/home/hero-construction.png",
    imageAlt: "بررسی نقشه‌های ساختمانی در پروژه",
    accent: "green",
    specialties: [
      {
        id: "permit",
        title: "پروانه ساخت",
        description: "بررسی نیازهای فنی و مدارک مرحله صدور پروانه.",
      },
      {
        id: "completion",
        title: "پایان کار",
        description: "هماهنگی مدارک و نقشه‌های لازم برای پایان کار.",
      },
      {
        id: "as-built",
        title: "نقشه وضع موجود",
        description: "مستندسازی وضعیت اجرا برای مقایسه و پیگیری.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "permit-what",
        question: "پروانه ساخت چیست؟",
        answer:
          "پروانه ساخت مجوز شروع عملیات ساختمانی در محدوده ضوابط مرجع محلی است و مشخصات اصلی پروژه را ثبت می‌کند.",
      },
      {
        id: "completion-what",
        question: "پایان کار چه کاربردی دارد؟",
        answer:
          "پایان کار وضعیت اتمام ساختمان و بررسی آن در چارچوب فرایند مرجع محلی را مشخص می‌کند.",
      },
    ],
  },
  "administrative-services": {
    slug: "administrative-services",
    title: "خدمات اداری ساختمان",
    eyebrow: "پیگیری منظم پرونده‌های ساختمانی",
    description:
      "برای امور ثبتی، شهرداری، بنیاد مسکن و تغییر کاربری، کارشناس آشنا به فرایند را پیدا کنید.",
    longDescription:
      "کارشناس خدمات اداری مسیر پرونده، مدارک و مراجعات را روشن می‌کند. جزئیات هر پرونده باید با توجه به مرجع و وضعیت واقعی آن بررسی شود.",
    imageSrc: "/images/home/project-engineer.png",
    imageAlt: "کارشناس پروژه در حال بررسی مدارک و نقشه",
    accent: "rose",
    specialties: [
      {
        id: "registry",
        title: "امور ثبتی و سند",
        description: "پیگیری مدارک مرتبط با اداره ثبت و سند مالکیت.",
      },
      {
        id: "municipality",
        title: "امور شهرداری",
        description: "هماهنگی فرایندهای اداری پروانه و پایان کار.",
      },
      {
        id: "land-use",
        title: "تغییر کاربری",
        description: "بررسی مسیر اداری و مدارک اولیه تغییر کاربری.",
      },
      {
        id: "housing",
        title: "بنیاد مسکن",
        description: "پیگیری امور مرتبط با پرونده‌های بنیاد مسکن.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "admin-what",
        question: "خدمات اداری ساختمان شامل چه کارهایی است؟",
        answer:
          "بسته به پرونده می‌تواند شامل پیگیری ثبتی، شهرداری، پروانه، پایان کار، تغییر کاربری یا امور بنیاد مسکن باشد.",
      },
      {
        id: "documents",
        question: "چه مدارکی باید آماده باشد؟",
        answer:
          "مدارک به نوع پرونده وابسته است. متخصص پس از بررسی اولیه، فهرست مورد نیاز همان مسیر را مشخص می‌کند.",
      },
    ],
  },
};

export const mockServiceDetails: readonly ServiceDetailData[] = Object.values(
  serviceBase,
).map((service) => ({
  ...service,
  experts: expertCards.filter((expert) =>
    expert.serviceSlugs?.includes(service.slug),
  ),
}));

export const mockArticleCategories: readonly ArticleCategory[] = [
  {
    slug: "surveying",
    href: "/articles/categories/surveying",
    title: "نقشه‌برداری و سند",
    description: "راهنمای برداشت، نقشه UTM و فرایندهای مرتبط با ملک.",
  },
  {
    slug: "construction",
    href: "/articles/categories/construction",
    title: "پیمانکاری و اجرا",
    description: "نکته‌های انتخاب مجری و مدیریت اجرای ساختمان.",
  },
  {
    slug: "design",
    href: "/articles/categories/design",
    title: "طراحی و نقشه",
    description: "راهنمای طراحی معماری، سازه و فضای داخلی.",
  },
];

export const mockArticles: readonly Article[] = [
  {
    slug: "utm-map-difference",
    href: "/articles/utm-map-difference",
    title: "تفاوت نقشه UTM و نقشه‌برداری سند چیست؟",
    excerpt:
      "دو خروجی نزدیک اما با کاربردهای متفاوت را پیش از سفارش درست بشناسید.",
    coverSrc: "/images/articles/surveying.jpg",
    author: "تحریریه مهندس من",
    publishedAt: "۱۴ شهریور ۱۴۰۵",
    categorySlug: "surveying",
    categoryLabel: "نقشه‌برداری و سند",
    toc: [
      { id: "utm", label: "نقشه UTM چیست؟" },
      { id: "deed", label: "نقشه‌برداری سند چیست؟" },
      { id: "compare", label: "مقایسه کاربردها" },
    ],
    body: "نقشه UTM موقعیت و مختصات دقیق ملک را در یک سامانه مشخص ثبت می‌کند. این خروجی در جانمایی، تطبیق موقعیت و بسیاری از پیگیری‌های ثبتی کاربرد دارد.\n\nنقشه‌برداری سند علاوه بر برداشت میدانی می‌تواند به بررسی سوابق، حدود و انطباق اطلاعات ملک با مدارک موجود نیاز داشته باشد.\n\nانتخاب خدمت درست به مسئله اصلی پرونده، مرجع درخواست‌کننده و نوع خروجی مورد نیاز وابسته است. پیش از سفارش، مدارک موجود و هدف استفاده از نقشه را با متخصص در میان بگذارید.",
    faqs: surveyingFaqs.slice(1, 3),
    relatedServiceHref: "/services/land-surveying",
    relatedServiceLabel: "نقشه‌برداری",
    viewCount: 164,
  },
  {
    slug: "contractor-selection",
    href: "/articles/contractor-selection",
    title: "پیش از انتخاب پیمانکار ساختمان چه چیزهایی را بررسی کنیم؟",
    excerpt: "یک چک‌لیست کوتاه برای مقایسه سابقه، محدوده کار و شیوه همکاری.",
    author: "تحریریه مهندس من",
    publishedAt: "۹ شهریور ۱۴۰۵",
    categorySlug: "construction",
    categoryLabel: "پیمانکاری و اجرا",
    body: "نمونه‌کارهای مشابه، تعریف روشن محدوده کار، برنامه زمانی و شیوه گزارش‌دهی چهار نقطه شروع مهم هستند. گفت‌وگوی اولیه باید به پرسش‌های مشخص درباره مسئولیت‌ها و تحویل هر مرحله پاسخ دهد.",
    relatedServiceHref: "/services/construction-workers",
    relatedServiceLabel: "استادکار و پیمانکار",
  },
  {
    slug: "interior-design-brief",
    href: "/articles/interior-design-brief",
    title: "چطور برای طراحی داخلی یک شرح نیاز خوب آماده کنیم؟",
    excerpt:
      "نیازهای فضایی، بودجه و سلیقه را به زبان قابل استفاده برای طراح تبدیل کنید.",
    coverSrc: "/images/home/interior-design.png",
    author: "تحریریه مهندس من",
    publishedAt: "۳ شهریور ۱۴۰۵",
    categorySlug: "design",
    categoryLabel: "طراحی و نقشه",
    body: "فهرست کاربران فضا، فعالیت‌های روزانه، محدودیت بودجه و نمونه‌هایی که دوست دارید یا نمی‌پسندید را ثبت کنید. یک شرح نیاز خوب تصمیم‌ها را سریع‌تر و نتیجه را قابل ارزیابی‌تر می‌کند.",
    relatedServiceHref: "/services/interior-design",
    relatedServiceLabel: "طراحی نما و داخلی",
  },
];

export const mockFaqCategories: readonly FaqCategoryDetail[] = [
  {
    slug: "land-surveying",
    href: "/faq/land-surveying",
    title: "نقشه‌برداری و سند مالکیت",
    description: "پرسش‌های رایج درباره UTM، مدارک، زمان و کاربرد نقشه‌ها.",
    relatedServiceHref: "/services/land-surveying",
    relatedServiceLabel: "نقشه‌برداری",
    items: surveyingFaqs,
  },
  {
    slug: "construction",
    href: "/faq/construction",
    title: "پیمانکاری و استادکاری",
    description: "شروع همکاری، محدوده کار و انتخاب مجری.",
    relatedServiceHref: "/services/construction-workers",
    relatedServiceLabel: "استادکار و پیمانکار",
    items: serviceBase["construction-workers"].faqs,
  },
  {
    slug: "drawing",
    href: "/faq/drawing",
    title: "ترسیم نقشه ساختمان",
    description: "معماری، سازه، برق، مکانیک و هماهنگی نقشه‌ها.",
    relatedServiceHref: "/services/drawing",
    relatedServiceLabel: "ترسیم نقشه",
    items: serviceBase.drawing.faqs,
  },
  {
    slug: "permit",
    href: "/faq/permit",
    title: "پروانه ساخت و پایان کار",
    description: "مفاهیم اولیه و مسیر بررسی مدارک.",
    relatedServiceHref: "/services/building-permit",
    relatedServiceLabel: "پروانه ساخت",
    items: serviceBase["building-permit"].faqs,
  },
  {
    slug: "registration",
    href: "/faq/registration",
    title: "ثبت‌نام متخصصان",
    description: "اطلاعات لازم برای ساخت پروفایل حرفه‌ای.",
    items: [
      {
        id: "registration-data",
        question: "برای ثبت‌نام چه اطلاعاتی لازم است؟",
        answer:
          "هویت، محدوده خدمت، تخصص‌ها، اطلاعات حرفه‌ای، تحصیلات و نمونه‌کارها طی چند مرحله دریافت می‌شوند. ثبت نهایی به اتصال سرویس ثبت‌نام وابسته است.",
      },
    ],
  },
];

export const mockKnowledgeCategories: readonly KnowledgeCategoryDetail[] = [
  {
    slug: "land-surveying",
    href: "/knowledge/land-surveying",
    title: "نقشه‌برداری و سند مالکیت",
    description: "نکته‌های کوتاه پیش از برداشت و پیگیری امور ملک.",
    relatedServiceHref: "/services/land-surveying",
    relatedServiceLabel: "نقشه‌برداری",
    tips: [
      {
        id: "survey-tip-1",
        title: "نکته ۱",
        body: "پیش از حضور نقشه‌بردار، تصویر مدارک ملک و موقعیت دسترسی را آماده کنید تا نوع برداشت بهتر مشخص شود.",
      },
      {
        id: "survey-tip-2",
        title: "نکته ۲",
        body: "در پروژه‌های اجرایی، نقاط مبنای ارتفاعی باید در محل امن و خارج از محدوده عملیات تثبیت شوند.",
      },
      {
        id: "survey-tip-3",
        title: "نکته ۳",
        body: "نام خروجی مورد درخواست مرجع اداری را دقیق بپرسید؛ UTM، ازبیلت و تفکیک آپارتمان کاربرد یکسان ندارند.",
      },
    ],
  },
  {
    slug: "permit",
    href: "/knowledge/permit",
    title: "پروانه ساخت",
    description: "آمادگی مدارک و هماهنگی مراحل فنی.",
    relatedServiceHref: "/services/building-permit",
    relatedServiceLabel: "پروانه ساخت",
    tips: [
      {
        id: "permit-tip-1",
        title: "مدارک را مرحله‌بندی کنید",
        body: "مدارک مالکیت، نقشه‌ها و مکاتبات را بر اساس مرحله پرونده مرتب کنید تا بررسی اولیه سریع‌تر انجام شود.",
      },
    ],
  },
  {
    slug: "design",
    href: "/knowledge/design",
    title: "طراحی نما و داخلی",
    description: "نکته‌های تعریف نیاز، نور، متریال و اجرا.",
    relatedServiceHref: "/services/interior-design",
    relatedServiceLabel: "طراحی نما و داخلی",
    tips: [
      {
        id: "design-tip-1",
        title: "شرح نیاز را پیش از طرح آماده کنید",
        body: "نیازهای کاربران، محدودیت بودجه و اولویت‌های عملکردی را پیش از انتخاب سبک ثبت کنید.",
      },
    ],
  },
  {
    slug: "execution",
    href: "/knowledge/execution",
    title: "نکات اجرایی و فنی",
    description: "یادآوری‌های کوتاه برای هماهنگی بهتر در کارگاه.",
    relatedServiceHref: "/services/construction-workers",
    relatedServiceLabel: "پیمانکاری و اجرا",
    tips: [
      {
        id: "execution-tip-1",
        title: "تحویل هر مرحله را ثبت کنید",
        body: "پیش از شروع مرحله بعد، وضعیت اجرای فعلی و موارد نیازمند اصلاح را مستند کنید.",
      },
    ],
  },
];

export const mockHomePopularServices = [
  {
    id: "utm",
    title: "نقشه UTM و سند مالکیت",
    description: "برداشت دقیق و خروجی مناسب پیگیری ملک",
    href: "/services/land-surveying",
    imageSrc: "/images/articles/surveying.jpg",
  },
  {
    id: "structure",
    title: "پیمانکاری سازه ساختمان",
    description: "مقایسه مجریان سازه و بازسازی",
    href: "/services/construction-workers",
    imageSrc: "/images/home/project-engineer.png",
  },
  {
    id: "interior",
    title: "طراحی نما و فضای داخلی",
    description: "انتخاب طراح بر اساس رویکرد و نمونه‌کار",
    href: "/services/interior-design",
    imageSrc: "/images/home/interior-design.png",
  },
] as const;

export const mockDrawingServices = [
  {
    id: "architectural",
    title: "نقشه معماری",
    description: "پلان، نما، مقطع و جزئیات",
    href: "/services/drawing",
  },
  {
    id: "structural",
    title: "نقشه سازه",
    description: "بتنی، فولادی و صنعتی",
    href: "/services/drawing",
  },
  {
    id: "electrical",
    title: "نقشه برق",
    description: "برق و سیستم‌های مرتبط",
    href: "/services/drawing",
  },
  {
    id: "mechanical",
    title: "نقشه مکانیک",
    description: "تهویه، لوله‌کشی و تأسیسات",
    href: "/services/drawing",
  },
] as const;

export const mockExpertCards = expertCards;

export {
  mockEngineerConversations,
  mockEngineerCredentials,
  mockEngineerMessagesByConversation,
  mockEngineerNotifications,
  mockEngineerPublicExpertId,
  mockEngineerRequests,
} from "@/lib/mock-data/engineer-workspace-mock-data";
