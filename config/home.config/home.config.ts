import { storePaths } from "@/config/navigation.config/navigation.config";

export const homeHeroCopy = {
  title: "پلتفرم جامع خدمات ساختمانی در سراسر کشور",
  description: "متخصص ساختمانی پیدا کنید و به‌صورت رایگان با او در تماس باشید.",
  searchLabel: "جستجو در خدمات و متخصصین",
  cityLabel: "انتخاب شهر",
} as const;

export const homeServicesCopy = {
  title: "به‌دنبال چه خدمتی هستید؟",
  description: "یکی از خدمات را انتخاب کنید تا متخصصان همان حوزه را ببینید.",
} as const;

export const homeNarrativeCopy = {
  title: "مهندس من چیست؟",
  description:
    "مهندس من بستری برای پیدا کردن مهندسان، پیمانکاران و متخصصان ساختمان و ارتباط مستقیم با آن‌هاست.",
} as const;

export const homeWhyCopy = {
  title: "چرا مهندس من؟",
  items: [
    {
      title: "خدمات متنوع ساختمانی",
      description:
        "از نقشه‌برداری تا خدمات اداری، مسیر ورود به هر خدمت مشخص است.",
    },
    {
      title: "دسترسی رایگان و مستقیم",
      description:
        "می‌توانید متخصص را پیدا کنید و بدون واسطه با او تماس بگیرید.",
    },
    {
      title: "شفافیت اطلاعات",
      description:
        "سوابق و اطلاعات حرفه‌ای در پروفایل متخصص نمایش داده می‌شود.",
    },
    {
      title: "جستجو بر اساس شهر",
      description: "با انتخاب شهر، متخصصان همان محدوده را بررسی می‌کنید.",
    },
  ],
} as const;

export const homeContentCopy = {
  title: "محتوا و راهنما",
  description:
    "مطالب، نکته‌ها و پرسش‌های رایج را از مسیرهای اصلی سایت بخوانید.",
  items: [
    {
      href: storePaths.articles,
      title: "مقالات",
      description: "مطالب خواندنی درباره خدمات ساختمانی.",
    },
    {
      href: storePaths.knowledge,
      title: "دانش",
      description: "نکته‌ها و راهنمایی‌های کاربردی.",
    },
    {
      href: storePaths.faq,
      title: "سوالات متداول",
      description: "پاسخ پرسش‌های رایج کاربران.",
    },
  ],
} as const;

export const homeFaqCopy = {
  title: "سوالات متداول",
  description: "پاسخ پرسش‌های رایج را در بخش سوالات متداول ببینید.",
  actionLabel: "مشاهده سوالات متداول",
  href: storePaths.faq,
} as const;

export const homeJoinCopy = {
  title: "متخصص هستید؟",
  description:
    "اگر متخصص ساختمان هستید، ثبت‌نام کنید تا در فهرست خدمات دیده شوید.",
} as const;

export type MappedHomeLink = {
  label: string;
  href: string;
};

export const popularServiceItems: readonly MappedHomeLink[] = [];

export const drawingConsultationItems: readonly MappedHomeLink[] = [];
