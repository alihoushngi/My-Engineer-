import assert from "node:assert/strict";
import test from "node:test";
import {
  ALL_FILTER,
  applyServiceFilterDefaults,
  createEmptyFilters,
  filterServiceExperts,
  getActiveFilterChips,
  getDefaultTab,
  getVisibleFilterKeys,
  hasActiveServiceFilters,
  matchesExperienceBand,
  matchesSkillOption,
  parseServiceFilterParams,
  serializeServiceFilterParams,
  withTabFilters,
  type ExperienceBand,
  type FilterableExpert,
  type FilterOption,
  type ServiceTabOption,
} from "./filter-experts.ts";

const surveyingSkills: readonly FilterOption[] = [
  {
    id: "utm",
    label: "نقشه UTM، شمیم و تفکیک",
    matchTerms: ["نقشه UTM", "شمیم"],
  },
  {
    id: "apartment",
    label: "تفکیک آپارتمان",
    matchTerms: ["تفکیک آپارتمان"],
  },
  {
    id: "drone",
    label: "نقشه‌برداری با پهپاد",
    matchTerms: ["پهپاد"],
  },
];

const threeBandExperience: readonly ExperienceBand[] = [
  { id: "0-5", label: "۰ تا ۵ سال", min: 0, max: 5 },
  { id: "5-15", label: "۵ تا ۱۵ سال", min: 6, max: 15 },
  { id: "15+", label: "بیش از ۱۵ سال", min: 16, max: null },
];

const fourBandExperience: readonly ExperienceBand[] = [
  { id: "0-5", label: "۰ تا ۵ سال", min: 0, max: 5 },
  { id: "5-10", label: "۵ تا ۱۰ سال", min: 6, max: 10 },
  { id: "10-15", label: "۱۰ تا ۱۵ سال", min: 11, max: 15 },
  { id: "15+", label: "بیش از ۱۵ سال", min: 16, max: null },
];

const workerTabs: readonly ServiceTabOption[] = [
  {
    id: "craftsman",
    label: "استادکار ساختمان",
    matchBy: "track",
    hiddenFilters: ["license", "degree"],
  },
  {
    id: "contractor",
    label: "پیمانکار ساختمان",
    matchBy: "track",
  },
];

const drawingTabs: readonly ServiceTabOption[] = [
  {
    id: "architecture",
    label: "معماری",
    matchBy: "skill",
    matchTerms: ["نقشه معماری", "طراحی داخلی"],
    hiddenFilters: ["skill"],
  },
  {
    id: "structure",
    label: "سازه",
    matchBy: "skill",
    matchTerms: ["سازه بتنی", "سازه فولادی"],
  },
];

const experts: readonly FilterableExpert[] = [
  {
    city: "تهران",
    specialties: ["نقشه UTM", "جانمایی پلاک ثبتی"],
    experienceYears: 12,
    discipline: "naghshe",
    degree: "master",
    hasLicense: true,
  },
  {
    city: "رشت",
    specialties: ["تفکیک آپارتمان", "نقشه UTM"],
    experienceYears: 4,
    discipline: "naghshe",
    degree: "bachelor",
    hasLicense: false,
  },
  {
    city: "شیراز",
    specialties: ["پهپاد", "نقشه UTM"],
    experienceYears: 18,
    discipline: "omran",
    degree: "doctorate",
    hasLicense: true,
  },
  {
    city: "رشت",
    specialties: ["اسکلت بتنی", "بازسازی"],
    experienceYears: 15,
    discipline: "omran",
    degree: "bachelor",
    hasLicense: true,
    track: "contractor",
  },
  {
    city: "شیراز",
    specialties: ["لوله‌کشی", "تاسیسات"],
    experienceYears: 13,
    discipline: "mechanic",
    hasLicense: false,
    track: "craftsman",
  },
  {
    city: "تهران",
    specialties: ["نقشه معماری", "فاز دو"],
    experienceYears: 10,
    discipline: "memari",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    city: "شیراز",
    specialties: ["سازه بتنی", "سازه فولادی"],
    experienceYears: 11,
    discipline: "omran",
    degree: "master",
    hasLicense: true,
  },
];

const allKeys = [
  "city",
  "skill",
  "experience",
  "license",
  "discipline",
  "degree",
] as const;

test("surveying skill options match UTM and drone terms without treating apartment as UTM", () => {
  assert.equal(matchesSkillOption(["نقشه UTM"], "utm", surveyingSkills), true);
  assert.equal(
    matchesSkillOption(["تفکیک آپارتمان"], "utm", surveyingSkills),
    false,
  );
  assert.equal(matchesSkillOption(["پهپاد"], "drone", surveyingSkills), true);
  assert.equal(matchesSkillOption(["بازسازی"], "utm", surveyingSkills), false);
});

test("surveying experience uses a 3-band scale", () => {
  assert.equal(matchesExperienceBand(4, "0-5", threeBandExperience), true);
  assert.equal(matchesExperienceBand(12, "5-15", threeBandExperience), true);
  assert.equal(matchesExperienceBand(12, "0-5", threeBandExperience), false);
  assert.equal(matchesExperienceBand(18, "15+", threeBandExperience), true);
});

test("worker experience uses a 4-band scale", () => {
  assert.equal(matchesExperienceBand(8, "5-10", fourBandExperience), true);
  assert.equal(matchesExperienceBand(15, "10-15", fourBandExperience), true);
  assert.equal(matchesExperienceBand(15, "15+", fourBandExperience), false);
  assert.equal(matchesExperienceBand(16, "15+", fourBandExperience), true);
});

test("license, city, discipline and degree filters narrow the expert list", () => {
  const filters = {
    ...createEmptyFilters(),
    city: "تهران",
    license: "licensed",
    discipline: "naghshe",
    degree: "master",
  };
  const result = filterServiceExperts(experts, filters, {
    skills: surveyingSkills,
    experienceBands: threeBandExperience,
    tabs: [],
    visibleKeys: allKeys,
  });

  assert.equal(result.length, 1);
  assert.deepEqual(result[0]?.specialties, ["نقشه UTM", "جانمایی پلاک ثبتی"]);
});

test("craftsman tab keeps contractors out and ignores license and degree", () => {
  const visibleKeys = getVisibleFilterKeys(allKeys, workerTabs, "craftsman");
  const filters = withTabFilters(
    {
      ...createEmptyFilters("craftsman"),
      license: "licensed",
      degree: "bachelor",
    },
    "craftsman",
    workerTabs,
  );
  const result = filterServiceExperts(experts, filters, {
    skills: [],
    experienceBands: fourBandExperience,
    tabs: workerTabs,
    visibleKeys,
  });

  assert.equal(filters.license, ALL_FILTER);
  assert.equal(filters.degree, ALL_FILTER);
  assert.deepEqual(visibleKeys.includes("license"), false);
  assert.equal(result.length, 1);
  assert.equal(result[0]?.track, "craftsman");
});

test("drawing architecture tab hides skill and matches architecture specialties", () => {
  const visibleKeys = getVisibleFilterKeys(
    allKeys,
    drawingTabs,
    "architecture",
  );
  const filters = withTabFilters(
    { ...createEmptyFilters("architecture"), skill: "steel" },
    "architecture",
    drawingTabs,
  );
  const result = filterServiceExperts(experts, filters, {
    skills: [
      { id: "steel", label: "سازه فولادی", matchTerms: ["سازه فولادی"] },
    ],
    experienceBands: fourBandExperience,
    tabs: drawingTabs,
    visibleKeys,
  });

  assert.equal(visibleKeys.includes("skill"), false);
  assert.equal(filters.skill, ALL_FILTER);
  assert.equal(result.length, 1);
  assert.ok(result[0]?.specialties?.includes("نقشه معماری"));
});

test("an unmatched filter combination returns an empty list", () => {
  const result = filterServiceExperts(
    experts,
    { ...createEmptyFilters(), city: "اصفهان", skill: "drone" },
    {
      skills: surveyingSkills,
      experienceBands: threeBandExperience,
      tabs: [],
      visibleKeys: allKeys,
    },
  );

  assert.equal(result.length, 0);
});

test("active chips omit cleared and hidden values", () => {
  const chips = getActiveFilterChips(
    {
      ...createEmptyFilters(),
      city: "تهران",
      license: "licensed",
    },
    {
      cities: [{ name: "تهران" }],
      skills: surveyingSkills,
      experienceBands: threeBandExperience,
      licenses: [{ id: "licensed", label: "دارای پروانه اشتغال" }],
      disciplines: [],
      degrees: [],
      visibleKeys: ["city", "skill", "experience"],
    },
  );

  assert.deepEqual(chips, [{ key: "city", label: "تهران" }]);
  assert.equal(
    hasActiveServiceFilters(createEmptyFilters("craftsman"), "craftsman"),
    false,
  );
  assert.equal(getDefaultTab(workerTabs), "craftsman");
});

test("parseServiceFilterParams reads IA query names and defaults empty values", () => {
  const parsed = parseServiceFilterParams({
    cities: "تهران,رشت",
    skill: "utm",
    experience: "5-15",
    license: "licensed",
    discipline: "naghshe",
    degree: "master",
    tab: "structure",
    page: "2",
  });

  assert.equal(parsed.city, "تهران");
  assert.equal(parsed.skill, "utm");
  assert.equal(parsed.page, 2);
  assert.equal(parseServiceFilterParams({}).city, ALL_FILTER);
  assert.equal(parseServiceFilterParams({ page: "0" }).page, 1);
});

test("applyServiceFilterDefaults uses the first service tab when the URL omits tab", () => {
  const parsed = parseServiceFilterParams({});
  const applied = applyServiceFilterDefaults(parsed, "craftsman");

  assert.equal(applied.tab, "craftsman");
});

test("serializeServiceFilterParams omits defaults so pagination can keep active filters", () => {
  const params = serializeServiceFilterParams(
    {
      city: "تهران",
      skill: "utm",
      experience: ALL_FILTER,
      license: ALL_FILTER,
      discipline: ALL_FILTER,
      degree: ALL_FILTER,
      tab: "craftsman",
    },
    2,
    "craftsman",
  );

  assert.equal(params.get("cities"), "تهران");
  assert.equal(params.get("skill"), "utm");
  assert.equal(params.get("page"), "2");
  assert.equal(params.get("tab"), null);

  const reset = serializeServiceFilterParams(
    {
      city: ALL_FILTER,
      skill: ALL_FILTER,
      experience: ALL_FILTER,
      license: ALL_FILTER,
      discipline: ALL_FILTER,
      degree: ALL_FILTER,
      tab: "architecture",
    },
    1,
    "architecture",
  );

  assert.equal(reset.toString(), "");
});
