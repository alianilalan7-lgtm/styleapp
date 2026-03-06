import { REGISTRY_ITEMS } from "@/lib/catalog";

import { mapLegacyItemToCatalogRecord, type CatalogItemRecord } from "../types";

export function fetchStaticCatalogSource(): CatalogItemRecord[] {
  return REGISTRY_ITEMS.map(mapLegacyItemToCatalogRecord);
}
