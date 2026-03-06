import type { CatalogItemRecord } from "./types";

export function dedupeCatalogItems(items: CatalogItemRecord[]): CatalogItemRecord[] {
  const map = new Map<string, CatalogItemRecord>();

  items.forEach((item) => {
    const existing = map.get(item.fingerprint);
    if (!existing) {
      map.set(item.fingerprint, item);
      return;
    }

    if (item.lastIndexedAt > existing.lastIndexedAt) {
      map.set(item.fingerprint, item);
    }
  });

  return Array.from(map.values());
}
