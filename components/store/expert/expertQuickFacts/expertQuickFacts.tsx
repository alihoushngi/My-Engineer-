import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type QuickFact = {
  label: string;
  value: string;
};

type ExpertQuickFactsProps = {
  expert: ExpertProfile;
};

export function ExpertQuickFacts({ expert }: ExpertQuickFactsProps) {
  const facts: QuickFact[] = [];

  if (typeof expert.experienceYears === "number") {
    facts.push({
      label: expertProfileCopy.experienceYearsLabel,
      value: `${formatFaNumber(expert.experienceYears)} ${expertProfileCopy.yearsSuffix}`,
    });
  }

  if (expert.primarySpecialty) {
    facts.push({
      label: expertProfileCopy.specialtiesTitle,
      value: expert.primarySpecialty,
    });
  }

  if (expert.city) {
    facts.push({
      label: expertProfileCopy.cityLabel,
      value: expert.city,
    });
  }

  if (expert.discipline) {
    facts.push({
      label: expertProfileCopy.disciplineLabel,
      value: expert.discipline,
    });
  }

  if (facts.length === 0) {
    return null;
  }

  return (
    <section aria-label="خلاصه اطلاعات" className="container-app py-page">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="space-y-1">
            <dt className="type-caption text-muted-foreground">{fact.label}</dt>
            <dd className="type-body font-medium text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
