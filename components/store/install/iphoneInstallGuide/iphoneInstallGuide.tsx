import { SmartphoneIcon } from "lucide-react";
import { InstallStatusBanner } from "@/components/store/install/iphoneInstallGuide/installStatus";
import { IphoneInstallSteps } from "@/components/store/install/iphoneInstallGuide/iphoneInstallSteps";

export function IphoneInstallGuide() {
  return (
    <div className="bg-background-subtle py-page">
      <div className="container-app space-y-8 sm:space-y-10">
        <section className="mx-auto max-w-3xl text-center">
          <span className="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary-subtle text-primary-deep">
            <SmartphoneIcon aria-hidden="true" className="size-6" />
          </span>
          <h1 className="type-display">نصب مهندس من روی آیفون</h1>
          <p className="mx-auto mt-3 max-w-2xl type-body-lg text-muted-foreground">
            برای دسترسی سریع‌تر، وب‌اپ مهندس من را با Safari به صفحه اصلی آیفون
            اضافه کنید. این فرایند دستی است و به App Store نیاز ندارد.
          </p>
        </section>

        <div className="mx-auto max-w-3xl">
          <InstallStatusBanner />
        </div>

        <IphoneInstallSteps />

        <aside className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-5 type-body-sm text-muted-foreground">
          <h2 className="type-h4 text-foreground">نکته‌های مهم</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5">
            <li>برای اولین بار، صفحه را با اینترنت باز کنید.</li>
            <li>
              ظاهر و محل گزینه‌ها ممکن است در نسخه‌های مختلف iOS کمی تغییر کند.
            </li>
            <li>
              قابلیت آفلاین محدود است؛ صفحات عمومی بازدیدشده و صفحه راهنمای
              آفلاین در دسترس می‌مانند، اما جست‌وجو، API و ثبت‌نام به اینترنت
              نیاز دارند.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
