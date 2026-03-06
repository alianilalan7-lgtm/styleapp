import { buildPagePlans, buildSuggestedPages } from "@/lib/blueprint";

import { mapIntakeToSiteType } from "@/lib/strategy/intake";
import type {
  ArchitecturePriority,
  BriefIntake,
  ContentDensity,
  PageArchitectureItem,
  PageArchitectureReport,
} from "@/lib/strategy/types";

const VERTICAL_REQUIRED_PAGES: Record<BriefIntake["verticalPack"], string[]> = {
  "ai-saas": ["home", "features", "pricing", "integrations", "contact"],
  agency: ["home", "case-studies", "about", "pricing", "contact"],
  dashboard: ["home", "features", "security", "docs", "contact"],
};

const VERTICAL_OPTIONAL_PAGES: Record<BriefIntake["verticalPack"], string[]> = {
  "ai-saas": ["security", "faq", "about", "docs"],
  agency: ["blog", "portfolio", "faq", "case-studies"],
  dashboard: ["integrations", "faq", "about", "login"],
};

const PRIORITY_BY_GOAL: Record<BriefIntake["primaryGoal"], Record<string, ArchitecturePriority>> = {
  "lead-generation": {
    home: "high",
    pricing: "high",
    contact: "high",
  },
  sales: {
    home: "high",
    shop: "high",
    product: "high",
    pricing: "high",
  },
  "product-activation": {
    home: "high",
    features: "high",
    docs: "high",
    integrations: "medium",
  },
  "trust-building": {
    home: "high",
    security: "high",
    faq: "high",
    about: "medium",
  },
  "audience-growth": {
    home: "high",
    blog: "high",
    "case-studies": "medium",
    about: "medium",
  },
};

const PRIORITY_BY_VERTICAL: Record<BriefIntake["verticalPack"], Record<string, ArchitecturePriority>> = {
  "ai-saas": {
    home: "high",
    features: "high",
    pricing: "high",
    integrations: "medium",
    contact: "high",
  },
  agency: {
    home: "high",
    "case-studies": "high",
    about: "high",
    pricing: "medium",
    contact: "high",
  },
  dashboard: {
    home: "high",
    features: "high",
    security: "high",
    docs: "high",
    contact: "medium",
  },
};

function uniquePages(pages: string[]): string[] {
  return Array.from(new Set(pages));
}

function resolvePriority(page: string, intake: BriefIntake): ArchitecturePriority {
  const fromVertical = PRIORITY_BY_VERTICAL[intake.verticalPack][page];
  if (fromVertical) return fromVertical;
  const fromGoal = PRIORITY_BY_GOAL[intake.primaryGoal][page];
  if (fromGoal) return fromGoal;
  if (page === "home") return "high";
  return "low";
}

function roleForPage(page: string): string {
  const roles: Record<string, string> = {
    home: "Narrative + conversion entrypoint",
    pricing: "Plan clarity and commitment framing",
    security: "Trust and risk reduction",
    faq: "Objection handling",
    contact: "Human conversion and support",
    about: "Credibility and positioning",
    features: "Capability evidence",
    integrations: "Ecosystem confidence",
    blog: "Audience growth and education",
    "case-studies": "Outcome proof",
    portfolio: "Work proof",
    shop: "Commerce browsing",
    product: "Offer detail and conversion",
    docs: "Adoption and activation",
    login: "Access control",
  };

  return roles[page] ?? "Supporting page";
}

function contentDepthForPage(intake: BriefIntake, page: string): ContentDensity {
  if (intake.contentDensity === "dense") return "dense";
  if (page === "pricing" || page === "security" || page === "docs") return "balanced";
  return intake.contentDensity;
}

export function buildPageArchitecture(intake: BriefIntake): PageArchitectureReport {
  const siteType = mapIntakeToSiteType(intake);
  const requiredCount = intake.complexityLevel === "advanced" ? 6 : 5;
  const required = uniquePages([
    ...VERTICAL_REQUIRED_PAGES[intake.verticalPack],
    ...buildSuggestedPages(siteType, requiredCount + 2),
  ]).slice(0, requiredCount) as PageArchitectureReport["requiredPages"];

  const optionalPool = uniquePages([
    ...VERTICAL_OPTIONAL_PAGES[intake.verticalPack],
    ...buildSuggestedPages(siteType, requiredCount + 6),
  ])
    .filter((page) => !required.includes(page as typeof required[number]))
    .slice(0, 6) as PageArchitectureReport["optionalPages"];

  const brief = {
    siteType,
    brandBrief: intake.briefText,
    audience: intake.audience,
    pageCount: required.length,
    requiredPages: required,
    frameworkPreference: intake.technicalPreference,
    componentDepthPreference: intake.complexityLevel === "starter" ? "starter" : intake.complexityLevel === "advanced" ? "deep" : "balanced",
  } as const;

  const pagePlans = buildPagePlans(brief);

  const pages: PageArchitectureItem[] = pagePlans.map((plan) => ({
    page: plan.page,
    role: roleForPage(plan.page),
    priority: resolvePriority(plan.page, intake),
    required: true,
    suggestedSections: plan.sections,
    contentDepth: contentDepthForPage(intake, plan.page),
    rationale: [
      `${plan.page} supports ${intake.primaryGoal}.`,
      `Sections align with ${intake.contentDensity} content density.`,
      `${intake.verticalPack} vertical defaults keep decision scope focused.`,
    ],
  }));

  return {
    siteType,
    requiredPages: required,
    optionalPages: optionalPool,
    pages,
  };
}
