import { type ReactNode } from "react";
import { RegistrationWizardProvider } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { RegistrationShell } from "@/components/store/registration/registrationShell/registrationShell";

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
