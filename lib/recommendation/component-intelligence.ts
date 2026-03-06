import type { BriefIntake, ComponentIntelligenceRecommendation, ComponentIntelligenceReport, PageArchitectureReport, TasteDirectionReport } from "@/lib/strategy/types";
import type { CatalogItemRecord } from "@/lib/catalog/types";

import { scoreComponentItem } from "./ranking";

function patternFamilyForCategory(category: string): string {
  const map: Record<string, string> = {
    hero: "Hero Narrative",
    pricing: "Pricing Decision",
    cta: "Conversion CTA",
    testimonials: "Trust Proof",
    faq: "Objection Handling",
    features: "Capability Explanation",
    table: "Data Transparency",
    contact: "Lead Capture",
    dashboard: "Operational Signal",
    auth: "Access Flow",
  };
  return map[category] ?? "General UX Pattern";
}

function complexityFit(score: number): "fit" | "stretch" | "overkill" {
  if (score >= 65) return "fit";
  if (score >= 45) return "stretch";
  return "overkill";
}

function buildTrustModules(intake: BriefIntake): string[] {
  const base = ["Customer proof", "Clear pricing or offer framing", "FAQ + objection handling"];
  if (intake.primaryGoal === "trust-building") {
    return [...base, "Security/compliance module", "Process transparency block"];
  }
  if (intake.verticalPack === "dashboard") {
    return [...base, "Status indicators", "Operational reliability metrics"];
  }
  return base;
}

function buildConversionUxSuggestions(intake: BriefIntake): string[] {
  const suggestions = [
    `Primary conversion target: ${intake.conversionGoal}.`,
    "Single dominant CTA per page fold.",
    "Risk-reversal copy near conversion actions.",
  ];

  if (intake.contentDensity === "dense") {
    suggestions.push("Use progressive disclosure to avoid overload.");
  }

  if (intake.complexityLevel === "starter") {
    suggestions.push("Keep component depth shallow and avoid animation-heavy patterns.");
  }

  return suggestions;
}

export function buildComponentIntelligence(input: {
  intake: BriefIntake;
  architecture: PageArchitectureReport;
  taste: TasteDirectionReport;
  items: CatalogItemRecord[];
}): ComponentIntelligenceReport {
  const scored = input.items
    .map((item) => {
      const breakdown = scoreComponentItem({
        item,
        intake: input.intake,
        architecture: input.architecture,
        taste: input.taste,
      });

      return {
        item,
        breakdown,
      };
    })
    .filter((entry) => entry.breakdown.total >= 35)
    .sort((a, b) => b.breakdown.total - a.breakdown.total)
    .slice(0, 8);

  const recommendations: ComponentIntelligenceRecommendation[] = scored.map(({ item, breakdown }) => ({
    id: item.id,
    source: item.source,
    componentName: item.componentName,
    category: item.category,
    patternFamily: patternFamilyForCategory(item.category),
    recommendedForPages: item.pageTypeFit.slice(0, 3),
    complexityFit: complexityFit(breakdown.total),
    rationale: [
      `${item.componentName} scored ${breakdown.total} for this brief.`,
      `Pattern family ${patternFamilyForCategory(item.category)} matches ${input.intake.primaryGoal}.`,
      `${item.source} provides reusable implementation patterns for ${input.intake.targetBuildDestination}.`,
    ],
    scoreBreakdown: breakdown,
  }));

  return {
    summary: `Generated ${recommendations.length} component recommendations for ${input.intake.verticalPack}.`,
    recommendations,
    trustModules: buildTrustModules(input.intake),
    conversionUxSuggestions: buildConversionUxSuggestions(input.intake),
  };
}
