import { RegistrationWizardProvider } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { AuthShell } from "@/components/layout/authShell/authShell";
import { IdentityStep } from "@/components/store/registration/identityStep/identityStep";
import { OtpStep } from "@/components/store/registration/otpStep/otpStep";
import { ServiceAreaStep } from "@/components/store/registration/serviceAreaStep/serviceAreaStep";
import { ExpertiseStep } from "@/components/store/registration/expertiseStep/expertiseStep";
import { PersonalInfoStep } from "@/components/store/registration/personalInfoStep/personalInfoStep";
import { EducationStep } from "@/components/store/registration/educationStep/educationStep";
import { OrganizationStep } from "@/components/store/registration/organizationStep/organizationStep";
import { ProfessionalResumeStep } from "@/components/store/registration/professionalResumeStep/professionalResumeStep";
import { PortfolioStep } from "@/components/store/registration/portfolioStep/portfolioStep";
import { RegistrationComplete } from "@/components/store/registration/registrationComplete/registrationComplete";

export default async function Review({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;
  const views = [
    <IdentityStep key="IdentityStep" />,
    <OtpStep key="OtpStep" />,
    <ServiceAreaStep key="ServiceAreaStep" />,
    <ExpertiseStep key="ExpertiseStep" />,
    <PersonalInfoStep key="PersonalInfoStep" />,
    <EducationStep key="EducationStep" />,
    <OrganizationStep key="OrganizationStep" />,
    <ProfessionalResumeStep key="ProfessionalResumeStep" />,
    <PortfolioStep key="PortfolioStep" />,
    <RegistrationComplete key="RegistrationComplete" />,
  ];
  return (
    <AuthShell>
      <div className="mx-auto max-w-xl rounded-lg bg-surface p-5 sm:p-8">
        <RegistrationWizardProvider>
          {views[Number(step ?? 1) - 1]}
        </RegistrationWizardProvider>
      </div>
    </AuthShell>
  );
}
