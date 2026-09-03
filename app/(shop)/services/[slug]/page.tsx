import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDiscoveryPage } from "@/components/store/service/serviceDiscoveryPage/serviceDiscoveryPage";
import { getServiceCategory } from "@/config/services.config/services.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceCategory(slug);

  if (!service) {
    return notFoundMetadata;
  }

  return {
    title: service.label,
    description: service.description,
    alternates: {
      canonical: service.href,
    },
  };
}

export default async function ServiceRoutePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceCategory(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDiscoveryPage service={service} />;
}
