import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeJoinCopy } from "@/config/home.config/home.config";

export function JoinCtaSection() {
  return (
    <section
      aria-labelledby="join-cta-heading"
      className="border-t border-border bg-surface-muted"
    >
      <div className="container-narrow flex flex-col items-start gap-5 py-section">
        <div className="space-y-3">
          <h2 id="join-cta-heading" className="type-h2 text-foreground">
            {homeJoinCopy.title}
          </h2>
          <p className="type-body text-muted-foreground">
            {homeJoinCopy.description}
          </p>
        </div>
        <JoinLink size="lg" />
      </div>
    </section>
  );
}
