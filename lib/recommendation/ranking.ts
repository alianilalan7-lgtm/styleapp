import type { PageType } from "@/lib/catalog";
import type { BriefIntake, ComponentScoreBreakdown, PageArchitectureReport, TasteDirectionReport } from "@/lib/strategy/types";
import type { CatalogItemRecord } from "@/lib/catalog/types";

export const RANKING_WEIGHTS = {
  siteProjectFit: 30,
  pageRoleFit: 20,
  verticalFit: 15,
  conversionFit: 15,
  tasteFit: 10,
  technicalPreferenceFit: 10,
  complexityMismatchPenalty: -10,
} as const;

function includesAny(haystack: string[], needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function complexityPenalty(intakeComplexity: BriefIntake["complexityLevel"], itemComplexity: CatalogItemRecord["complexity"]): number {
  if (intakeComplexity === "advanced") return 0;
  if (intakeComplexity === "starter" && itemComplexity === "high") return RANKING_WEIGHTS.complexityMismatchPenalty;
  if (intakeComplexity === "balanced" && itemComplexity === "high") return -4;
  return 0;
}

function mappedGoalTag(goal: BriefIntake["primaryGoal"]): string {
  switch (goal) {
    case "lead-generation":
      return "lead";
    case "sales":
      return "pricing";
    case "product-activation":
      return "workflow";
    case "trust-building":
      return "trust";
    case "audience-growth":
      return "content";
    default:
      return "cta";
  }
}

function mappedConversionTag(goal: BriefIntake["conversionGoal"]): string {
  switch (goal) {
    case "book-demo":
      return "demo";
    case "start-trial":
      return "trial";
    case "contact-lead":
      return "contact";
    case "checkout":
      return "checkout";
    case "signup":
      return "signup";
    case "download":
      return "download";
    default:
      return "cta";
  }
}

export function scoreComponentItem(input: {
  item: CatalogItemRecord;
  intake: BriefIntake;
  architecture: PageArchitectureReport;
  taste: TasteDirectionReport;
}): ComponentScoreBreakdown {
  const { item, intake, architecture, taste } = input;
  const requiredPages = architecture.requiredPages;
  const goalTag = mappedGoalTag(intake.primaryGoal);
  const conversionTag = mappedConversionTag(intake.conversionGoal);

  const siteProjectFit = item.industryFit.includes(architecture.siteType)
    ? RANKING_WEIGHTS.siteProjectFit
    : 0;

  const pageRoleFit = includesAny(item.pageTypeFit as PageType[], requiredPages)
    ? RANKING_WEIGHTS.pageRoleFit
    : 0;

  const verticalFit = item.verticalFit.includes(intake.verticalPack)
    ? RANKING_WEIGHTS.verticalFit
    : 0;

  const conversionFit = item.tags.includes(goalTag) || item.tags.includes(conversionTag)
    ? RANKING_WEIGHTS.conversionFit
    : 0;

  const tasteFit =
    item.stylePackFit.includes(taste.stylePack.layout) ||
    item.stylePackFit.includes(taste.stylePack.visual) ||
    item.stylePackFit.includes(taste.stylePack.typography)
      ? RANKING_WEIGHTS.tasteFit
      : 0;

  const technicalPreferenceFit =
    intake.technicalPreference === "auto" ||
    item.framework.toLowerCase().includes(intake.technicalPreference.replace("nextjs", "next.js"))
      ? RANKING_WEIGHTS.technicalPreferenceFit
      : 0;

  const complexityPenaltyValue = complexityPenalty(intake.complexityLevel, item.complexity);

  const total =
    siteProjectFit +
    pageRoleFit +
    verticalFit +
    conversionFit +
    tasteFit +
    technicalPreferenceFit +
    complexityPenaltyValue;

  return {
    siteProjectFit,
    pageRoleFit,
    verticalFit,
    conversionFit,
    tasteFit,
    technicalPreferenceFit,
    complexityPenalty: complexityPenaltyValue,
    total,
  };
}
