import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { HomeSearchTrigger } from "@/components/store/home/homeHero/homeSearchTrigger/homeSearchTrigger";
import { homeHeroCopy } from "@/config/home.config/home.config";

export function HomeHero() {
  return (
    <section className="border-b border-border bg-surface-muted">
      <div className="container-app py-section lg:py-24">
        <div className="max-w-2xl space-y-6 text-start">
          <div className="space-y-4">
            <h1 className="type-display text-foreground">
              {homeHeroCopy.title}
            </h1>
            <p className="type-body-lg text-muted-foreground">
              {homeHeroCopy.description}
            </p>
          </div>
          <div className="glass-surface rounded-lg p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <HomeSearchTrigger className="sm:flex-1" />
              <HomeCityTrigger />
            </div>
          </div>
          <JoinLink variant="outline" />
        </div>
      </div>
    </section>
  );
}
