import type { FrameworkPreference, SiteType } from "@/lib/catalog";

import type {
  BriefIntake,
  BrandPersonalitySignal,
  BuildDestination,
  BusinessType,
  ComplexityLevel,
  ContentDensity,
  ConversionGoal,
  PrimaryGoal,
  ProjectType,
  VerticalPack,
} from "./types";

export const PROJECT_TYPE_OPTIONS: ProjectType[] = [
  "marketing-site",
  "web-app",
  "dashboard-product",
];

export const BUSINESS_TYPE_OPTIONS: BusinessType[] = [
  "ai-saas",
  "agency",
  "portfolio",
  "beauty-clinic",
  "restaurant",
  "education",
  "fintech",
  "ecommerce",
  "dashboard",
  "b2b-saas",
];

export const PRIMARY_GOAL_OPTIONS: PrimaryGoal[] = [
  "lead-generation",
  "sales",
  "product-activation",
  "trust-building",
  "audience-growth",
];

export const CONVERSION_GOAL_OPTIONS: ConversionGoal[] = [
  "book-demo",
  "start-trial",
  "contact-lead",
  "checkout",
  "signup",
  "download",
];

export const CONTENT_DENSITY_OPTIONS: ContentDensity[] = ["light", "balanced", "dense"];

export const BRAND_PERSONALITY_OPTIONS: BrandPersonalitySignal[] = [
  "trustworthy",
  "premium",
  "playful",
  "editorial",
  "bold",
  "minimal",
  "technical",
];

export const COMPLEXITY_OPTIONS: ComplexityLevel[] = ["starter", "balanced", "advanced"];

export const VERTICAL_PACK_OPTIONS: VerticalPack[] = ["ai-saas", "agency", "dashboard"];

export const BUILD_DESTINATION_OPTIONS: BuildDestination[] = [
  "framer",
  "lovable",
  "codex",
  "nextjs",
];

export const TECHNICAL_PREFERENCE_OPTIONS: FrameworkPreference[] = [
  "auto",
  "nextjs",
  "accessibility",
  "headless",
  "animation",
];

export function normalizeBriefIntake(input: BriefIntake): BriefIntake {
  const audience = input.audience.trim();
  const briefText = input.briefText.trim();
  const personality = Array.from(new Set(input.brandPersonality)).slice(0, 4);

  return {
    ...input,
    audience,
    briefText,
    brandPersonality: personality.length > 0 ? personality : ["trustworthy"],
  };
}

export function mapIntakeToSiteType(input: Pick<BriefIntake, "businessType" | "projectType" | "verticalPack">): SiteType {
  if (input.verticalPack === "dashboard" || input.projectType === "dashboard-product") {
    return "dashboard";
  }

  switch (input.businessType) {
    case "ai-saas":
    case "b2b-saas":
      return "saas";
    case "agency":
      return "agency";
    case "portfolio":
      return "portfolio";
    case "fintech":
      return "fintech";
    case "ecommerce":
      return "ecommerce";
    case "dashboard":
      return "dashboard";
    default:
      return input.projectType === "marketing-site" ? "marketing" : "saas";
  }
}
