import type { Metadata } from "next";
import { IphoneInstallGuide } from "@/components/store/install/iphoneInstallGuide/iphoneInstallGuide";
import { storePaths } from "@/config/navigation.config/navigation.config";

export const metadata: Metadata = {
  title: "نصب مهندس من روی آیفون",
  description:
    "راهنمای مرحله‌به‌مرحله افزودن وب‌اپ مهندس من به صفحه اصلی آیفون با Safari.",
  alternates: {
    canonical: storePaths.iphoneInstall,
  },
};

export default function IphoneInstallPage() {
  return <IphoneInstallGuide />;
}
