import { buildTasteDirection } from "@/lib/design/taste-engine";
import { buildComponentIntelligence } from "@/lib/recommendation/component-intelligence";
import { listCatalogItems } from "@/lib/catalog/repository";

import { normalizeBriefIntake } from "./intake";
import { analyzeBrief } from "./analysis";
import { derivePageArchitecture } from "./architecture";
import type { BriefIntake, ComposeOutput } from "./types";

export const ENGINE_VERSION = "decision-engine-v1";

export async function composeDecisionPackage(input: BriefIntake): Promise<ComposeOutput> {
  const intake = normalizeBriefIntake(input);
  const strategy = analyzeBrief(intake);
  const pageArchitecture = derivePageArchitecture(intake);
  const taste = buildTasteDirection(intake);
  const catalog = await listCatalogItems({ status: "approved" });
  const componentIntelligence = buildComponentIntelligence({
    intake,
    architecture: pageArchitecture,
    taste,
    items: catalog.items,
  });

  return {
    intake,
    strategy,
    pageArchitecture,
    taste,
    componentIntelligence,
    rationale: {
      headline: "Decision package generated from deterministic strategy, architecture, and pattern scoring.",
      bullets: [
        "Scope and page priorities are derived from intake goals and complexity.",
        "Taste direction is constrained by vertical pack and brand personality.",
        "Component intelligence uses weighted deterministic ranking with transparent breakdown.",
      ],
    },
    generatedAt: new Date().toISOString(),
    engineVersion: ENGINE_VERSION,
  };
}
