import { ContentHighlights } from "@/components/store/home/contentHighlights/contentHighlights";
import { DrawingConsultation } from "@/components/store/home/drawingConsultation/drawingConsultation";
import { HomeFaqEntry } from "@/components/store/home/homeFaqEntry/homeFaqEntry";
import { HomeHero } from "@/components/store/home/homeHero/homeHero";
import { HomeKnowledgeTips } from "@/components/store/home/homeKnowledgeTips/homeKnowledgeTips";
import { HomeMarketplace } from "@/components/store/home/homeMarketplace/homeMarketplace";
import { HomeNarrative } from "@/components/store/home/homeNarrative/homeNarrative";
import { HomeTestimonials } from "@/components/store/home/homeTestimonials/homeTestimonials";
import { JoinCtaSection } from "@/components/store/home/joinCtaSection/joinCtaSection";
import { PopularServices } from "@/components/store/home/popularServices/popularServices";
import { ServiceCategories } from "@/components/store/home/serviceCategories/serviceCategories";
import { WhyMohandesMan } from "@/components/store/home/whyMohandesMan/whyMohandesMan";
import { type HomeCatalogData } from "@/types/store/home.types";

type HomePageProps = { catalog: HomeCatalogData };

export function HomePage({ catalog }: HomePageProps) {
  return (
    <>
      <HomeHero />
      <ServiceCategories />
      <HomeMarketplace experts={catalog.experts} cities={catalog.cities} />
      <HomeNarrative />
      <PopularServices items={catalog.popularServices} />
      <DrawingConsultation items={catalog.drawingServices} />
      <WhyMohandesMan />
      <JoinCtaSection />
      <HomeTestimonials />
      <HomeKnowledgeTips tips={catalog.knowledgeTips} />
      <ContentHighlights />
      <HomeFaqEntry categories={catalog.faqCategories} />
    </>
  );
}
