import { NextResponse } from "next/server";

import type { RegistryCategory, SiteType } from "@/lib/catalog";
import { searchCatalog } from "@/lib/blueprint";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const siteType = searchParams.get("siteType") as SiteType | null;
  const category = searchParams.get("category") as RegistryCategory | null;

  const items = searchCatalog(query, siteType ?? undefined, category ?? undefined);

  return NextResponse.json({
    count: items.length,
    items,
  });
}
