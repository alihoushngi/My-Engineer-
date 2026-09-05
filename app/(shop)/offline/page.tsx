import type { Metadata } from "next";
import { WifiOffIcon } from "lucide-react";
import { OfflineActions } from "@/components/store/offline/offlineActions/offlineActions";

export const metadata: Metadata = {
  title: "اتصال اینترنت برقرار نیست",
  description: "صفحه آفلاین مهندس من",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="container-narrow flex min-h-[60dvh] items-center py-page">
      <section className="w-full rounded-xl border border-border bg-surface p-6 text-center shadow-sm sm:p-10">
        <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full bg-primary-subtle text-primary-deep">
          <WifiOffIcon aria-hidden="true" className="size-7" />
        </span>
        <h1 className="type-h1">اتصال اینترنت برقرار نیست</h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          اتصال دستگاه را بررسی کنید و دوباره تلاش کنید. بعضی از صفحات عمومی که
          قبلاً دیده‌اید ممکن است همچنان در دسترس باشند.
        </p>
        <OfflineActions />
      </section>
    </div>
  );
}
