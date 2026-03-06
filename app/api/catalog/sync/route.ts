import { NextResponse } from "next/server";

import { runCatalogSync } from "@/lib/catalog/sync";

const ADMIN_TOKEN = process.env.CATALOG_ADMIN_TOKEN;

function isAdminAuthorized(request: Request): boolean {
  const token = request.headers.get("x-admin-token");
  return Boolean(token && ADMIN_TOKEN && token === ADMIN_TOKEN);
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runCatalogSync();
  return NextResponse.json(result);
}
