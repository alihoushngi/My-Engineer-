import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { hasText } from "@/lib/experts/expert-profile/expert-profile";

type ExpertExperienceProps = {
  history?: string;
};

export function ExpertExperience({ history }: ExpertExperienceProps) {
  if (!hasText(history)) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-experience-heading"
      className="container-app py-10 sm:py-12"
    >
      <div className="max-w-3xl space-y-6">
        <SectionHeader
          titleId="expert-experience-heading"
          title={expertProfileCopy.experienceTitle}
        />
        <div className="space-y-4">
          {history.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="type-body text-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
