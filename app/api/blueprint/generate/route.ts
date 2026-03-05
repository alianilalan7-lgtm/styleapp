import { NextResponse } from "next/server";

import { buildBlueprintOutput, type ProjectBrief } from "@/lib/blueprint";
import type { Locale } from "@/lib/i18n";
import type { PromptPreset, StylePack } from "@/lib/style-engine";

type GeneratePayload = {
  brief: ProjectBrief;
  pack: StylePack;
  locale: Locale;
  preset: PromptPreset;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as GeneratePayload;

  const blueprint = buildBlueprintOutput(
    payload.brief,
    payload.pack,
    payload.preset,
    payload.locale,
  );

  return NextResponse.json(blueprint);
}
