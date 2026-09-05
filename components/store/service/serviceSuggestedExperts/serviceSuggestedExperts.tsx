import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type ServiceSuggestedExpertsProps = {
  experts: readonly ExpertCardData[];
};

export function ServiceSuggestedExperts({
  experts,
}: ServiceSuggestedExpertsProps) {
  if (experts.length === 0) {
    return null;
  }

  return (
    <aside className="space-y-4">
      <h3 className="type-h3">{serviceFilterCopy.suggestedTitle}</h3>
      <ul className="grid gap-4 md:grid-cols-3">
        {experts.map((expert) => (
          <li key={expert.id} className="min-w-0">
            <ExpertCard expert={expert} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
