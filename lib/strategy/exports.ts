import type { BuildDestination, ComposeOutput, DestinationPack } from "./types";

function heading(destination: BuildDestination): string {
  const map: Record<BuildDestination, string> = {
    framer: "Framer-ready Decision Brief",
    lovable: "Lovable-ready Product Spec",
    codex: "Codex-ready Implementation Brief",
    nextjs: "Next.js Delivery Plan",
  };
  return map[destination];
}

function destinationFocus(destination: BuildDestination): string[] {
  const focus: Record<BuildDestination, string[]> = {
    framer: [
      "Narrative and page hierarchy for rapid visual assembly",
      "Section-level content intent and conversion placement",
      "Trust and proof modules before CTA commitments",
    ],
    lovable: [
      "Product behavior and screen intent",
      "Prioritized MVP scope with explicit tradeoffs",
      "Pattern recommendations with complexity guardrails",
    ],
    codex: [
      "Implementation sequence by feature dependency",
      "Deterministic data contracts for each report output",
      "Component family rationale with ranking evidence",
    ],
    nextjs: [
      "App Router page map",
      "Component boundaries and section composition",
      "Incremental delivery order with acceptance checks",
    ],
  };

  return focus[destination];
}

export function buildDestinationPack(compose: ComposeOutput, destination: BuildDestination): DestinationPack {
  const markdown = [
    `# ${heading(destination)}`,
    "",
    `Generated: ${compose.generatedAt}`,
    `Engine: ${compose.engineVersion}`,
    "",
    "## Strategy",
    `- Product interpretation: ${compose.strategy.productInterpretation}`,
    `- Recommended scope: ${compose.strategy.recommendedScope}`,
    `- Primary conversion goal: ${compose.intake.conversionGoal}`,
    "",
    "## Page Architecture",
    ...compose.pageArchitecture.pages.map((page) => `- ${page.page}: ${page.role} (${page.priority})`),
    "",
    "## Taste Direction",
    `- Direction: ${compose.taste.directionName}`,
    `- Visual tone: ${compose.taste.visualTone}`,
    `- Layout: ${compose.taste.layoutDirection}`,
    `- Typography: ${compose.taste.typographyDirection}`,
    `- Motion: ${compose.taste.motionLevel}`,
    "",
    "## Component Intelligence",
    ...compose.componentIntelligence.recommendations.slice(0, 6).map((item) =>
      `- ${item.componentName} (${item.patternFamily}) score=${item.scoreBreakdown.total}`,
    ),
    "",
    "## Destination Focus",
    ...destinationFocus(destination).map((line) => `- ${line}`),
  ].join("\n");

  return {
    destination,
    markdown,
    json: {
      destination,
      generatedAt: compose.generatedAt,
      strategy: compose.strategy,
      architecture: compose.pageArchitecture,
      taste: compose.taste,
      componentIntelligence: compose.componentIntelligence,
      rationale: compose.rationale,
      destinationFocus: destinationFocus(destination),
    },
  };
}
