"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
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

  return (
    <section aria-labelledby="expert-portfolio-heading" className="">
      <div className="py-8 first:pt-0">
        <div className="space-y-8">
          <SectionHeader
            titleId="expert-portfolio-heading"
            title={expertProfileCopy.portfolioTitle}
          />
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
                    <PortfolioMedia
                      item={item}
                      className="aspect-[4/3] w-full"
                    />
                    {item.title ? (
                      <span className="block p-3 type-body-sm font-medium text-card-foreground">
                        {item.title}
                      </span>
                    ) : (
                      <span className="block p-3 type-body-sm font-medium text-card-foreground">
                        {expertProfileCopy.portfolioOpen}
                      </span>
                    )}
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
      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setOpenIndex(null);
          }
        }}
      >
        <DialogContent
          className="sm:max-w-2xl"
          onKeyDown={(event) => {
            if (portfolio.length < 2 || openIndex === null) {
              return;
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              setOpenIndex(
                (current) =>
                  ((current ?? 0) - 1 + portfolio.length) % portfolio.length,
              );
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setOpenIndex(
                (current) => ((current ?? 0) + 1) % portfolio.length,
              );
            }
          }}
        >
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.title ?? expertProfileCopy.portfolioTitle}
                </DialogTitle>
                {selected.description ? (
                  <DialogDescription>{selected.description}</DialogDescription>
                ) : (
                  <DialogDescription className="sr-only">
                    {expertProfileCopy.portfolioOpen}
                  </DialogDescription>
                )}
              </DialogHeader>
              <PortfolioMedia
                item={selected}
                className="aspect-[16/9] w-full"
              />
              {portfolio.length > 1 ? (
                <div className="flex justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOpenIndex((current) =>
                        current === null
                          ? 0
                          : (current - 1 + portfolio.length) % portfolio.length,
                      );
                    }}
                  >
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="ltr:hidden"
                    />
                    <ChevronLeftIcon
                      aria-hidden="true"
                      className="rtl:hidden"
                    />
                    {expertProfileCopy.portfolioPrevious}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOpenIndex((current) =>
                        current === null ? 0 : (current + 1) % portfolio.length,
                      );
                    }}
                  >
                    {expertProfileCopy.portfolioNext}
                    <ChevronLeftIcon
                      aria-hidden="true"
                      className="ltr:hidden"
                    />
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="rtl:hidden"
                    />
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
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
