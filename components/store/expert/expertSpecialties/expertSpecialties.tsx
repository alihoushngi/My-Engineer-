import { ExpertTagSection } from "@/components/store/expert/expertTagSection/expertTagSection";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ExpertSpecialtiesProps = {
  specialties: readonly string[];
};

export function ExpertSpecialties({ specialties }: ExpertSpecialtiesProps) {
  return (
    <ExpertTagSection
      title={expertProfileCopy.specialtiesTitle}
      titleId="expert-specialties-heading"
      items={specialties}
    />
  );
}
