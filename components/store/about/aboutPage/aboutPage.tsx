import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { AboutServicesSection } from "@/components/store/about/aboutServicesSection/aboutServicesSection";
import { aboutCopy } from "@/config/about.config/about.config";
import { siteConfig } from "@/config/site.config/site.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

export function AboutPage() {
  return (
    <div className="pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: aboutCopy.breadcrumb },
          ]}
        />
      </div>
      <section className="container-wide grid overflow-hidden rounded-xl bg-primary-deep text-primary-foreground lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="type-label text-primary">داستان مهندس من</p>
          <h1 className="mt-4 type-display">{aboutCopy.title}</h1>
          <p className="mt-5 type-body-lg text-primary-foreground/70">
            {aboutCopy.tagline}
          </p>
        </div>
        <div className="relative min-h-80 lg:min-h-[34rem]">
          <Image
            src="/images/home/project-engineer.png"
            alt="مهندس پروژه در محیط ساختمان"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container-app grid gap-10 py-section lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="type-label text-primary">چرایی ما</p>
          <h2 className="mt-3 type-h1">{aboutCopy.whyTitle}</h2>
        </div>
        <div className="space-y-4">
          {aboutCopy.whyParagraphs.map((paragraph) => (
            <p key={paragraph} className="type-body-lg text-foreground-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-secondary-subtle py-section">
        <div className="container-app grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="type-label text-secondary">روایت شکل‌گیری</p>
            <h2 className="mt-3 type-h1">{aboutCopy.storyTitle}</h2>
            <p className="mt-4 type-body text-foreground-muted">
              {aboutCopy.storyBody}
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {aboutCopy.howSteps.map((step, index) => (
              <li key={step.title} className="rounded-xl bg-surface p-6">
                <span className="type-h2 text-primary">
                  {formatFaNumber(index + 1)}
                </span>
                <h3 className="mt-6 type-h4">{step.title}</h3>
                <p className="mt-2 type-body-sm text-foreground-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AboutServicesSection />
      <section
        aria-labelledby="about-values-heading"
        className="container-app pt-section"
      >
        <p className="type-label text-primary">اصول همکاری</p>
        <h2 id="about-values-heading" className="mt-3 type-h1">
          {aboutCopy.valuesTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-foreground-muted">
          {aboutCopy.valuesIntro}
        </p>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3">
          {aboutCopy.values.map((value) => (
            <li key={value.title} className="bg-surface p-7">
              <CheckIcon aria-hidden="true" className="size-6 text-primary" />
              <h3 className="mt-5 type-h4">{value.title}</h3>
              <p className="mt-2 type-body-sm text-foreground-muted">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
