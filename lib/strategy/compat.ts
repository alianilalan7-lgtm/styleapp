import type { ProjectBrief } from "@/lib/blueprint";
import type { Locale } from "@/lib/i18n";
import type { StylePack } from "@/lib/style-engine";

import type { BriefIntake, ComposeOutput } from "./types";

function inferBusinessType(siteType: ProjectBrief["siteType"]): BriefIntake["businessType"] {
  switch (siteType) {
    case "agency":
      return "agency";
    case "portfolio":
      return "portfolio";
    case "ecommerce":
      return "ecommerce";
    case "dashboard":
      return "dashboard";
    case "fintech":
      return "fintech";
    default:
      return "ai-saas";
  }
}

function inferProjectType(siteType: ProjectBrief["siteType"]): BriefIntake["projectType"] {
  if (siteType === "dashboard") return "dashboard-product";
  if (siteType === "saas" || siteType === "fintech") return "web-app";
  return "marketing-site";
}

function inferVertical(siteType: ProjectBrief["siteType"]): BriefIntake["verticalPack"] {
  if (siteType === "agency" || siteType === "portfolio") return "agency";
  if (siteType === "dashboard") return "dashboard";
  return "ai-saas";
}

function inferPrimaryGoal(brief: ProjectBrief): BriefIntake["primaryGoal"] {
  if (brief.requiredPages.includes("shop") || brief.requiredPages.includes("product")) {
    return "sales";
  }
  if (brief.requiredPages.includes("security")) {
    return "trust-building";
  }
  if (brief.requiredPages.includes("docs")) {
    return "product-activation";
  }
  if (brief.requiredPages.includes("blog")) {
    return "audience-growth";
  }
  return "lead-generation";
}

function inferConversionGoal(primaryGoal: BriefIntake["primaryGoal"]): BriefIntake["conversionGoal"] {
  switch (primaryGoal) {
    case "sales":
      return "checkout";
    case "product-activation":
      return "start-trial";
    case "audience-growth":
      return "signup";
    case "trust-building":
      return "contact-lead";
    default:
      return "book-demo";
  }
}

function inferDensityFromPack(pack: StylePack): BriefIntake["contentDensity"] {
  if (pack.layout === "Editorial Magazine Grid") return "dense";
  if (pack.layout === "Centered Minimal Layout") return "light";
  return "balanced";
}

function inferPersonality(pack: StylePack): BriefIntake["brandPersonality"] {
  const selected: BriefIntake["brandPersonality"] = [];

  if (pack.mood.includes("Trustworthy") || pack.mood.includes("Financial")) {
    selected.push("trustworthy");
  }
  if (pack.visual.includes("Luxury")) {
    selected.push("premium");
  }
  if (pack.visual.includes("Minimal")) {
    selected.push("minimal");
  }
  if (pack.layout.includes("Editorial")) {
    selected.push("editorial");
  }
  if (pack.typography.includes("Monospace")) {
    selected.push("technical");
  }

  if (selected.length === 0) {
    selected.push("trustworthy");
  }

  return selected.slice(0, 4);
}

function inferComplexity(brief: ProjectBrief): BriefIntake["complexityLevel"] {
  if (brief.componentDepthPreference === "deep") return "advanced";
  if (brief.componentDepthPreference === "starter") return "starter";
  return "balanced";
}

export function mapLegacyBriefToIntake(input: {
  brief: ProjectBrief;
  pack: StylePack;
  locale: Locale;
}): BriefIntake {
  const businessType = inferBusinessType(input.brief.siteType);
  const primaryGoal = inferPrimaryGoal(input.brief);

  return {
    locale: input.locale,
    projectType: inferProjectType(input.brief.siteType),
    businessType,
    audience: input.brief.audience || "General digital audience",
    primaryGoal,
    conversionGoal: inferConversionGoal(primaryGoal),
    contentDensity: inferDensityFromPack(input.pack),
    brandPersonality: inferPersonality(input.pack),
    technicalPreference: input.brief.frameworkPreference,
    targetBuildDestination: input.brief.frameworkPreference === "nextjs" ? "nextjs" : "codex",
    complexityLevel: inferComplexity(input.brief),
    verticalPack: inferVertical(input.brief.siteType),
    briefText: input.brief.brandBrief || "Legacy blueprint request",
  };
}

export function buildLegacyDecisionSnapshot(compose: ComposeOutput) {
  return {
    engineVersion: compose.engineVersion,
    generatedAt: compose.generatedAt,
    strategyScope: compose.strategy.recommendedScope,
    requiredPages: compose.pageArchitecture.requiredPages,
    topPatterns: compose.componentIntelligence.recommendations.slice(0, 3).map((item) => ({
      componentName: item.componentName,
      patternFamily: item.patternFamily,
      score: item.scoreBreakdown.total,
    })),
  };
}
