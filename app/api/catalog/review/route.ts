import { NextResponse } from "next/server";

import { reviewCatalogItem } from "@/lib/catalog/repository";

const ADMIN_TOKEN = process.env.CATALOG_ADMIN_TOKEN;

type ReviewPayload = {
  id: string;
  action: "approve" | "deprecate" | "reject";
  notes?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isReviewPayload(value: unknown): value is ReviewPayload {
  if (!isRecord(value)) return false;
  if (typeof value.id !== "string") return false;
  if (!["approve", "deprecate", "reject"].includes(String(value.action))) return false;
  if (value.notes !== undefined && typeof value.notes !== "string") return false;
  return true;
}

function isAdminAuthorized(request: Request): boolean {
  const token = request.headers.get("x-admin-token");
  return Boolean(token && ADMIN_TOKEN && token === ADMIN_TOKEN);
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as unknown;
  if (!isReviewPayload(body)) {
    return NextResponse.json({ error: "Invalid review payload" }, { status: 400 });
  }

  const result = await reviewCatalogItem({
    id: body.id,
    action: body.action,
    notes: body.notes ?? "",
    reviewer: "admin-token",
  });

  return NextResponse.json(result);
}
