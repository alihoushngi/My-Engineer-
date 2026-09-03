import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type RelatedExpertsProps = {
  experts?: readonly ExpertCardData[];
  excludeId?: string;
};

export function RelatedExperts({ experts, excludeId }: RelatedExpertsProps) {
  const items = (experts ?? []).filter((expert) => expert.id !== excludeId);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-experts-heading"
      className="border-t border-border bg-surface-muted"
    >
      <div className="container-app py-page">
        <div className="space-y-8">
          <SectionHeader
            titleId="related-experts-heading"
            title={expertProfileCopy.relatedTitle}
          />
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((expert) => (
              <li key={expert.id} className="min-w-0">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
