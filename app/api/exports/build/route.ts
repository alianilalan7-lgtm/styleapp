import { NextResponse } from "next/server";

import { buildDestinationPack } from "@/lib/strategy/exports";
import type { BuildDestination, ComposeOutput } from "@/lib/strategy/types";

const DESTINATIONS: BuildDestination[] = ["framer", "lovable", "codex", "nextjs"];

type ExportPayload = {
  destination: BuildDestination;
  compose: ComposeOutput;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isExportPayload(value: unknown): value is ExportPayload {
  if (!isRecord(value)) return false;
  if (!DESTINATIONS.includes(value.destination as BuildDestination)) return false;
  if (!isRecord(value.compose)) return false;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isExportPayload(body)) {
      return NextResponse.json({ error: "Invalid export payload" }, { status: 400 });
    }

    const pack = buildDestinationPack(body.compose, body.destination);
    return NextResponse.json(pack);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Export pack build failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
