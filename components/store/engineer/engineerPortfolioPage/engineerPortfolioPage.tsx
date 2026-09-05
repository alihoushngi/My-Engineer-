import Image from "next/image";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerPortfolioAddForm } from "@/components/store/engineer/engineerPortfolioAddForm/engineerPortfolioAddForm";
import { EngineerPortfolioRemoveButton } from "@/components/store/engineer/engineerPortfolioRemoveButton/engineerPortfolioRemoveButton";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerPortfolioItem } from "@/types/store/engineer.types";

type EngineerPortfolioPageProps = {
  items: readonly EngineerPortfolioItem[];
};

export function EngineerPortfolioPage({ items }: EngineerPortfolioPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.portfolio}
        description="نمونه‌کارهای پروفایل عمومی. ترتیب‌دهی با کشیدن و رها کردن پشتیبانی نمی‌شود."
      />
      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyPortfolio} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              {item.imageSrc ? (
                <div className="relative aspect-[4/3] bg-surface-subtle">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.title ?? "نمونه‌کار"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-surface-subtle" />
              )}
              <div className="space-y-3 p-4">
                <h2 className="type-h4">{item.title ?? "نمونه‌کار"}</h2>
                {item.description ? (
                  <p className="type-body-sm text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
                <EngineerPortfolioRemoveButton id={item.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <EngineerPortfolioAddForm />
    </div>
  );
}
