import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Badge } from "@/components/ui/badge/badge";

type ExpertTagSectionProps = {
  title: string;
  titleId: string;
  items: readonly string[];
};

export function ExpertTagSection({
  title,
  titleId,
  items,
}: ExpertTagSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={titleId} className="container-app py-page">
      <div className="space-y-6">
        <SectionHeader titleId={titleId} title={title} />
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item}>
              <Badge variant="secondary">{item}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
