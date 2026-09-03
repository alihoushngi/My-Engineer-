import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertProfilePage } from "@/components/store/expert/expertProfilePage/expertProfilePage";
import { siteConfig } from "@/config/site.config/site.config";
import { isDevelopmentExpertPreviewId } from "@/lib/experts/expert-profile/expert-profile";
import { getExpertProfile } from "@/services/expert-service/expert-service";

type ExpertPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ExpertPageProps): Promise<Metadata> {
  const { id } = await params;
  const expert = await getExpertProfile(id);

  if (!expert) {
    return { title: siteConfig.name };
  }

  return {
    title: `${expert.name} | ${expert.profession} | ${siteConfig.name}`,
    description: expert.shortIntroduction ?? expert.profession,
  };
}

export default async function ExpertRoutePage({ params }: ExpertPageProps) {
  const { id } = await params;
  const expert = await getExpertProfile(id);

  if (!expert) {
    notFound();
  }

  return (
    <ExpertProfilePage
      expert={expert}
      isDevelopmentPreview={
        process.env.NODE_ENV !== "production" &&
        isDevelopmentExpertPreviewId(id)
      }
    />
  );
}
