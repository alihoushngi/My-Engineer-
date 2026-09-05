import { homeNarrativeCopy } from "@/config/home.config/home.config";
import { aboutCopy } from "@/config/about.config/about.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

export function HomeNarrative() {
  return (
    <section
      aria-labelledby="home-narrative-heading"
      className="bg-surface-subtle"
    >
      <div className="container-app grid gap-10 py-section lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="space-y-4">
          <h2 id="home-narrative-heading" className="type-h2">
            {homeNarrativeCopy.title}
          </h2>
          <p className="type-body-lg text-muted-foreground">
            {homeNarrativeCopy.description}
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="type-h3">{aboutCopy.howTitle}</h3>
          <ol className="divide-y divide-border">
            {aboutCopy.howSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 py-5 first:pt-0 last:pb-0"
              >
                <span className="type-h2 tabular-nums text-primary">
                  {formatFaNumber(index + 1)}
                </span>
                <div className="space-y-1">
                  <h4 className="type-h4">{step.title}</h4>
                  <p className="type-body-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
