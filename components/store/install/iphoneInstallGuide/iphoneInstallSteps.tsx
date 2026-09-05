import { IphoneStepVisual } from "@/components/store/install/iphoneInstallGuide/iphoneStepVisual";
import { Card } from "@/components/ui/card/card";

const installSteps = [
  {
    title: "صفحه را در Safari باز کنید",
    description:
      "Safari را روی آیفون باز کنید و وارد وب‌سایت مهندس من شوید. نصب از مرورگرهای دیگر ممکن است گزینه لازم را نشان ندهد.",
    variant: "safari",
  },
  {
    title: "دکمه اشتراک‌گذاری را بزنید",
    description:
      "در نوار ابزار Safari روی نماد مربع با پیکان رو به بالا بزنید. جای این دکمه ممکن است با نسخه iOS کمی متفاوت باشد.",
    variant: "share",
  },
  {
    title: "گزینه افزودن به صفحه اصلی را انتخاب کنید",
    description: (
      <>
        در فهرست بازشده گزینه{" "}
        <bdi dir="ltr" className="font-medium">
          Add to Home Screen
        </bdi>{" "}
        را پیدا کنید. اگر دیده نمی‌شود، فهرست را به پایین پیمایش کنید.
      </>
    ),
    variant: "add-menu",
  },
  {
    title: "نام و آیکن را بررسی کنید",
    description:
      "پیش‌نمایش آیکن و نام «مهندس من» نمایش داده می‌شود. می‌توانید نام میان‌بر را کوتاه‌تر کنید.",
    variant: "preview",
  },
  {
    title: "روی Add بزنید",
    description: (
      <>
        دکمه <bdi dir="ltr">Add</bdi> را در بالای صفحه بزنید تا وب‌اپ به صفحه
        اصلی اضافه شود.
      </>
    ),
    variant: "confirm",
  },
  {
    title: "مهندس من را از Home Screen باز کنید",
    description:
      "به صفحه اصلی آیفون برگردید و روی آیکن مهندس من بزنید. وب‌اپ در پنجره مستقل و بدون نوار مرورگر باز می‌شود.",
    variant: "home",
  },
] as const;

export function IphoneInstallSteps() {
  return (
    <ol className="grid gap-4 lg:grid-cols-2">
      {installSteps.map((step, index) => (
        <li key={step.variant}>
          <Card className="h-full gap-5 sm:flex-row sm:items-center">
            <IphoneStepVisual variant={step.variant} />
            <div className="min-w-0 flex-1">
              <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h2 className="type-h3">{step.title}</h2>
              <p className="mt-2 type-body-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
