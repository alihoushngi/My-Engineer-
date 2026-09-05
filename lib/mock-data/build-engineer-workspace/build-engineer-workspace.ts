import { getServiceCategory } from "@/config/services.config/services.config";
import {
  mockEngineerConversations,
  mockEngineerCredentials,
  mockEngineerMessagesByConversation,
  mockEngineerNotifications,
  mockEngineerPublicExpertId,
  mockEngineerRequests,
} from "@/lib/mock-data/engineer-workspace-mock-data";
import { mockExpertCards, mockExperts } from "@/lib/mock-data/mock-data";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

/**
 * Assembles engineer-panel display data from the public expert fixture.
 * This is not an authenticated session.
 */
export function getMockEngineerWorkspace(): EngineerWorkspace {
  const expert = mockExperts.find(
    (item) => item.id === mockEngineerPublicExpertId,
  );

  if (!expert) {
    throw new Error("Expected display expert fixture is missing.");
  }

  const nameParts = expert.name.split(" ");
  const firstName = nameParts[0] ?? expert.name;
  const lastName = nameParts.slice(1).join(" ");

  const card = mockExpertCards.find((item) => item.id === expert.id);

  return {
    account: {
      id: "engineer-display-account",
      publicExpertId: expert.id,
      displayName: expert.name,
      profession: expert.profession,
      avatarSrc: expert.avatarSrc,
      mobileDisplay: "۰۹۱۲***۴۵۶۷",
      accessStatus: "active",
      verificationStatus: expert.isVerified ? "verified" : "pending_review",
    },
    profile: {
      publicExpertId: expert.id,
      firstName,
      lastName,
      profession: expert.profession,
      about: expert.about,
      avatarSrc: expert.avatarSrc,
      specialties: expert.specialties ?? [],
      software: expert.software ?? [],
      history: expert.history,
      experienceYears: expert.experienceYears,
      education: expert.education ?? [],
      organizationMembership: expert.organizationMembership,
      license: expert.license,
      qualifications: expert.license?.competencies,
      serviceCities: expert.serviceCities ?? [],
    },
    services: (card?.serviceSlugs ?? []).map((slug) => ({
      slug,
      label: getServiceCategory(slug)?.label ?? slug,
      specialties: expert.specialties ?? [],
      isListedOnProfile: true,
    })),
    serviceArea: {
      provinceId: "tehran",
      provinceName: "تهران",
      cityId: "tehran",
      cityName: expert.city ?? "تهران",
      nearbyCities: [
        { id: "karaj", name: "کرج" },
        { id: "isfahan", name: "اصفهان" },
      ],
    },
    requests: mockEngineerRequests,
    conversations: mockEngineerConversations,
    messagesByConversationId: mockEngineerMessagesByConversation,
    portfolio: [
      ...(expert.portfolio ?? []),
      ...Array.from({ length: 5 }, (_, index) => ({
        id: `${expert.id}-manage-p${index + 1}`,
        title: `نمونه‌کار مدیریتی ${index + 1}`,
        imageSrc: "/images/portfolio/project-01.jpg",
        imageAlt: "نمونه پروژه ساختمانی اجراشده",
      })),
    ],
    credentials: mockEngineerCredentials,
    reviews: expert.reviews ?? [],
    notifications: mockEngineerNotifications,
  };
}
