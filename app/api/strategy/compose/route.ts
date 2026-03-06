import { NextResponse } from "next/server";

import { composeDecisionPackage } from "@/lib/strategy/reports";
import type { BriefIntake } from "@/lib/strategy/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isBriefIntake(value: unknown): value is BriefIntake {
  if (!isRecord(value)) return false;
  return (
    typeof value.locale === "string" &&
    typeof value.projectType === "string" &&
    typeof value.businessType === "string" &&
    typeof value.audience === "string" &&
    typeof value.primaryGoal === "string" &&
    typeof value.conversionGoal === "string" &&
    typeof value.contentDensity === "string" &&
    Array.isArray(value.brandPersonality) &&
    typeof value.technicalPreference === "string" &&
    typeof value.targetBuildDestination === "string" &&
    typeof value.complexityLevel === "string" &&
    typeof value.verticalPack === "string" &&
    typeof value.briefText === "string"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isBriefIntake(body)) {
      return NextResponse.json({ error: "Invalid brief intake payload" }, { status: 400 });
    }

    const output = await composeDecisionPackage(body);
    return NextResponse.json(output);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Compose failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
