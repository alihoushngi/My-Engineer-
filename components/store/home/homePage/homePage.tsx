import { ContentHighlights } from "@/components/store/home/contentHighlights/contentHighlights";
import { DrawingConsultation } from "@/components/store/home/drawingConsultation/drawingConsultation";
import { HomeFaqEntry } from "@/components/store/home/homeFaqEntry/homeFaqEntry";
import { HomeHero } from "@/components/store/home/homeHero/homeHero";
import { HomeNarrative } from "@/components/store/home/homeNarrative/homeNarrative";
import { HomeMarketplace } from "@/components/store/home/homeMarketplace/homeMarketplace";
import { JoinCtaSection } from "@/components/store/home/joinCtaSection/joinCtaSection";
import { PopularServices } from "@/components/store/home/popularServices/popularServices";
import { ServiceCategories } from "@/components/store/home/serviceCategories/serviceCategories";
import { WhyMohandesMan } from "@/components/store/home/whyMohandesMan/whyMohandesMan";
import { type HomeCatalogData } from "@/services/catalog-service/catalog-service";

type HomePageProps = { catalog: HomeCatalogData };

export function HomePage({ catalog }: HomePageProps) {
  return (
    <>
      <HomeHero />
      <ServiceCategories />
      <HomeMarketplace experts={catalog.experts} cities={catalog.cities} />
      <PopularServices items={catalog.popularServices} />
      <DrawingConsultation items={catalog.drawingServices} />
      <WhyMohandesMan />
      <HomeNarrative />
      <ContentHighlights />
      <HomeFaqEntry />
      <JoinCtaSection />
    </>
  );
}
