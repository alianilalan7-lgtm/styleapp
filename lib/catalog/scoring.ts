import type { CatalogItemRecord } from "./types";

export function computeCatalogQualityScore(item: CatalogItemRecord): number {
  let score = 0;
  if (item.accessibilityLevel === "strong") score += 20;
  if (item.tags.length >= 3) score += 15;
  if (item.useCases.length >= 2) score += 15;
  if (item.pageTypeFit.length >= 2) score += 15;
  if (item.industryFit.length >= 2) score += 15;
  if (item.stylePackFit.length >= 2) score += 10;
  if (item.complexity === "low" || item.complexity === "medium") score += 10;

  return Math.max(0, Math.min(score, 100));
}
