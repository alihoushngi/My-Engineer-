import { ContentHighlights } from "@/components/store/home/contentHighlights/contentHighlights";
import { DrawingConsultation } from "@/components/store/home/drawingConsultation/drawingConsultation";
import { HomeFaqEntry } from "@/components/store/home/homeFaqEntry/homeFaqEntry";
import { HomeHero } from "@/components/store/home/homeHero/homeHero";
import { HomeNarrative } from "@/components/store/home/homeNarrative/homeNarrative";
import { JoinCtaSection } from "@/components/store/home/joinCtaSection/joinCtaSection";
import { PopularServices } from "@/components/store/home/popularServices/popularServices";
import { ServiceCategories } from "@/components/store/home/serviceCategories/serviceCategories";
import { WhyMohandesMan } from "@/components/store/home/whyMohandesMan/whyMohandesMan";
import {
  drawingConsultationItems,
  popularServiceItems,
} from "@/config/home.config/home.config";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceCategories />
      <PopularServices items={popularServiceItems} />
      <DrawingConsultation items={drawingConsultationItems} />
      <HomeNarrative />
      <WhyMohandesMan />
      <ContentHighlights />
      <HomeFaqEntry />
      <JoinCtaSection />
    </>
  );
}
