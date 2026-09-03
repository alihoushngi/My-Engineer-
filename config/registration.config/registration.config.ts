export const REGISTRATION_STEPS = [
  { index: 1, label: "اطلاعات اولیه", path: "/expert-registration" },
  { index: 2, label: "تأیید شماره", path: "/expert-registration/otp" },
  {
    index: 3,
    label: "منطقه خدمات",
    path: "/expert-registration/service-area",
  },
  { index: 4, label: "تخصص", path: "/expert-registration/expertise" },
  {
    index: 5,
    label: "اطلاعات شخصی",
    path: "/expert-registration/personal-info",
  },
  { index: 6, label: "تحصیلات", path: "/expert-registration/education" },
  {
    index: 7,
    label: "سازمان نظام",
    path: "/expert-registration/engineering-organization",
  },
  {
    index: 8,
    label: "سوابق",
    path: "/expert-registration/professional-resume",
  },
  { index: 9, label: "نمونه‌کار", path: "/expert-registration/portfolio" },
] as const;

export const TOTAL_REGISTRATION_STEPS = 9;

/** Cooldown seconds between OTP resend requests. SOURCE: legacy step2 timer = 120s */
export const OTP_RESEND_COOLDOWN_SECONDS = 120;

export const OTP_LENGTH = 5;

export const registrationCopy = {
  // Wizard chrome
  wizardTitle: "ثبت‌نام متخصص",
  stepOf: (current: number, total: number) => `مرحله ${current} از ${total}`,
  backLabel: "بازگشت",
  continueLabel: "ادامه",
  submitLabel: "ثبت",
  errorGenericTitle: "خطا در ارسال اطلاعات",
  errorGenericDescription:
    "لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت با پشتیبانی تماس بگیرید.",
  retryLabel: "تلاش دوباره",
  // Step 1
  step1Title: "اطلاعات اولیه",
  step1Description:
    "شماره موبایل و کد ملی خود را وارد کنید. این اطلاعات برای تأیید هویت استفاده می‌شود.",
  mobileLabel: "شماره موبایل",
  mobilePlaceholder: "09xxxxxxxxx",
  mobileHelp:
    "شماره موبایل باید به نام شما باشد. پیامک تأیید به همین شماره ارسال می‌شود.",
  nationalIdLabel: "کد ملی",
  nationalIdPlaceholder: "xxxxxxxxxx",
  termsLabel: "شرایط استفاده و حریم خصوصی را خواندم و می‌پذیرم",
  termsLink: "شرایط استفاده",
  privacyLink: "حریم خصوصی",
  // Step 2
  step2Title: "تأیید شماره موبایل",
  step2Description: (phone: string) =>
    `کد پنج‌رقمی ارسال‌شده به شماره ${phone} را وارد کنید.`,
  otpLabel: "کد تأیید",
  otpInvalidError: "کد وارد‌شده صحیح نیست.",
  otpExpiredError: "کد منقضی شده است. لطفاً کد جدید بخواهید.",
  resendLabel: "ارسال مجدد کد",
  resendCooldown: (seconds: number) => `ارسال مجدد (${seconds} ثانیه)`,
  editPhoneLabel: "ویرایش شماره موبایل",
  verifyLabel: "تأیید و ادامه",
  // Step 3
  step3Title: "منطقه خدمات",
  step3Description: "استان و شهر اصلی ارائه خدمات خود را انتخاب کنید.",
  provinceLabel: "استان",
  provincePlaceholder: "انتخاب استان",
  cityLabel: "شهر",
  cityPlaceholder: "انتخاب شهر",
  nearbyCitiesLabel: "شهرهای مجاور (اختیاری)",
  nearbyCitiesHelp:
    "شهرهای دیگری که در آن‌ها هم خدمات ارائه می‌دهید را انتخاب کنید.",
  cityLoadingMessage: "در حال بارگذاری شهرها...",
  cityEmptyMessage: "هیچ شهری برای این استان یافت نشد.",
  cityErrorMessage: "بارگذاری شهرها ناموفق بود.",
  provinceLoadingMessage: "در حال بارگذاری استان‌ها...",
  provinceErrorMessage: "بارگذاری استان‌ها ناموفق بود.",
  nearbyCitiesApiNote:
    "انتخاب شهرهای مجاور پس از اتصال سرویس در این مرحله فعال می‌شود.",
} as const;
