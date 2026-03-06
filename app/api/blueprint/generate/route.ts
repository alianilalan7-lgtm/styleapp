import { NextResponse } from "next/server";

import { buildBlueprintOutput, type BlueprintGenerationMeta, type ProjectBrief } from "@/lib/blueprint";
import type { Locale } from "@/lib/i18n";
import type { PromptPreset, StylePack } from "@/lib/style-engine";
import { mapLegacyBriefToIntake, buildLegacyDecisionSnapshot } from "@/lib/strategy/compat";
import { composeDecisionPackage } from "@/lib/strategy/reports";

type GeneratePayload = {
  brief: ProjectBrief;
  pack: StylePack;
  locale: Locale;
  preset: PromptPreset;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isGeneratePayload(value: unknown): value is GeneratePayload {
  if (!isRecord(value)) return false;
  if (!isRecord(value.brief)) return false;
  if (!isRecord(value.pack)) return false;
  if (value.locale !== "tr" && value.locale !== "en") return false;
  if (typeof value.preset !== "string") return false;
  return true;
}

function requestId() {
  return `bp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function generationMeta(locale: Locale, requestIdValue: string, startedAt: number): BlueprintGenerationMeta {
  return {
    source: "local",
    requestId: requestIdValue,
    latencyMs: Date.now() - startedAt,
    warning:
      locale === "tr"
        ? "Deterministik mod aktif: AI refine kapali, yerel karar motoru kullanildi."
        : "Deterministic mode active: AI refine disabled, local decision engine used.",
  };
}

export async function POST(request: Request) {
  const id = requestId();
  const startedAt = Date.now();

  try {
    const body = (await request.json()) as unknown;
    if (!isGeneratePayload(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const intake = mapLegacyBriefToIntake({
      brief: body.brief,
      pack: body.pack,
      locale: body.locale,
    });
    const compose = await composeDecisionPackage(intake);
    const blueprint = buildBlueprintOutput(body.brief, body.pack, body.preset, body.locale);

    return NextResponse.json(
      {
        ...blueprint,
        decisionSnapshot: buildLegacyDecisionSnapshot(compose),
        generationMeta: generationMeta(body.locale, id, startedAt),
      },
      {
        headers: {
          "x-blueprint-request-id": id,
          "x-blueprint-source": "local",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Blueprint generation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
