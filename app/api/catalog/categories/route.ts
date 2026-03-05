import { NextResponse } from "next/server";

import { REGISTRY_ITEMS } from "@/lib/catalog";

export async function GET() {
  const categories = Array.from(new Set(REGISTRY_ITEMS.map((item) => item.category))).sort();
  return NextResponse.json({ categories });
}
