"use client";

import { SlidersHorizontalIcon, UsersIcon, XIcon } from "lucide-react";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { HomeMarketplacePagination } from "@/components/store/home/homeMarketplace/homeMarketplacePagination";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { homeMarketplaceCopy } from "@/config/home.config/home.config";
import { serviceCategories } from "@/config/services.config/services.config";
import { useHomeMarketplace } from "@/hooks/use-home-marketplace/use-home-marketplace";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type HomeMarketplaceProps = {
  experts: readonly ExpertCardData[];
  cities: readonly City[];
};

export function HomeMarketplace({ experts, cities }: HomeMarketplaceProps) {
  const marketplace = useHomeMarketplace(experts);

  return (
    <section
      id="home-marketplace"
      aria-labelledby="home-marketplace-heading"
      className="bg-background-subtle py-section"
    >
      <div className="container-app space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="type-label text-primary">
              {homeMarketplaceCopy.eyebrow}
            </p>
            <h2 id="home-marketplace-heading" className="type-h1">
              {homeMarketplaceCopy.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {homeMarketplaceCopy.description}
            </p>
          </div>
          <p aria-live="polite" className="type-body-sm text-foreground-muted">
            <strong className="text-primary">
              {formatFaNumber(marketplace.pagination.total)}
            </strong>{" "}
            {homeMarketplaceCopy.foundSuffix}
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div
            className="flex min-w-max snap-x snap-mandatory gap-2"
            aria-label={homeMarketplaceCopy.serviceFilterLabel}
          >
            {serviceCategories.map((service) => {
              const active = marketplace.services.includes(service.slug);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => marketplace.toggleService(service.slug)}
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
          <Select
            value={marketplace.city}
            onValueChange={marketplace.changeCity}
          >
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
          <Select
            value={marketplace.expertise}
            onValueChange={marketplace.changeExpertise}
          >
            <SelectTrigger aria-label="فیلتر تخصص">
              <SelectValue placeholder="همه تخصص‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه تخصص‌ها</SelectItem>
              {marketplace.expertiseOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            onClick={marketplace.reset}
            disabled={!marketplace.hasFilters}
            icon={
              marketplace.hasFilters ? (
                <XIcon aria-hidden="true" />
              ) : (
                <SlidersHorizontalIcon aria-hidden="true" />
              )
            }
          >
            {homeMarketplaceCopy.clearFiltersLabel}
          </Button>
        </div>

        {marketplace.pagination.total > 0 ? (
          <>
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {marketplace.pagination.items.map((expert) => (
                <li key={expert.id} className="min-w-0">
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>
            <HomeMarketplacePagination
              page={marketplace.pagination.page}
              pageCount={marketplace.pagination.pageCount}
              onPageChange={marketplace.changePage}
            />
          </>
        ) : (
          <Empty
            icon={<UsersIcon aria-hidden="true" />}
            title={homeMarketplaceCopy.emptyTitle}
            description={homeMarketplaceCopy.emptyDescription}
            action={
              <Button onClick={marketplace.reset}>
                {homeMarketplaceCopy.resetLabel}
              </Button>
            }
          />
        )}
      </div>
    </section>
  );
}
