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
      className="py-8 first:pt-0"
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
              className="type-body leading-loose text-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
