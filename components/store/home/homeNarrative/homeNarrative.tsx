import { aboutCopy } from "@/config/about.config/about.config";
import { homeNarrativeCopy } from "@/config/home.config/home.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

export function HomeNarrative() {
  return (
    <section
      aria-labelledby="home-narrative-heading"
      className="bg-primary-deep text-primary-foreground"
    >
      <div className="container-app grid gap-10 py-section lg:grid-cols-[.8fr_1.6fr] lg:gap-20">
        <div className="space-y-4">
          <p className="type-label text-accent">از نیاز تا انتخاب</p>
          <h2 id="home-narrative-heading" className="type-h1">
            {homeNarrativeCopy.title}
          </h2>
          <p className="type-body-lg text-primary-foreground/70">
            {homeNarrativeCopy.description}
          </p>
        </div>
        <ol className="grid gap-8 sm:grid-cols-3">
          {aboutCopy.howSteps.map((step, index) => (
            <li
              key={step.title}
              className="space-y-5 border-t border-primary-foreground/20 pt-5"
            >
              <span className="type-h2 tabular-nums text-primary">
                {formatFaNumber(index + 1).padStart(2, "۰")}
              </span>
              <div className="space-y-2">
                <h3 className="type-h4">{step.title}</h3>
                <p className="type-body-sm text-primary-foreground/65">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
