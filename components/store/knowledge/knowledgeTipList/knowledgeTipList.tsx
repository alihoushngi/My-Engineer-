import { Card } from "@/components/ui/card/card";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { type KnowledgeTip } from "@/types/store/knowledge.types";

type KnowledgeTipListProps = {
  tips: readonly KnowledgeTip[];
};

export function KnowledgeTipList({ tips }: KnowledgeTipListProps) {
  if (tips.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-labelledby="knowledge-tips-heading">
      <h2 id="knowledge-tips-heading" className="type-h3 text-foreground">
        {knowledgeCopy.tipsHeading}
      </h2>
      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip.id} className="min-w-0">
            <Card>
              <h3 className="break-words type-h4 font-semibold text-card-foreground">
                {tip.title}
              </h3>
              {tip.body ? (
                <p className="type-body-sm text-muted-foreground">{tip.body}</p>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
