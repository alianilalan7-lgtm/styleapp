import { buildTasteProfile } from "./style-taxonomy";
import { buildTasteReasoning } from "./reasoning";

import type { BriefIntake, TasteDirectionReport } from "@/lib/strategy/types";

export function buildTasteDirection(intake: BriefIntake): TasteDirectionReport {
  const profile = buildTasteProfile(intake.verticalPack, intake.brandPersonality);

  return {
    directionName: profile.name,
    visualTone: profile.visualTone,
    aestheticSignals: profile.aestheticSignals,
    layoutDirection: profile.layoutDirection,
    typographyDirection: profile.typographyDirection,
    motionLevel: profile.motionLevel,
    trustSignal: profile.trustSignal,
    stylePack: profile.stylePack,
    reasoning: buildTasteReasoning(intake, profile.name),
  };
}
