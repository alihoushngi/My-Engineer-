export const ALL_FILTER = "all";

export type FilterKey =
  "city" | "skill" | "experience" | "license" | "discipline" | "degree";

export type FilterOption = {
  id: string;
  label: string;
  matchTerms?: readonly string[];
};

export type ExperienceBand = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

export type ServiceTabOption = {
  id: string;
  label: string;
  matchBy?: "track" | "skill";
  matchTerms?: readonly string[];
  hiddenFilters?: readonly FilterKey[];
};

export type FilterableExpert = {
  city?: string;
  specialties?: readonly string[];
  experienceYears?: number;
  discipline?: string;
  degree?: string;
  hasLicense?: boolean;
  track?: string;
};

export type ServiceFilterValues = {
  city: string;
  skill: string;
  experience: string;
  license: string;
  discipline: string;
  degree: string;
  tab: string;
};

export type ActiveFilterChip = {
  key: FilterKey;
  label: string;
};

const overlayFilterKeys: readonly FilterKey[] = [
  "skill",
  "experience",
  "license",
  "discipline",
  "degree",
];

export function createEmptyFilters(
  defaultTab = ALL_FILTER,
): ServiceFilterValues {
  return {
    city: ALL_FILTER,
    skill: ALL_FILTER,
    experience: ALL_FILTER,
    license: ALL_FILTER,
    discipline: ALL_FILTER,
    degree: ALL_FILTER,
    tab: defaultTab,
  };
}

export function getDefaultTab(tabs: readonly ServiceTabOption[]): string {
  return tabs[0]?.id ?? ALL_FILTER;
}

export function getVisibleFilterKeys(
  keys: readonly FilterKey[],
  tabs: readonly ServiceTabOption[],
  tabId: string,
): readonly FilterKey[] {
  const hidden = new Set(
    tabs.find((tab) => tab.id === tabId)?.hiddenFilters ?? [],
  );

  return keys.filter((key) => !hidden.has(key));
}

export function withTabFilters(
  filters: ServiceFilterValues,
  tabId: string,
  tabs: readonly ServiceTabOption[],
): ServiceFilterValues {
  const next: ServiceFilterValues = { ...filters, tab: tabId };

  for (const key of tabs.find((tab) => tab.id === tabId)?.hiddenFilters ?? []) {
    next[key] = ALL_FILTER;
  }

  return next;
}

export function matchesExperienceBand(
  years: number | undefined,
  bandId: string,
  bands: readonly ExperienceBand[],
): boolean {
  if (bandId === ALL_FILTER) {
    return true;
  }

  if (years === undefined) {
    return false;
  }

  const band = bands.find((item) => item.id === bandId);

  if (!band) {
    return false;
  }

  if (years < band.min) {
    return false;
  }

  return band.max === null || years <= band.max;
}

export function matchesSkillOption(
  specialties: readonly string[] | undefined,
  optionId: string,
  options: readonly FilterOption[],
): boolean {
  if (optionId === ALL_FILTER) {
    return true;
  }

  const option = options.find((item) => item.id === optionId);

  if (!option) {
    return false;
  }

  const terms = option.matchTerms ?? [option.label];

  return (specialties ?? []).some((specialty) =>
    terms.some((term) => specialty.includes(term)),
  );
}

export function matchesServiceTab(
  expert: FilterableExpert,
  tabId: string,
  tabs: readonly ServiceTabOption[],
): boolean {
  if (tabId === ALL_FILTER || tabs.length === 0) {
    return true;
  }

  const tab = tabs.find((item) => item.id === tabId);

  if (!tab) {
    return true;
  }

  if (tab.matchBy === "track") {
    return expert.track === tab.id;
  }

  return matchesSkillOption(expert.specialties, tab.id, [
    {
      id: tab.id,
      label: tab.label,
      matchTerms: tab.matchTerms,
    },
  ]);
}

function matchesLicense(
  hasLicense: boolean | undefined,
  license: string,
): boolean {
  if (license === ALL_FILTER) {
    return true;
  }

  if (license === "licensed") {
    return hasLicense === true;
  }

  if (license === "unlicensed") {
    return hasLicense === false;
  }

  return true;
}

export function filterServiceExperts<T extends FilterableExpert>(
  experts: readonly T[],
  filters: ServiceFilterValues,
  options: {
    skills: readonly FilterOption[];
    experienceBands: readonly ExperienceBand[];
    tabs: readonly ServiceTabOption[];
    visibleKeys: readonly FilterKey[];
  },
): readonly T[] {
  const visible = new Set(options.visibleKeys);

  return experts.filter((expert) => {
    const cityMatch =
      !visible.has("city") ||
      filters.city === ALL_FILTER ||
      expert.city === filters.city;
    const skillMatch =
      !visible.has("skill") ||
      matchesSkillOption(expert.specialties, filters.skill, options.skills);
    const experienceMatch =
      !visible.has("experience") ||
      matchesExperienceBand(
        expert.experienceYears,
        filters.experience,
        options.experienceBands,
      );
    const licenseMatch =
      !visible.has("license") ||
      matchesLicense(expert.hasLicense, filters.license);
    const disciplineMatch =
      !visible.has("discipline") ||
      filters.discipline === ALL_FILTER ||
      expert.discipline === filters.discipline;
    const degreeMatch =
      !visible.has("degree") ||
      filters.degree === ALL_FILTER ||
      expert.degree === filters.degree;
    const tabMatch = matchesServiceTab(expert, filters.tab, options.tabs);

    return (
      cityMatch &&
      skillMatch &&
      experienceMatch &&
      licenseMatch &&
      disciplineMatch &&
      degreeMatch &&
      tabMatch
    );
  });
}

export function hasActiveServiceFilters(
  filters: ServiceFilterValues,
  defaultTab: string,
): boolean {
  return (
    filters.city !== ALL_FILTER ||
    filters.skill !== ALL_FILTER ||
    filters.experience !== ALL_FILTER ||
    filters.license !== ALL_FILTER ||
    filters.discipline !== ALL_FILTER ||
    filters.degree !== ALL_FILTER ||
    filters.tab !== defaultTab
  );
}

function optionLabel(
  id: string,
  options: readonly { id: string; label: string }[],
): string | undefined {
  return options.find((item) => item.id === id)?.label;
}

export function getActiveFilterChips(
  filters: ServiceFilterValues,
  context: {
    cities: readonly { name: string }[];
    skills: readonly FilterOption[];
    experienceBands: readonly ExperienceBand[];
    licenses: readonly FilterOption[];
    disciplines: readonly FilterOption[];
    degrees: readonly FilterOption[];
    visibleKeys: readonly FilterKey[];
  },
): readonly ActiveFilterChip[] {
  const visible = new Set(context.visibleKeys);
  const chips: ActiveFilterChip[] = [];

  if (visible.has("city") && filters.city !== ALL_FILTER) {
    chips.push({ key: "city", label: filters.city });
  }

  if (visible.has("skill") && filters.skill !== ALL_FILTER) {
    const label = optionLabel(filters.skill, context.skills);

    if (label) {
      chips.push({ key: "skill", label });
    }
  }

  if (visible.has("experience") && filters.experience !== ALL_FILTER) {
    const label = optionLabel(filters.experience, context.experienceBands);

    if (label) {
      chips.push({ key: "experience", label });
    }
  }

  if (visible.has("license") && filters.license !== ALL_FILTER) {
    const label = optionLabel(filters.license, context.licenses);

    if (label) {
      chips.push({ key: "license", label });
    }
  }

  if (visible.has("discipline") && filters.discipline !== ALL_FILTER) {
    const label = optionLabel(filters.discipline, context.disciplines);

    if (label) {
      chips.push({ key: "discipline", label });
    }
  }

  if (visible.has("degree") && filters.degree !== ALL_FILTER) {
    const label = optionLabel(filters.degree, context.degrees);

    if (label) {
      chips.push({ key: "degree", label });
    }
  }

  return chips;
}

export function getOverlayFilterKeys(
  visibleKeys: readonly FilterKey[],
): readonly FilterKey[] {
  return visibleKeys.filter((key) => overlayFilterKeys.includes(key));
}

export type ServiceFilterQuery = ServiceFilterValues & {
  page: number;
};

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function firstCity(value: string | string[] | undefined): string {
  const raw = firstValue(value);

  if (!raw) {
    return ALL_FILTER;
  }

  const city = raw.split(",")[0]?.trim() ?? "";

  return city === "" ? ALL_FILTER : city;
}

function parsePage(value: string | string[] | undefined): number {
  const raw = firstValue(value);
  const page = Number.parseInt(raw ?? "", 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

function normalizeFilterValue(value: string | string[] | undefined): string {
  const raw = firstValue(value)?.trim();

  return raw && raw !== "" ? raw : ALL_FILTER;
}

export function parseServiceFilterParams(params: {
  cities?: string | string[];
  tab?: string | string[];
  experience?: string | string[];
  license?: string | string[];
  discipline?: string | string[];
  degree?: string | string[];
  skill?: string | string[];
  page?: string | string[];
}): ServiceFilterQuery {
  return {
    city: firstCity(params.cities),
    tab: normalizeFilterValue(params.tab),
    experience: normalizeFilterValue(params.experience),
    license: normalizeFilterValue(params.license),
    discipline: normalizeFilterValue(params.discipline),
    degree: normalizeFilterValue(params.degree),
    skill: normalizeFilterValue(params.skill),
    page: parsePage(params.page),
  };
}

export function applyServiceFilterDefaults(
  query: ServiceFilterQuery,
  defaultTab: string,
): ServiceFilterQuery {
  return {
    ...query,
    tab: query.tab === ALL_FILTER ? defaultTab : query.tab,
  };
}

export function serializeServiceFilterParams(
  filters: ServiceFilterValues,
  page: number,
  defaultTab: string,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.city !== ALL_FILTER) {
    params.set("cities", filters.city);
  }

  if (filters.tab !== ALL_FILTER && filters.tab !== defaultTab) {
    params.set("tab", filters.tab);
  }

  if (filters.skill !== ALL_FILTER) {
    params.set("skill", filters.skill);
  }

  if (filters.experience !== ALL_FILTER) {
    params.set("experience", filters.experience);
  }

  if (filters.license !== ALL_FILTER) {
    params.set("license", filters.license);
  }

  if (filters.discipline !== ALL_FILTER) {
    params.set("discipline", filters.discipline);
  }

  if (filters.degree !== ALL_FILTER) {
    params.set("degree", filters.degree);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  return params;
}
