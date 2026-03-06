import { NextResponse } from "next/server";

import { listCatalogItems } from "@/lib/catalog/repository";
import type { CatalogStatus } from "@/lib/catalog/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status") as CatalogStatus | null;
  const siteType = searchParams.get("siteType") as Parameters<typeof listCatalogItems>[0]["siteType"];
  const pageType = searchParams.get("pageType") as Parameters<typeof listCatalogItems>[0]["pageType"];
  const vertical = searchParams.get("vertical") as Parameters<typeof listCatalogItems>[0]["vertical"];
  const complexity = searchParams.get("complexity") as Parameters<typeof listCatalogItems>[0]["complexity"];
  const frameworkPreference = searchParams.get("frameworkPreference") ?? undefined;

  const result = await listCatalogItems({
    status: status ?? undefined,
    siteType: siteType ?? undefined,
    pageType: pageType ?? undefined,
    vertical: vertical ?? undefined,
    complexity: complexity ?? undefined,
    frameworkPreference,
  });

  return NextResponse.json({
    count: result.items.length,
    storageMode: result.storageMode,
    warning: result.warning,
    items: result.items,
  });
}
