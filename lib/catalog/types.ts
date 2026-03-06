import type { PageType, RegistryItem, SiteType } from "@/lib/catalog";
import type { BuildDestination, VerticalPack } from "@/lib/strategy/types";

export type CatalogStatus = "approved" | "candidate" | "deprecated";

export type CatalogComplexity = "low" | "medium" | "high";

export type CatalogItemRecord = {
  id: string;
  fingerprint: string;
  hash: string;
  status: CatalogStatus;
  source: string;
  libraryName: string;
  componentName: string;
  category: string;
  tags: string[];
  useCases: string[];
  industryFit: SiteType[];
  pageTypeFit: PageType[];
  verticalFit: VerticalPack[];
  conversionFit: BuildDestination[];
  stylePackFit: string[];
  framework: string;
  complexity: CatalogComplexity;
  accessibilityLevel: "good" | "strong";
  url: string;
  previewImage: string;
  lastIndexedAt: string;
  lastSeenAt: string;
  qualityScore: number;
  metadata: Record<string, unknown>;
};

export type CatalogReviewRecord = {
  id: string;
  itemId: string;
  action: "approve" | "deprecate" | "reject";
  notes: string;
  reviewer: string;
  createdAt: string;
};

export type CatalogSyncRun = {
  id: string;
  source: string;
  startedAt: string;
  finishedAt: string;
  inserted: number;
  updated: number;
  deprecated: number;
  notes: string;
};

export type CatalogListFilter = {
  status?: CatalogStatus;
  siteType?: SiteType;
  pageType?: PageType;
  vertical?: VerticalPack;
  complexity?: CatalogComplexity;
  frameworkPreference?: string;
};

export type CatalogListResult = {
  items: CatalogItemRecord[];
  storageMode: "supabase" | "memory";
  warning?: string;
};

export function mapLegacyItemToCatalogRecord(item: RegistryItem): CatalogItemRecord {
  return {
    id: item.id,
    fingerprint: item.id,
    hash: item.id,
    status: "approved",
    source: item.source,
    libraryName: item.libraryName,
    componentName: item.componentName,
    category: item.category,
    tags: item.tags,
    useCases: item.useCases,
    industryFit: item.industryFit,
    pageTypeFit: item.pageTypeFit,
    verticalFit: item.industryFit
      .map((site) => {
        if (site === "agency") return "agency";
        if (site === "dashboard") return "dashboard";
        return "ai-saas";
      })
      .slice(0, 3) as VerticalPack[],
    conversionFit: ["framer", "lovable", "codex", "nextjs"],
    stylePackFit: item.stylePackFit,
    framework: item.framework,
    complexity: item.complexity,
    accessibilityLevel: item.accessibilityLevel,
    url: item.url,
    previewImage: item.previewImage,
    lastIndexedAt: item.lastIndexedAt,
    lastSeenAt: item.lastIndexedAt,
    qualityScore: 60,
    metadata: {
      componentType: item.componentType,
      reactCompatible: item.reactCompatible,
      stylingSystem: item.stylingSystem,
      license: item.license,
      toneFit: item.toneFit,
    },
  };
}
