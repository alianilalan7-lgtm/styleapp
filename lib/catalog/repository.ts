import { getRuntimeCatalogSeed } from "./runtime";
import type {
  CatalogItemRecord,
  CatalogListFilter,
  CatalogListResult,
  CatalogReviewRecord,
  CatalogStatus,
  CatalogSyncRun,
} from "./types";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type MemoryStore = {
  items: CatalogItemRecord[];
  reviews: CatalogReviewRecord[];
  syncRuns: CatalogSyncRun[];
};

const memoryStore: MemoryStore = {
  items: getRuntimeCatalogSeed(),
  reviews: [],
  syncRuns: [],
};

function hasSupabase(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function filterItems(items: CatalogItemRecord[], filter: CatalogListFilter): CatalogItemRecord[] {
  return items.filter((item) => {
    if (filter.status && item.status !== filter.status) return false;
    if (filter.siteType && !item.industryFit.includes(filter.siteType)) return false;
    if (filter.pageType && !item.pageTypeFit.includes(filter.pageType)) return false;
    if (filter.vertical && !item.verticalFit.includes(filter.vertical)) return false;
    if (filter.complexity && item.complexity !== filter.complexity) return false;
    if (
      filter.frameworkPreference &&
      filter.frameworkPreference !== "auto" &&
      !item.framework.toLowerCase().includes(filter.frameworkPreference.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

function fromDbRow(row: Record<string, unknown>): CatalogItemRecord {
  return {
    id: String(row.id),
    fingerprint: String(row.fingerprint),
    hash: String(row.hash),
    status: String(row.status) as CatalogStatus,
    source: String(row.source),
    libraryName: String(row.library_name),
    componentName: String(row.component_name),
    category: String(row.category),
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    useCases: Array.isArray(row.use_cases) ? row.use_cases.map(String) : [],
    industryFit: Array.isArray(row.industry_fit) ? row.industry_fit.map((value) => String(value) as CatalogItemRecord["industryFit"][number]) : [],
    pageTypeFit: Array.isArray(row.page_type_fit) ? row.page_type_fit.map((value) => String(value) as CatalogItemRecord["pageTypeFit"][number]) : [],
    verticalFit: Array.isArray(row.vertical_fit) ? row.vertical_fit.map((value) => String(value) as CatalogItemRecord["verticalFit"][number]) : [],
    conversionFit: Array.isArray(row.conversion_fit) ? row.conversion_fit.map((value) => String(value) as CatalogItemRecord["conversionFit"][number]) : [],
    stylePackFit: Array.isArray(row.style_pack_fit) ? row.style_pack_fit.map(String) : [],
    framework: String(row.framework),
    complexity: String(row.complexity) as CatalogItemRecord["complexity"],
    accessibilityLevel: String(row.accessibility_level) as CatalogItemRecord["accessibilityLevel"],
    url: String(row.url),
    previewImage: String(row.preview_image || ""),
    lastIndexedAt: String(row.last_indexed_at),
    lastSeenAt: String(row.last_seen_at),
    qualityScore: Number(row.quality_score || 0),
    metadata: typeof row.metadata === "object" && row.metadata ? (row.metadata as Record<string, unknown>) : {},
  };
}

function toDbRow(item: CatalogItemRecord): Record<string, unknown> {
  return {
    id: item.id,
    fingerprint: item.fingerprint,
    hash: item.hash,
    status: item.status,
    source: item.source,
    library_name: item.libraryName,
    component_name: item.componentName,
    category: item.category,
    tags: item.tags,
    use_cases: item.useCases,
    industry_fit: item.industryFit,
    page_type_fit: item.pageTypeFit,
    vertical_fit: item.verticalFit,
    conversion_fit: item.conversionFit,
    style_pack_fit: item.stylePackFit,
    framework: item.framework,
    complexity: item.complexity,
    accessibility_level: item.accessibilityLevel,
    url: item.url,
    preview_image: item.previewImage,
    last_indexed_at: item.lastIndexedAt,
    last_seen_at: item.lastSeenAt,
    quality_score: item.qualityScore,
    metadata: item.metadata,
  };
}

async function supabaseFetch(path: string, init: RequestInit): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("apikey", SUPABASE_SERVICE_ROLE_KEY || "");
  headers.set("Authorization", `Bearer ${SUPABASE_SERVICE_ROLE_KEY || ""}`);
  headers.set("Content-Type", "application/json");

  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function listCatalogItems(filter: CatalogListFilter): Promise<CatalogListResult> {
  if (!hasSupabase()) {
    return {
      items: filterItems(memoryStore.items, filter),
      storageMode: "memory",
      warning: "Supabase config missing. Using memory catalog.",
    };
  }

  try {
    const response = await supabaseFetch("/rest/v1/catalog_items?select=*", {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Supabase list failed (${response.status})`);
    }

    const rows = (await response.json()) as Array<Record<string, unknown>>;
    const items = rows.map(fromDbRow);

    return {
      items: filterItems(items, filter),
      storageMode: "supabase",
    };
  } catch (error) {
    return {
      items: filterItems(memoryStore.items, filter),
      storageMode: "memory",
      warning: error instanceof Error ? error.message : "Supabase read failed. Using memory fallback.",
    };
  }
}

export async function upsertCatalogItems(items: CatalogItemRecord[]): Promise<{ inserted: number; updated: number; storageMode: "supabase" | "memory"; warning?: string }> {
  if (!hasSupabase()) {
    let inserted = 0;
    let updated = 0;

    items.forEach((item) => {
      const index = memoryStore.items.findIndex((existing) => existing.fingerprint === item.fingerprint);
      if (index === -1) {
        memoryStore.items.push(item);
        inserted += 1;
      } else {
        memoryStore.items[index] = { ...memoryStore.items[index], ...item };
        updated += 1;
      }
    });

    return {
      inserted,
      updated,
      storageMode: "memory",
      warning: "Supabase config missing. Upsert applied in memory.",
    };
  }

  try {
    const response = await supabaseFetch("/rest/v1/catalog_items?on_conflict=fingerprint", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(items.map(toDbRow)),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Supabase upsert failed (${response.status})`);
    }

    const rows = (await response.json()) as Array<Record<string, unknown>>;
    return {
      inserted: rows.length,
      updated: 0,
      storageMode: "supabase",
    };
  } catch (error) {
    return {
      inserted: 0,
      updated: 0,
      storageMode: "memory",
      warning: error instanceof Error ? error.message : "Supabase write failed.",
    };
  }
}

export async function reviewCatalogItem(input: {
  id: string;
  action: "approve" | "deprecate" | "reject";
  notes: string;
  reviewer: string;
}): Promise<{ item: CatalogItemRecord | null; storageMode: "supabase" | "memory"; warning?: string }> {
  const nextStatus: CatalogStatus = input.action === "approve" ? "approved" : "deprecated";

  if (!hasSupabase()) {
    const index = memoryStore.items.findIndex((item) => item.id === input.id);
    if (index === -1) {
      return { item: null, storageMode: "memory", warning: "Item not found." };
    }

    const item = { ...memoryStore.items[index], status: nextStatus };
    memoryStore.items[index] = item;
    memoryStore.reviews.push({
      id: `review-${Date.now()}`,
      itemId: input.id,
      action: input.action,
      notes: input.notes,
      reviewer: input.reviewer,
      createdAt: new Date().toISOString(),
    });

    return {
      item,
      storageMode: "memory",
      warning: "Supabase config missing. Review applied in memory.",
    };
  }

  try {
    const patch = await supabaseFetch(`/rest/v1/catalog_items?id=eq.${encodeURIComponent(input.id)}`, {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!patch.ok) {
      const message = await patch.text();
      throw new Error(message || `Supabase review failed (${patch.status})`);
    }

    const rows = (await patch.json()) as Array<Record<string, unknown>>;
    const item = rows[0] ? fromDbRow(rows[0]) : null;
    const reviewId = `review-${Date.now()}`;
    const reviewWrite = await supabaseFetch("/rest/v1/catalog_reviews", {
      method: "POST",
      body: JSON.stringify({
        id: reviewId,
        item_id: input.id,
        action: input.action,
        notes: input.notes,
        reviewer: input.reviewer,
      }),
    });

    if (!reviewWrite.ok) {
      const message = await reviewWrite.text();
      return {
        item,
        storageMode: "supabase",
        warning: message || "Catalog review log insert failed.",
      };
    }

    return {
      item,
      storageMode: "supabase",
    };
  } catch (error) {
    return {
      item: null,
      storageMode: "memory",
      warning: error instanceof Error ? error.message : "Supabase review failed.",
    };
  }
}

export async function addCatalogSyncRun(run: CatalogSyncRun): Promise<{ storageMode: "supabase" | "memory"; warning?: string }> {
  if (!hasSupabase()) {
    memoryStore.syncRuns.push(run);
    return {
      storageMode: "memory",
      warning: "Supabase config missing. Sync run stored in memory.",
    };
  }

  try {
    const response = await supabaseFetch("/rest/v1/catalog_sync_runs", {
      method: "POST",
      body: JSON.stringify({
        id: run.id,
        source: run.source,
        started_at: run.startedAt,
        finished_at: run.finishedAt,
        inserted: run.inserted,
        updated: run.updated,
        deprecated: run.deprecated,
        notes: run.notes,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Supabase sync run insert failed (${response.status})`);
    }

    return { storageMode: "supabase" };
  } catch (error) {
    return {
      storageMode: "memory",
      warning: error instanceof Error ? error.message : "Supabase sync run write failed.",
    };
  }
}
