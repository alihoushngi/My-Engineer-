import { type ExpertProfile } from "@/types/store/expert.types";
import {
  isDevelopmentExpertPreviewId,
  type DevelopmentExpertPreviewId,
} from "@/lib/experts/expert-profile/expert-profile";

const populatedPreview: ExpertProfile = {
  id: "dev-preview",
  name: "نمونه نمایشی متخصص",
  profession: "مهندس عمران",
  primarySpecialty: "نقشه‌برداری",
  shortIntroduction:
    "این معرفی کوتاه فقط برای بررسی قالب پروفایل در محیط توسعه است.",
  about:
    "این متن یک معرفی نمایشی است و به هیچ متخصص واقعی تعلق ندارد. هدف آن آزمودن خوانایی پاراگراف‌های متوسط در نسخه موبایل و دسکتاپ است.\n\nبخش دوم معرفی نمایشی است تا شکست خط، فاصله‌گذاری و دکمه ادامه در متن‌های بلندتر بررسی شود. هیچ ادعا، امتیاز یا سابقه‌ای در این متن جنبه تولیدی ندارد.",
  isVerified: true,
  isActive: true,
  experienceYears: 10,
  city: "شهر نمایشی",
  discipline: "عمران",
  serviceCities: [
    "شهر نمایشی",
    "شهرک نمونه",
    "بندر نمونه",
    "ناحیه آزمایشی یک",
    "ناحیه آزمایشی دو",
    "ناحیه آزمایشی سه",
    "ناحیه آزمایشی چهار",
    "ناحیه آزمایشی پنج",
  ],
  specialties: [
    "نقشه‌برداری",
    "نقشه UTM",
    "تفکیک اراضی",
    "برداشت ملک",
    "پیاده‌سازی نقشه",
    "نقشه ازبیلت",
    "جانمایی پلاک ثبتی",
    "نقشه تفکیک آپارتمان",
  ],
  software: ["AutoCAD", "Civil 3D", "Revit"],
  education: [
    {
      degree: "کارشناسی ارشد",
      field: "مهندسی عمران",
    },
  ],
  organizationMembership: {
    label: "عضو سازمان نظام مهندسی (نمونه نمایشی)",
  },
  license: {
    title: "پروانه اشتغال",
    competencies: ["طراحی", "نظارت", "اجرا"],
  },
  history:
    "این سابقه یک متن آزاد نمایشی است. در محصول واقعی فقط متن ثبت‌شده در پروفایل عمومی نمایش داده می‌شود و هیچ رکورد شغلی ساختگی به آن اضافه نمی‌شود.",
  portfolio: [
    {
      id: "preview-1",
      title: "نمونه‌کار نمایشی ۱",
      description: "عنوان و توضیح نمایشی برای بررسی گالری.",
    },
    {
      id: "preview-2",
      title: "نمونه‌کار نمایشی ۲",
      description: "بدون تصویر واقعی؛ فقط سطح خنثی.",
    },
    {
      id: "preview-3",
      title: "نمونه‌کار نمایشی ۳",
    },
    {
      id: "preview-4",
      title: "نمونه‌کار نمایشی ۴",
    },
    {
      id: "preview-5",
      title: "نمونه‌کار نمایشی ۵",
    },
    {
      id: "preview-6",
      title: "نمونه‌کار نمایشی ۶",
    },
  ],
  rating: 4.5,
  reviewCount: 2,
  reviews: [
    {
      id: "preview-review-1",
      authorName: "کاربر نمایشی",
      dateLabel: "نمونه",
      text: "این نظر یک نمونه نمایشی است و توسط کاربر واقعی نوشته نشده.",
      rating: 5,
      replyText: "این پاسخ نیز نمایشی است.",
    },
    {
      id: "preview-review-2",
      authorName: "بازدیدکننده نمایشی",
      text: "متن نظر نمایشی برای بررسی طول خط و سلسله‌مراتب.",
      rating: 4,
    },
  ],
  relatedExperts: [
    {
      id: "dev-preview-sparse",
      href: "/experts/dev-preview-sparse",
      name: "نمونه نمایشی محدود",
      profession: "مهندس عمران",
      primarySpecialty: "ترسیم نقشه",
    },
  ],
};

const sparsePreview: ExpertProfile = {
  id: "dev-preview-sparse",
  name: "نمونه نمایشی محدود با نام بسیار طولانی برای آزمایش شکست خط در هدر پروفایل متخصص",
  profession: "مهندس معماری",
};

const previews: Record<DevelopmentExpertPreviewId, ExpertProfile> = {
  "dev-preview": populatedPreview,
  "dev-preview-sparse": sparsePreview,
};

export function getDevExpertPreview(id: string): ExpertProfile | null {
  if (!isDevelopmentExpertPreviewId(id)) {
    return null;
  }

  return previews[id];
}
