import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { homeHeroCopy } from "@/config/home.config/home.config";

export function HomeHero() {
  return (
    <section className="bg-surface-subtle">
      <div className="container-app py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-7 sm:text-center">
          <div className="space-y-4">
            <h1 className="mx-auto max-w-xl type-display text-foreground">
              {homeHeroCopy.title}
            </h1>
            <p className="type-body-lg text-muted-foreground">
              {homeHeroCopy.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3 text-start sm:flex-row-reverse sm:items-center">
            <SearchInput id="home-search" initialQuery="" labelHidden />
            <div className="shrink-0 border-t border-border pt-2 sm:border-t-0 sm:border-e sm:pe-3 sm:pt-0">
              <HomeCityTrigger />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
