import { fetchStaticCatalogSource } from "./sources/static-source";
import { normalizeCatalogItem } from "./normalize";
import { buildCatalogFingerprint, buildCatalogHash } from "./fingerprint";
import { computeCatalogQualityScore } from "./scoring";

import type { CatalogItemRecord } from "./types";

export function getRuntimeCatalogSeed(): CatalogItemRecord[] {
  return fetchStaticCatalogSource().map((raw) => {
    const normalized = normalizeCatalogItem(raw);
    const fingerprint = buildCatalogFingerprint(normalized);
    const hash = buildCatalogHash(normalized);

    return {
      ...normalized,
      fingerprint,
      hash,
      qualityScore: computeCatalogQualityScore(normalized),
      lastSeenAt: normalized.lastIndexedAt,
    };
  });
}
