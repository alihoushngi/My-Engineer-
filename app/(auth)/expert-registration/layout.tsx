import { type Metadata } from "next";
import { type ReactNode } from "react";
import { RegistrationWizardProvider } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { RegistrationShell } from "@/components/store/registration/registrationShell/registrationShell";
import { registrationCopy } from "@/config/registration.config/registration.config";

export const metadata: Metadata = {
  title: registrationCopy.wizardTitle,
  robots: {
    index: false,
    follow: false,
  },
};

type ExpertRegistrationLayoutProps = {
  children: ReactNode;
};

export default function ExpertRegistrationLayout({
  children,
}: ExpertRegistrationLayoutProps) {
  return (
    <RegistrationWizardProvider>
      <RegistrationShell>{children}</RegistrationShell>
    </RegistrationWizardProvider>
  );
}
