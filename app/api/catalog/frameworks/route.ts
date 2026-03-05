import { NextResponse } from "next/server";

import type { SiteType } from "@/lib/catalog";
import { FRAMEWORK_LIBRARY_CATALOG } from "@/lib/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteType = searchParams.get("siteType") as SiteType | null;

  const frameworks = siteType
    ? FRAMEWORK_LIBRARY_CATALOG.filter((library) => library.bestFor.includes(siteType))
    : FRAMEWORK_LIBRARY_CATALOG;

  return NextResponse.json({
    count: frameworks.length,
    frameworks,
  });
}
