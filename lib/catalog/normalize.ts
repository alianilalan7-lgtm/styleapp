import type { CatalogItemRecord } from "./types";

export function normalizeCatalogItem(item: CatalogItemRecord): CatalogItemRecord {
  return {
    ...item,
    source: item.source.trim(),
    libraryName: item.libraryName.trim(),
    componentName: item.componentName.trim(),
    category: item.category.trim().toLowerCase(),
    tags: Array.from(new Set(item.tags.map((tag) => tag.trim().toLowerCase()))),
    useCases: Array.from(new Set(item.useCases.map((useCase) => useCase.trim().toLowerCase()))),
    stylePackFit: Array.from(new Set(item.stylePackFit.map((fit) => fit.trim()))),
    framework: item.framework.trim(),
    url: item.url.trim(),
  };
}
