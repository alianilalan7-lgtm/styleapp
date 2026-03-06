import { buildPageArchitecture } from "@/lib/recommendation/page-strategy";

import type { BriefIntake, PageArchitectureReport } from "./types";

export function derivePageArchitecture(intake: BriefIntake): PageArchitectureReport {
  return buildPageArchitecture(intake);
}
