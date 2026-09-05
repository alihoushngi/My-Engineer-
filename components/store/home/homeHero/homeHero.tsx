import Link from "next/link";
import { ArrowDownIcon, CheckCircle2Icon } from "lucide-react";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { HomeHeroSlider } from "@/components/store/home/homeHero/homeHeroSlider/homeHeroSlider";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { joinNavigation } from "@/config/navigation.config/navigation.config";

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-primary-deep text-primary-foreground">
      <div className="container-wide grid items-stretch lg:min-h-[34rem] lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative order-first h-52 sm:h-64 lg:order-last lg:h-auto lg:min-h-full">
          <HomeHeroSlider />
        </div>
        <div className="relative z-10 flex flex-col justify-center gap-5 py-6 sm:gap-7 sm:py-10 lg:py-16 lg:pe-12">
          <div className="max-w-2xl space-y-4">
            <h1 className="type-display text-primary-foreground">
              {homeHeroCopy.title}
            </h1>
            <p className="max-w-xl type-body-lg text-primary-foreground/75">
              {homeHeroCopy.description}
            </p>
            <p className="max-w-xl type-body text-primary-foreground/70">
              {homeHeroCopy.supporting}
            </p>
          </div>
          <div className="flex max-w-2xl flex-col gap-3 rounded-xl bg-surface p-3 text-start shadow-lg sm:flex-row-reverse sm:items-center">
            <div className="min-w-0 flex-1 text-foreground">
              <SearchInput id="home-search" initialQuery="" labelHidden />
            </div>
            <div className="shrink-0 border-t border-border pt-2 text-foreground sm:border-t-0 sm:border-e sm:pe-3 sm:pt-0">
              <HomeCityTrigger />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <JoinLink size="md" />
            <Link
              href={joinNavigation.href}
              className="type-body-sm text-primary-foreground/80 underline-offset-4 outline-none hover:text-primary-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              {homeHeroCopy.joinCta}
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 type-body-sm text-primary-foreground/70">
            {["پروفایل حرفه‌ای", "تخصص و شهر", "ارتباط مستقیم"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2Icon
                  aria-hidden="true"
                  className="size-4 text-accent"
                />
                {item}
              </span>
            ))}
          </div>
          <Link
            href="#service-categories"
            className="inline-flex min-h-11 w-fit items-center gap-2 type-button text-primary-foreground/75 outline-none hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {homeHeroCopy.startCta}
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
