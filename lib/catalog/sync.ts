import { dedupeCatalogItems } from "./dedupe";
import { computeCatalogStatusByFreshness } from "./freshness";
import { getRuntimeCatalogSeed } from "./runtime";
import { listCatalogItems, upsertCatalogItems, addCatalogSyncRun } from "./repository";

import type { CatalogItemRecord, CatalogSyncRun } from "./types";

function toCandidate(item: CatalogItemRecord): CatalogItemRecord {
  return {
    ...item,
    status: "candidate",
  };
}

export async function runCatalogSync(): Promise<{
  source: string;
  inserted: number;
  updated: number;
  deprecated: number;
  storageMode: "supabase" | "memory";
  warning?: string;
}> {
  const startedAt = new Date().toISOString();
  const source = "static-seed";
  const freshItems = dedupeCatalogItems(getRuntimeCatalogSeed());
  const existing = await listCatalogItems({});

  const existingByFingerprint = new Map(existing.items.map((item) => [item.fingerprint, item]));
  const freshFingerprints = new Set(freshItems.map((item) => item.fingerprint));

  const candidates: CatalogItemRecord[] = [];
  let deprecated = 0;

  freshItems.forEach((item) => {
    const previous = existingByFingerprint.get(item.fingerprint);

    if (!previous) {
      candidates.push(toCandidate(item));
      return;
    }

    if (previous.hash !== item.hash) {
      candidates.push(toCandidate(item));
      return;
    }

    const freshnessStatus = computeCatalogStatusByFreshness(previous);
    if (freshnessStatus === "deprecated" && previous.status !== "deprecated") {
      candidates.push({ ...previous, status: "deprecated" });
      deprecated += 1;
    }
  });

  existing.items.forEach((item) => {
    if (freshFingerprints.has(item.fingerprint)) return;
    const freshnessStatus = computeCatalogStatusByFreshness(item);
    if (freshnessStatus === "deprecated" && item.status !== "deprecated") {
      candidates.push({ ...item, status: "deprecated" });
      deprecated += 1;
    }
  });

  const upsert = await upsertCatalogItems(candidates);

  const run: CatalogSyncRun = {
    id: `sync-${Date.now()}`,
    source,
    startedAt,
    finishedAt: new Date().toISOString(),
    inserted: upsert.inserted,
    updated: upsert.updated,
    deprecated,
    notes: "Deterministic catalog sync run",
  };

  const log = await addCatalogSyncRun(run);

  return {
    source,
    inserted: upsert.inserted,
    updated: upsert.updated,
    deprecated,
    storageMode: upsert.storageMode,
    warning: upsert.warning || log.warning || existing.warning,
  };
}
