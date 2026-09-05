import { mockExpertCards, mockSoftware } from "@/lib/mock-data/mock-data";

export type MockExpertiseCatalogItem = {
  id: string;
  label: string;
};

export type MockExpertiseCatalog = {
  expertise: readonly MockExpertiseCatalogItem[];
  software: readonly MockExpertiseCatalogItem[];
};

export function getMockExpertiseCatalog(): MockExpertiseCatalog {
  const labels = new Set<string>();

  for (const card of mockExpertCards) {
    for (const specialty of card.specialties ?? []) {
      labels.add(specialty);
    }
  }

  return {
    expertise: [...labels].map((label) => ({ id: label, label })),
    software: mockSoftware.map((label) => ({ id: label, label })),
  };
}
