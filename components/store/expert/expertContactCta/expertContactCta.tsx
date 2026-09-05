import { Button } from "@/components/ui/button/button";
import { ExpertContactDrawer } from "@/components/store/expert/expertContactDrawer/expertContactDrawer";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import {
  getPublicPhone,
  getPublicSms,
  hasPublicContact,
} from "@/lib/experts/expert-profile/expert-profile";

type ExpertContactCtaProps = {
  expert: ExpertProfile;
};

export function ExpertContactCta({ expert }: ExpertContactCtaProps) {
  const canContact = hasPublicContact(expert);

  return (
    <section
      aria-labelledby="expert-contact-cta-heading"
      className="border-t border-border"
    >
      <div className="flex flex-col gap-5 pt-6">
        <div className="space-y-2">
          <h2
            id="expert-contact-cta-heading"
            className="type-h3 text-foreground"
          >
            {canContact
              ? expertProfileCopy.ctaTitle
              : expertProfileCopy.contactUnavailableTitle}
          </h2>
          <p className="type-body text-muted-foreground">
            {canContact
              ? expertProfileCopy.contactDescription
              : expertProfileCopy.contactUnavailableDescription}
          </p>
        </div>
        {canContact ? (
          <ExpertContactDrawer
            expertName={expert.name}
            phone={getPublicPhone(expert.contact)}
            sms={getPublicSms(expert.contact)}
            trigger={
              <Button type="button" size="lg" className="w-full">
                {expertProfileCopy.contactLabel}
              </Button>
            }
          />
        ) : null}
      </div>
    </section>
  );
}
