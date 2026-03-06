import type { BriefIntake } from "@/lib/strategy/types";

export function buildTasteReasoning(intake: BriefIntake, directionName: string): string[] {
  return [
    `${directionName} direction matches ${intake.verticalPack} vertical constraints.`,
    `Content density ${intake.contentDensity} is reflected in the selected layout rhythm.`,
    `Primary goal ${intake.primaryGoal} is supported through conversion-first hierarchy.`,
    `Brand personality signals (${intake.brandPersonality.join(", ")}) shape tone and motion decisions.`,
  ];
}
