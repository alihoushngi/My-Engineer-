"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertResponsiveOverlay } from "@/components/store/expert/expertResponsiveOverlay/expertResponsiveOverlay";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ExpertPortfolioItem } from "@/types/store/expert.types";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";
import { cn } from "@/lib/utils/cn/cn";

type ExpertPortfolioProps = {
  items?: readonly ExpertPortfolioItem[];
};

export function ExpertPortfolio({ items }: ExpertPortfolioProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const portfolio = items ?? [];
  const selected = openIndex === null ? undefined : portfolio[openIndex];

  function move(delta: number) {
    setOpenIndex((current) => {
      if (current === null || portfolio.length === 0) {
        return current;
      }

      return (current + delta + portfolio.length) % portfolio.length;
    });
  }

  return (
    <section aria-labelledby="expert-portfolio-heading">
      <div className="py-8 first:pt-0">
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader
              titleId="expert-portfolio-heading"
              title={expertProfileCopy.portfolioTitle}
            />
            {hasItems(portfolio) ? (
              <p className="type-caption text-muted-foreground">
                {formatFaNumber(portfolio.length)}{" "}
                {expertProfileCopy.portfolioCountLabel}
              </p>
            ) : null}
          </div>
          {hasItems(portfolio) ? (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {portfolio.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-start outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => {
                      setOpenIndex(index);
                    }}
                  >
                    <PortfolioMedia item={item} className="aspect-4/3 w-full" />
                    <span className="block p-3 type-body-sm font-medium text-card-foreground">
                      {item.title ?? expertProfileCopy.portfolioOpen}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-body text-muted-foreground">
              {expertProfileCopy.portfolioEmpty}
            </p>
          )}
        </div>
      </div>
      <ExpertResponsiveOverlay
        open={openIndex !== null}
        title={selected?.title ?? expertProfileCopy.portfolioViewerTitle}
        description={selected?.description ?? expertProfileCopy.portfolioOpen}
        onOpenChange={(open) => {
          if (!open) {
            setOpenIndex(null);
          }
        }}
      >
        {selected ? (
          <div
            className="space-y-4"
            tabIndex={0}
            onKeyDown={(event) => {
              if (portfolio.length < 2) {
                return;
              }

              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(-1);
              }

              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(1);
              }
            }}
          >
            <PortfolioMedia
              item={selected}
              className="aspect-video w-full rounded-lg"
            />
            {portfolio.length > 1 ? (
              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => move(-1)}
                >
                  <ChevronRightIcon aria-hidden="true" className="ltr:hidden" />
                  <ChevronLeftIcon aria-hidden="true" className="rtl:hidden" />
                  {expertProfileCopy.portfolioPrevious}
                </Button>
                <Button type="button" variant="outline" onClick={() => move(1)}>
                  {expertProfileCopy.portfolioNext}
                  <ChevronLeftIcon aria-hidden="true" className="ltr:hidden" />
                  <ChevronRightIcon aria-hidden="true" className="rtl:hidden" />
                </Button>
              </div>
            ) : null}
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {portfolio.map((item, index) => (
                <li key={`${item.id}-thumb`}>
                  <button
                    type="button"
                    aria-current={index === openIndex ? "true" : undefined}
                    className={cn(
                      "overflow-hidden rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      index === openIndex
                        ? "border-primary"
                        : "border-transparent",
                    )}
                    onClick={() => {
                      setOpenIndex(index);
                    }}
                  >
                    <PortfolioMedia item={item} className="aspect-square" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </ExpertResponsiveOverlay>
    </section>
  );
}

function PortfolioMedia({
  item,
  className,
}: {
  item: ExpertPortfolioItem;
  className?: string;
}) {
  if (item.imageSrc) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex w-full items-center justify-center bg-muted type-caption text-muted-foreground",
        className,
      )}
    >
      {item.title ?? expertProfileCopy.portfolioTitle}
    </span>
  );
}
