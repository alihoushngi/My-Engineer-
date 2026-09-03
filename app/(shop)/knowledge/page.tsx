import { type Metadata } from "next";
import { KnowledgeLandingPage } from "@/components/store/knowledge/knowledgeLandingPage/knowledgeLandingPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listKnowledgeCategories } from "@/services/knowledge-service/knowledge-service";

export const metadata: Metadata = {
  title: knowledgeCopy.landingTitle,
  description: knowledgeCopy.metadataDescription,
  alternates: {
    canonical: storePaths.knowledge,
  },
};

export default async function KnowledgeRoutePage() {
  const categories = await listKnowledgeCategories();

  return <KnowledgeLandingPage categories={categories} />;
}
