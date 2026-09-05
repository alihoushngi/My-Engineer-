"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontalIcon, UsersIcon, XIcon } from "lucide-react";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type HomeMarketplaceProps = {
  experts: readonly ExpertCardData[];
  cities: readonly City[];
};

export function HomeMarketplace({ experts, cities }: HomeMarketplaceProps) {
  const [services, setServices] = useState<readonly ServiceSlug[]>([]);
  const [city, setCity] = useState("all");
  const [expertise, setExpertise] = useState("all");

  const expertiseOptions = useMemo(
    () => [...new Set(experts.flatMap((expert) => expert.specialties ?? []))],
    [experts],
  );

  const filteredExperts = useMemo(
    () =>
      experts.filter((expert) => {
        const serviceMatch =
          services.length === 0 ||
          services.some((slug) => expert.serviceSlugs?.includes(slug));
        const cityMatch = city === "all" || expert.city === city;
        const expertiseMatch =
          expertise === "all" || expert.specialties?.includes(expertise);
        return serviceMatch && cityMatch && expertiseMatch;
      }),
    [city, expertise, experts, services],
  );

  const hasFilters =
    services.length > 0 || city !== "all" || expertise !== "all";

  function toggleService(slug: ServiceSlug) {
    setServices((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  function reset() {
    setServices([]);
    setCity("all");
    setExpertise("all");
  }

  return (
    <section
      id="home-marketplace"
      aria-labelledby="home-marketplace-heading"
      className="bg-background-subtle py-section"
    >
      <div className="container-app space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="type-label text-primary">بازار متخصصان ساختمان</p>
            <h2 id="home-marketplace-heading" className="type-h1">
              متخصص مناسب پروژه را پیدا کنید
            </h2>
            <p className="type-body text-foreground-muted">
              تخصص، شهر و سابقه حرفه‌ای را مقایسه کنید و با انتخاب آگاهانه وارد
              پروفایل متخصص شوید.
            </p>
          </div>
          <p aria-live="polite" className="type-body-sm text-foreground-muted">
            <strong className="text-primary">
              {formatFaNumber(filteredExperts.length)}
            </strong>{" "}
            متخصص یافت شد
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div
            className="flex min-w-max snap-x snap-mandatory gap-2"
            aria-label="فیلتر گروه خدمات"
          >
            {serviceCategories.map((service) => {
              const active = services.includes(service.slug);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => toggleService(service.slug)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-11 snap-start rounded-full border px-4 type-button outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong bg-surface text-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {service.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 border-y border-border py-5 md:grid-cols-[1fr_1fr_auto]">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger aria-label="فیلتر شهر">
              <SelectValue placeholder="همه شهرها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه شهرها</SelectItem>
              {cities.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={expertise} onValueChange={setExpertise}>
            <SelectTrigger aria-label="فیلتر تخصص">
              <SelectValue placeholder="همه تخصص‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه تخصص‌ها</SelectItem>
              {expertiseOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            onClick={reset}
            disabled={!hasFilters}
            icon={
              hasFilters ? (
                <XIcon aria-hidden="true" />
              ) : (
                <SlidersHorizontalIcon aria-hidden="true" />
              )
            }
          >
            پاک‌کردن فیلترها
          </Button>
        </div>

        {filteredExperts.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredExperts.map((expert) => (
              <li key={expert.id} className="min-w-0">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            icon={<UsersIcon aria-hidden="true" />}
            title="متخصصی با این ترکیب فیلتر پیدا نشد"
            description="یک شهر یا تخصص دیگر را امتحان کنید، یا همه فیلترها را پاک کنید."
            action={<Button onClick={reset}>نمایش همه متخصصان</Button>}
          />
        )}
      </div>
    </section>
  );
}
