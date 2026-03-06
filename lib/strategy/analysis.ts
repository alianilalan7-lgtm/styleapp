import type { BriefIntake, StrategyReport } from "./types";

function scopeLine(intake: BriefIntake): string {
  if (intake.complexityLevel === "starter") {
    return "Keep MVP narrow: one primary conversion path and one supporting proof path.";
  }
  if (intake.complexityLevel === "advanced") {
    return "Allow multi-segment architecture with secondary conversion paths and richer content depth.";
  }
  return "Balance speed and depth: primary journey first, secondary journeys after proof blocks.";
}

function conversionLogic(intake: BriefIntake): string[] {
  return [
    `Primary conversion event: ${intake.conversionGoal}.`,
    "Each page should contain one dominant CTA and one supporting CTA.",
    "Trust modules appear before commitment-heavy actions.",
  ];
}

function journey(intake: BriefIntake): string[] {
  const middle =
    intake.primaryGoal === "trust-building"
      ? "Trust proof and risk reduction"
      : "Value proof and capability framing";

  return [
    "Entry: problem-solution framing",
    `Middle: ${middle}`,
    `Conversion: ${intake.conversionGoal}`,
    "Post-conversion: expectation setting",
  ];
}

function risks(intake: BriefIntake): string[] {
  const list = [
    "Over-scoping before validating conversion assumptions.",
    "Using visually strong patterns that reduce clarity.",
    "Weak differentiation against category norms.",
  ];

  if (intake.contentDensity === "dense") {
    list.push("Information overload risk without explicit hierarchy.");
  }

  return list;
}

function tradeoffs(intake: BriefIntake): string[] {
  return [
    "Higher polish usually increases implementation time.",
    "Higher component depth can reduce maintainability in MVP phase.",
    `Technical preference ${intake.technicalPreference} may narrow library options.`,
  ];
}

export function analyzeBrief(intake: BriefIntake): StrategyReport {
  return {
    productInterpretation: `${intake.businessType} oriented ${intake.projectType} for ${intake.audience || "a defined audience"}.`,
    recommendedScope: scopeLine(intake),
    primaryUserJourney: journey(intake),
    conversionLogic: conversionLogic(intake),
    contentStrategy: [
      `Content density target: ${intake.contentDensity}.`,
      "Place outcome-oriented proof above deep feature detail.",
      "Separate educational content from conversion-critical content.",
    ],
    mvpNow: [
      "Core value narrative",
      "High-priority pages and conversion flow",
      "Essential trust and objection handling modules",
    ],
    laterPhase: [
      "Secondary persona journeys",
      "Expanded content/cms depth",
      "Advanced personalization and experimentation",
    ],
    risks: risks(intake),
    tradeoffs: tradeoffs(intake),
  };
}
