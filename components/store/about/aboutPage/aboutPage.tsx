import { CheckIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { AboutServicesSection } from "@/components/store/about/aboutServicesSection/aboutServicesSection";
import { aboutCopy } from "@/config/about.config/about.config";
import { siteConfig } from "@/config/site.config/site.config";

export function AboutPage() {
  return (
    <div className="flex flex-col pb-16 sm:pb-20">
      <div className="container-narrow flex flex-col gap-10 py-8 sm:py-12">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: aboutCopy.breadcrumb },
          ]}
        />
        <ContentPageHeader
          title={aboutCopy.title}
          description={aboutCopy.tagline}
        />
        <section className="space-y-3" aria-labelledby="about-why-heading">
          <h2 id="about-why-heading" className="type-h2 text-foreground">
            {aboutCopy.whyTitle}
          </h2>
          {aboutCopy.whyParagraphs.map((paragraph) => (
            <p key={paragraph} className="type-body text-foreground">
              {paragraph}
            </p>
          ))}
        </section>
        <section className="space-y-3" aria-labelledby="about-story-heading">
          <h2 id="about-story-heading" className="type-h2 text-foreground">
            {aboutCopy.storyTitle}
          </h2>
          <p className="type-body text-foreground">{aboutCopy.storyBody}</p>
        </section>
        <section className="space-y-4" aria-labelledby="about-how-heading">
          <h2 id="about-how-heading" className="type-h2 text-foreground">
            {aboutCopy.howTitle}
          </h2>
          <p className="type-body text-foreground">{aboutCopy.howIntro}</p>
          <ol className="space-y-4">
            {aboutCopy.howSteps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary type-label text-secondary-foreground">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="type-h4 text-foreground">{step.title}</h3>
                  <p className="type-body-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <AboutServicesSection />
      <section
        aria-labelledby="about-values-heading"
        className="container-narrow space-y-8 pt-12 sm:pt-16"
      >
        <SectionHeader
          titleId="about-values-heading"
          title={aboutCopy.valuesTitle}
          description={aboutCopy.valuesIntro}
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {aboutCopy.values.map((value) => (
            <li
              key={value.title}
              className="flex gap-3 rounded-lg border border-border bg-card p-5"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
              <div className="space-y-1">
                <h3 className="type-h4 text-foreground">{value.title}</h3>
                <p className="type-body-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
