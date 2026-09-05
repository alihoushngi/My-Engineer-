import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertProfilePage } from "@/components/store/expert/expertProfilePage/expertProfilePage";
import {
  isDevelopmentExpertPreviewId,
  toExpertSharePath,
} from "@/lib/experts/expert-profile/expert-profile";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { getExpertProfile } from "@/services/expert-service/expert-service";
import { isUserAuthenticated } from "@/services/user-auth-service/user-access-service";

type ExpertPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ExpertPageProps): Promise<Metadata> {
  const { id } = await params;
  const expert = await getExpertProfile(id);

  if (!expert) {
    return notFoundMetadata;
  }

  return {
    title: `${expert.name} | ${expert.profession}`,
    description: expert.shortIntroduction ?? expert.profession,
    alternates: {
      canonical: toExpertSharePath(id),
    },
  };
}

export default async function ExpertRoutePage({ params }: ExpertPageProps) {
  const { id } = await params;
  const [expert, userAuthenticated] = await Promise.all([
    getExpertProfile(id),
    isUserAuthenticated(),
  ]);

  if (!expert) {
    notFound();
  }

  return (
    <ExpertProfilePage
      expert={expert}
      isUserAuthenticated={userAuthenticated}
      isDevelopmentPreview={
        process.env.NODE_ENV !== "production" &&
        isDevelopmentExpertPreviewId(id)
      }
    />
  );
}
