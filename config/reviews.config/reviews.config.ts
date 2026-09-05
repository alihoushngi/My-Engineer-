export const reviewsCopy = {
  submitLabel: "ثبت نظر",
  submitTitle: "ثبت نظر برای متخصص",
  submitDescription:
    "امتیاز و متن نظر پس از پایان درخواست مرتبط ثبت می‌شود. نظر مهندس با نظر مقاله یکی نیست.",
  ratingLabel: "امتیاز",
  ratingOptionLabel: "امتیاز",
  ratingRequired: "امتیاز را از یک تا پنج انتخاب کنید.",
  commentLabel: "متن نظر",
  commentHint: "حداقل ده نویسه. شماره موبایل لازم نیست.",
  commentMinError: "متن نظر باید حداقل ده نویسه باشد.",
  commentMaxError: "متن نظر طولانی‌تر از حد مجاز است.",
  submitCta: "ارسال نظر",
  viewReview: "مشاهده نظر",
  relatedRequest: "درخواست مرتبط",
  relatedService: "خدمت",
  relatedExpert: "متخصص",
  submitIneligible: "برای این درخواست امکان ثبت نظر وجود ندارد.",
  submitUnauthorized: "برای ثبت نظر باید وارد حساب مشتری شوید.",
  submitUnavailable:
    "ثبت نظر پس از اتصال سرویس نظر فعال می‌شود. مسیر API هنوز تعریف نشده است.",
  mutationErrorFallback: "ثبت نظر انجام نشد. دوباره تلاش کنید.",
  detailDescription: "متن کامل نظر ثبت‌شده برای متخصص.",
  reviewNotFoundTitle: "نظر پیدا نشد",
} as const;

export const REVIEW_COMMENT_MIN_LENGTH = 10;
export const REVIEW_COMMENT_MAX_LENGTH = 2000;
