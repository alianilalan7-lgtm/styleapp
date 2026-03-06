import type { Locale } from "@/lib/i18n";
import type { FrameworkPreference, PageType, SiteType } from "@/lib/catalog";
import type { StylePack } from "@/lib/style-engine";

export type ProjectType = "marketing-site" | "web-app" | "dashboard-product";

export type BusinessType =
  | "ai-saas"
  | "agency"
  | "portfolio"
  | "beauty-clinic"
  | "restaurant"
  | "education"
  | "fintech"
  | "ecommerce"
  | "dashboard"
  | "b2b-saas";

export type PrimaryGoal =
  | "lead-generation"
  | "sales"
  | "product-activation"
  | "trust-building"
  | "audience-growth";

export type ConversionGoal =
  | "book-demo"
  | "start-trial"
  | "contact-lead"
  | "checkout"
  | "signup"
  | "download";

export type ContentDensity = "light" | "balanced" | "dense";

export type BrandPersonalitySignal =
  | "trustworthy"
  | "premium"
  | "playful"
  | "editorial"
  | "bold"
  | "minimal"
  | "technical";

export type ComplexityLevel = "starter" | "balanced" | "advanced";

export type VerticalPack = "ai-saas" | "agency" | "dashboard";

export type BuildDestination = "framer" | "lovable" | "codex" | "nextjs";

export type BriefIntake = {
  locale: Locale;
  projectType: ProjectType;
  businessType: BusinessType;
  audience: string;
  primaryGoal: PrimaryGoal;
  conversionGoal: ConversionGoal;
  contentDensity: ContentDensity;
  brandPersonality: BrandPersonalitySignal[];
  technicalPreference: FrameworkPreference;
  targetBuildDestination: BuildDestination;
  complexityLevel: ComplexityLevel;
  verticalPack: VerticalPack;
  briefText: string;
};

export type StrategyReport = {
  productInterpretation: string;
  recommendedScope: string;
  primaryUserJourney: string[];
  conversionLogic: string[];
  contentStrategy: string[];
  mvpNow: string[];
  laterPhase: string[];
  risks: string[];
  tradeoffs: string[];
};

export type ArchitecturePriority = "high" | "medium" | "low";

export type PageArchitectureItem = {
  page: PageType;
  role: string;
  priority: ArchitecturePriority;
  required: boolean;
  suggestedSections: string[];
  contentDepth: ContentDensity;
  rationale: string[];
};

export type PageArchitectureReport = {
  siteType: SiteType;
  requiredPages: PageType[];
  optionalPages: PageType[];
  pages: PageArchitectureItem[];
};

export type TasteDirectionReport = {
  directionName: string;
  visualTone: string;
  aestheticSignals: string[];
  layoutDirection: string;
  typographyDirection: string;
  motionLevel: string;
  trustSignal: string;
  stylePack: StylePack;
  reasoning: string[];
};

export type ComponentScoreBreakdown = {
  siteProjectFit: number;
  pageRoleFit: number;
  verticalFit: number;
  conversionFit: number;
  tasteFit: number;
  technicalPreferenceFit: number;
  complexityPenalty: number;
  total: number;
};

export type ComponentIntelligenceRecommendation = {
  id: string;
  source: string;
  componentName: string;
  category: string;
  patternFamily: string;
  recommendedForPages: PageType[];
  complexityFit: "fit" | "stretch" | "overkill";
  rationale: string[];
  scoreBreakdown: ComponentScoreBreakdown;
};

export type ComponentIntelligenceReport = {
  summary: string;
  recommendations: ComponentIntelligenceRecommendation[];
  trustModules: string[];
  conversionUxSuggestions: string[];
};

export type DecisionRationale = {
  headline: string;
  bullets: string[];
};

export type ComposeOutput = {
  intake: BriefIntake;
  strategy: StrategyReport;
  pageArchitecture: PageArchitectureReport;
  taste: TasteDirectionReport;
  componentIntelligence: ComponentIntelligenceReport;
  rationale: DecisionRationale;
  generatedAt: string;
  engineVersion: string;
};

export type DestinationPack = {
  destination: BuildDestination;
  markdown: string;
  json: Record<string, unknown>;
};
