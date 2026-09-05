import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeJoinCopy } from "@/config/home.config/home.config";

export function JoinCtaSection() {
  return (
    <section
      aria-labelledby="join-cta-heading"
      className="container-app pb-section"
    >
      <div className="flex flex-col items-start gap-6 rounded-lg bg-primary px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
        <div className="max-w-2xl space-y-3">
          <h2 id="join-cta-heading" className="type-h2 text-primary-foreground">
            {homeJoinCopy.title}
          </h2>
          <p className="type-body text-primary-foreground">
            {homeJoinCopy.description}
          </p>
        </div>
        <JoinLink size="lg" variant="outline" className="w-full sm:w-auto" />
      </div>
    </section>
  );
}
