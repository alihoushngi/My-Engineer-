import { Button } from "@/components/ui/button/button";
import { ExpertContactDrawer } from "@/components/store/expert/expertContactDrawer/expertContactDrawer";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import {
  getPublicPhone,
  getPublicSms,
  hasPublicContact,
} from "@/lib/experts/expert-profile/expert-profile";

type ExpertStickyContactBarProps = {
  expert: ExpertProfile;
};

export function ExpertStickyContactBar({
  expert,
}: ExpertStickyContactBarProps) {
  if (!hasPublicContact(expert)) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <div className="glass-chrome border-t border-border px-page pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <ExpertContactDrawer
          expertName={expert.name}
          phone={getPublicPhone(expert.contact)}
          sms={getPublicSms(expert.contact)}
          trigger={
            <Button type="button" className="w-full" size="lg">
              {expertProfileCopy.contactLabel}
            </Button>
          }
        />
      </div>
    </div>
  );
}
