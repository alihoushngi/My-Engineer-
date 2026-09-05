import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceDiscoveryHeroProps = {
  service: ServiceCategory;
  detail: ServiceDetailData;
};

export function ServiceDiscoveryHero({
  service,
  detail,
}: ServiceDiscoveryHeroProps) {
  return (
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
      <div className="container-wide grid items-stretch lg:min-h-[31rem] lg:grid-cols-[1fr_.9fr]">
        <div className="flex flex-col justify-center py-8 sm:py-10 lg:pe-14">
          <p className="type-label text-primary">{detail.eyebrow}</p>
          <h1 className="mt-4 type-display">{detail.title}</h1>
          <p className="mt-5 max-w-2xl type-body-lg text-primary-foreground/70">
            {detail.description}
          </p>
          <a
            href="#service-experts-heading"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 type-button text-primary-foreground outline-none hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring"
          >
            {serviceDiscoveryCopy.expertsCta}
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </a>
        </div>
        <div className="relative -mx-4 min-h-52 sm:-mx-6 sm:min-h-64 lg:mx-0 lg:min-h-full">
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
  );
}
