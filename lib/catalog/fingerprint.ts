import { createHash } from "node:crypto";

import type { CatalogItemRecord } from "./types";

export function buildCatalogFingerprint(item: Pick<CatalogItemRecord, "source" | "componentName" | "url" | "category" | "framework">): string {
  const input = [
    item.source.trim().toLowerCase(),
    item.componentName.trim().toLowerCase(),
    item.url.trim().toLowerCase(),
    item.category.trim().toLowerCase(),
    item.framework.trim().toLowerCase(),
  ].join("|");

  return createHash("sha256").update(input).digest("hex");
}

export function buildCatalogHash(item: CatalogItemRecord): string {
  const input = JSON.stringify({
    source: item.source,
    libraryName: item.libraryName,
    componentName: item.componentName,
    category: item.category,
    tags: item.tags,
    useCases: item.useCases,
    industryFit: item.industryFit,
    pageTypeFit: item.pageTypeFit,
    stylePackFit: item.stylePackFit,
    framework: item.framework,
    complexity: item.complexity,
    accessibilityLevel: item.accessibilityLevel,
    url: item.url,
  });

  return createHash("sha256").update(input).digest("hex");
}
