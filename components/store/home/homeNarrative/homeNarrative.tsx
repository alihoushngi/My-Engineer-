import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { homeNarrativeCopy } from "@/config/home.config/home.config";

export function HomeNarrative() {
  return (
    <section
      aria-labelledby="home-narrative-heading"
      className="border-y border-border bg-surface"
    >
      <div className="container-narrow py-section">
        <SectionHeader
          titleId="home-narrative-heading"
          title={homeNarrativeCopy.title}
          description={homeNarrativeCopy.description}
        />
      </div>
    </section>
  );
}
