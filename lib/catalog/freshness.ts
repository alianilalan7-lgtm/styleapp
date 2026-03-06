import type { CatalogItemRecord, CatalogStatus } from "./types";

const STALE_DAYS = 45;

export function computeCatalogStatusByFreshness(item: CatalogItemRecord, now = new Date()): CatalogStatus {
  const lastSeen = new Date(item.lastSeenAt);
  if (Number.isNaN(lastSeen.getTime())) {
    return item.status;
  }

  const diffMs = now.getTime() - lastSeen.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays > STALE_DAYS) {
    return "deprecated";
  }

  return item.status;
}
