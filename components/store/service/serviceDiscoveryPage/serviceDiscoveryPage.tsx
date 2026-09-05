import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowLeftIcon, CheckIcon } from "lucide-react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { ServiceExpertMarketplace } from "@/components/store/service/serviceExpertMarketplace/serviceExpertMarketplace";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { siteConfig } from "@/config/site.config/site.config";
import {
  serviceCategories,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ServiceDetailData } from "@/types/store/service.types";

type Props = { service: ServiceCategory; detail: ServiceDetailData };

export function ServiceDiscoveryPage({ service, detail }: Props) {
  return (
    <>
      <section className="bg-primary-deep text-primary-foreground">
        <div className="container-wide py-5">
          <StoreBreadcrumb
            className="[&_a:hover]:text-primary-foreground [&_[aria-current=page]]:text-primary-foreground [&_ol]:text-primary-foreground/55"
            items={[
              { label: "خانه", href: siteConfig.homeHref },
              { label: "خدمات", href: "/#service-categories" },
              { label: service.label },
            ]}
          />
        </div>
        <div className="container-wide grid min-h-[31rem] items-stretch lg:grid-cols-[1fr_.9fr]">
          <div className="flex flex-col justify-center py-10 lg:pe-14">
            <p className="type-label text-primary">{detail.eyebrow}</p>
            <h1 className="mt-4 type-display">{detail.title}</h1>
            <p className="mt-5 max-w-2xl type-body-lg text-primary-foreground/70">
              {detail.description}
            </p>
            <a
              href="#service-experts-heading"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 type-button text-primary-foreground outline-none hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring"
            >
              مشاهده متخصصان{" "}
              <ArrowDownIcon aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="relative -mx-4 min-h-72 sm:-mx-6 lg:mx-0 lg:min-h-full">
            <Image
              src={detail.imageSrc}
              alt={detail.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-primary-deep to-transparent lg:block" />
          </div>
        </div>
      </section>

      <section className="container-app py-section">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <div>
            <p className="type-label text-primary">دامنه خدمت</p>
            <h2 className="mt-3 type-h1">این خدمت چه مسئله‌ای را حل می‌کند؟</h2>
          </div>
          <p className="type-body-lg text-foreground-muted">
            {detail.longDescription}
          </p>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {detail.specialties.map((item, index) => (
            <li key={item.id} className="bg-surface p-6">
              <span className="type-caption text-secondary">
                {formatFaNumber(index + 1).padStart(2, "۰")}
              </span>
              <h3 className="mt-4 type-h4">{item.title}</h3>
              <p className="mt-2 type-body-sm text-foreground-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-background-subtle py-section">
        <div className="container-app">
          <ServiceExpertMarketplace experts={detail.experts} />
        </div>
      </div>

      <section className="container-app grid gap-12 py-section lg:grid-cols-[1fr_.85fr] lg:gap-20">
        <div>
          <p className="type-label text-primary">مسیر همکاری</p>
          <h2 className="mt-3 type-h1">از تعریف نیاز تا شروع کار</h2>
          <ol className="mt-7 border-t border-border">
            {detail.process.map((step, index) => (
              <li
                key={step.id}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5"
              >
                <span className="type-h4 text-primary">
                  {formatFaNumber(index + 1)}
                </span>
                <div>
                  <h3 className="type-h4">{step.title}</h3>
                  <p className="mt-1 type-body-sm text-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl bg-primary-deep p-7 text-primary-foreground sm:p-9">
          <CheckIcon aria-hidden="true" className="size-8 text-primary" />
          <h2 className="mt-5 type-h2">پیش از تماس آماده باشید</h2>
          <p className="mt-3 type-body text-primary-foreground/70">
            موقعیت پروژه، مرحله فعلی، مدارک موجود و خروجی مورد انتظار را کوتاه و
            روشن بنویسید؛ این اطلاعات مقایسه متخصصان را دقیق‌تر می‌کند.
          </p>
        </div>
      </section>

      <section className="bg-secondary-subtle py-section">
        <div className="container-narrow">
          <p className="type-label text-secondary">پرسش‌های متداول</p>
          <h2 className="mt-3 type-h1">پیش از انتخاب متخصص</h2>
          <div className="mt-7">
            <FaqAccordion items={detail.faqs} />
          </div>
        </div>
      </section>

      <section className="container-app py-section">
        <h2 className="type-h2">خدمات مرتبط</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="group flex min-h-24 items-center gap-4 rounded-xl border border-border p-5 outline-none hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-primary [&_svg]:size-6">
                    <ServiceIcon slug={item.slug} />
                  </span>
                  <span className="type-h4">{item.label}</span>
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="ms-auto size-4 text-primary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                  />
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
