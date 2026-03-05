import type { Locale } from "./i18n";
import {
  ComponentDepthPreference,
  DEFAULT_PAGE_MAP,
  FrameworkLibrary,
  FrameworkPreference,
  FRAMEWORK_LIBRARY_CATALOG,
  PageType,
  RegistryCategory,
  RegistryItem,
  REGISTRY_ITEMS,
  SiteType,
} from "./catalog";
import {
  BrandDirection,
  Concept,
  IdeaBoard,
  PromptPreset,
  StylePack,
  buildConcept,
  buildIdeaBoard,
  buildPromptByPreset,
  recommendBrandDirections,
} from "./style-engine";

export type ComponentRecommendation = {
  item: RegistryItem;
  reason: string;
  recommendedForPage: PageType;
  recommendedForSection: string;
  score: number;
};

export type FrameworkRecommendation = {
  id: string;
  name: string;
  type: FrameworkLibrary["type"];
  bestFor: SiteType[];
  pairings: string[];
  constraints: string[];
  reason: string;
  url: string;
};

export type PagePlan = {
  page: PageType;
  sections: string[];
  recommendedCategories: RegistryCategory[];
};

export type ProjectBrief = {
  siteType: SiteType;
  brandBrief: string;
  audience: string;
  pageCount: number;
  requiredPages: PageType[];
  frameworkPreference: FrameworkPreference;
  componentDepthPreference: ComponentDepthPreference;
};

export type BlueprintOutput = {
  prompt: string;
  designDirections: BrandDirection[];
  pagePlans: PagePlan[];
  componentRecommendations: ComponentRecommendation[];
  frameworkRecommendations: FrameworkRecommendation[];
  ideaBoard: IdeaBoard;
  concept: Concept;
};

const PAGE_CATEGORY_MAP: Record<PageType, RegistryCategory[]> = {
  home: ["hero", "features", "cta", "testimonials", "navbar", "footer"],
  pricing: ["pricing", "faq", "cta", "table"],
  security: ["features", "table", "testimonials", "faq"],
  faq: ["faq", "cta"],
  contact: ["contact", "form", "cta"],
  about: ["features", "testimonials", "cta"],
  features: ["features", "cta", "testimonials"],
  integrations: ["features", "table", "cta"],
  blog: ["blog", "navbar", "footer"],
  "case-studies": ["portfolio", "testimonials", "cta"],
  portfolio: ["portfolio", "carousel", "cta"],
  shop: ["ecommerce", "navbar", "cta"],
  product: ["ecommerce", "faq", "testimonials", "cta"],
  docs: ["table", "features", "navbar"],
  login: ["auth", "form", "modal"],
};

const PAGE_SECTION_MAP: Record<PageType, string[]> = {
  home: ["Hero", "Value Proposition", "Featured Blocks", "Proof", "Primary CTA"],
  pricing: ["Pricing Grid", "Plan Comparison", "FAQ", "Closing CTA"],
  security: ["Trust Hero", "Security Proof", "Compliance", "FAQ"],
  faq: ["Question List", "Support CTA"],
  contact: ["Contact Form", "Response Promise", "Alternate Channels"],
  about: ["Story Intro", "Team / Culture", "Why Us", "CTA"],
  features: ["Feature Grid", "Workflow", "Benefits", "CTA"],
  integrations: ["Integration Grid", "Compatibility", "CTA"],
  blog: ["Featured Article", "Article Grid", "Newsletter"],
  "case-studies": ["Case Grid", "Metrics", "Client Proof", "CTA"],
  portfolio: ["Project Grid", "Selected Work", "CTA"],
  shop: ["Product Grid", "Category Highlights", "Offer Strip"],
  product: ["Product Detail", "Proof", "FAQ", "Recommended Products"],
  docs: ["Quickstart", "Reference Grid", "Support CTA"],
  login: ["Login Form", "Trust Notes", "Recovery CTA"],
};

const SITE_TYPE_KEYWORDS: Record<SiteType, string[]> = {
  marketing: ["marketing", "landing", "campaign", "launch"],
  saas: ["saas", "software", "product", "platform", "subscription"],
  agency: ["agency", "creative", "studio", "client"],
  portfolio: ["portfolio", "work", "showcase", "creator"],
  ecommerce: ["shop", "product", "store", "commerce", "retail"],
  dashboard: ["dashboard", "admin", "analytics", "ops"],
  blog: ["blog", "editorial", "content", "articles"],
  fintech: ["fintech", "finance", "bank", "payments", "security", "trust"],
};

function uniquePages(pages: PageType[]) {
  return Array.from(new Set(pages));
}

export function buildSuggestedPages(siteType: SiteType, pageCount: number): PageType[] {
  const defaults = DEFAULT_PAGE_MAP[siteType];
  if (pageCount <= defaults.length) return defaults.slice(0, pageCount);

  const extras: PageType[] = ["about", "blog", "docs", "login", "contact"];
  return uniquePages([...defaults, ...extras]).slice(0, pageCount);
}

export function normalizeBrief(brief: ProjectBrief): ProjectBrief {
  const safePageCount = Math.max(1, Math.min(10, brief.pageCount));
  const pages =
    brief.requiredPages.length > 0
      ? uniquePages(brief.requiredPages).slice(0, safePageCount)
      : buildSuggestedPages(brief.siteType, safePageCount);

  return {
    ...brief,
    pageCount: safePageCount,
    requiredPages: pages,
  };
}

export function buildPagePlans(brief: ProjectBrief): PagePlan[] {
  return brief.requiredPages.map((page) => ({
    page,
    sections: PAGE_SECTION_MAP[page] ?? ["Hero", "Content", "CTA"],
    recommendedCategories: PAGE_CATEGORY_MAP[page] ?? ["cta", "features"],
  }));
}

function buildReason(
  locale: Locale,
  libraryName: string,
  page: PageType,
  section: string,
  matchedSiteType: boolean,
) {
  if (locale === "tr") {
    const siteTypeLine = matchedSiteType
      ? "site tipi ile dogrudan eslesiyor"
      : "secili sayfa ihtiyacini guclendiriyor";
    return `${libraryName}, ${page} sayfasindaki ${section} bolumu icin uygun; ${siteTypeLine}.`;
  }

  const siteTypeLine = matchedSiteType
    ? "it matches the site type directly"
    : "it strengthens the current page need";
  return `${libraryName} fits the ${section} section on the ${page} page because ${siteTypeLine}.`;
}

function scoreRegistryItem(
  item: RegistryItem,
  brief: ProjectBrief,
  pack: StylePack,
  pagePlans: PagePlan[],
): { score: number; page: PageType; section: string } {
  const briefText = `${brief.brandBrief} ${brief.audience}`.toLocaleLowerCase("tr-TR");
  let score = 0;
  let bestPage: PageType = pagePlans[0]?.page ?? "home";
  let bestSection = pagePlans[0]?.sections[0] ?? "Hero";

  if (item.industryFit.includes(brief.siteType)) score += 5;
  if (item.stylePackFit.includes(pack.visual) || item.stylePackFit.includes(pack.layout)) {
    score += 3;
  }
  if (item.stylePackFit.includes(pack.typography) || item.stylePackFit.includes(pack.mood)) {
    score += 2;
  }
  if (item.tags.some((tag) => briefText.includes(tag.toLocaleLowerCase("tr-TR")))) {
    score += 3;
  }

  for (const pagePlan of pagePlans) {
    const categoryMatch = pagePlan.recommendedCategories.includes(item.category) ? 4 : 0;
    const pageMatch = item.pageTypeFit.includes(pagePlan.page) ? 3 : 0;
    const total = categoryMatch + pageMatch;
    if (total > 0 && total >= score - 4) {
      bestPage = pagePlan.page;
      bestSection = pagePlan.sections[0] ?? "Hero";
      score += total;
      break;
    }
  }

  if (item.accessibilityLevel === "strong" && brief.frameworkPreference === "accessibility") {
    score += 3;
  }
  if (item.source === "Magic UI" && brief.frameworkPreference === "animation") {
    score += 2;
  }

  return { score, page: bestPage, section: bestSection };
}

export function recommendComponents(
  brief: ProjectBrief,
  pack: StylePack,
  locale: Locale,
): ComponentRecommendation[] {
  const pagePlans = buildPagePlans(brief);
  const depthLimit = {
    starter: 4,
    balanced: 6,
    deep: 8,
  }[brief.componentDepthPreference];

  return REGISTRY_ITEMS.map((item) => {
    const scored = scoreRegistryItem(item, brief, pack, pagePlans);
    return {
      item,
      reason: buildReason(
        locale,
        item.libraryName,
        scored.page,
        scored.section,
        item.industryFit.includes(brief.siteType),
      ),
      recommendedForPage: scored.page,
      recommendedForSection: scored.section,
      score: scored.score,
    };
  })
    .filter((entry) => entry.score > 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, depthLimit);
}

export function recommendFrameworkLibraries(
  brief: ProjectBrief,
  pack: StylePack,
  componentRecommendations: ComponentRecommendation[],
  locale: Locale,
): FrameworkRecommendation[] {
  const briefText = `${brief.brandBrief} ${brief.audience}`.toLocaleLowerCase("tr-TR");

  return FRAMEWORK_LIBRARY_CATALOG.map((library) => {
    let score = 0;

    if (library.bestFor.includes(brief.siteType)) score += 4;
    if (library.tags.some((tag) => briefText.includes(tag.toLocaleLowerCase("tr-TR")))) {
      score += 2;
    }
    if (brief.frameworkPreference === "nextjs" && library.name.includes("Next.js")) score += 4;
    if (brief.frameworkPreference === "accessibility" && library.tags.includes("accessibility")) {
      score += 4;
    }
    if (brief.frameworkPreference === "headless" && library.type === "headless-component") {
      score += 4;
    }
    if (brief.frameworkPreference === "animation" && library.type === "animation") {
      score += 4;
    }
    if (pack.motion.includes("Micro") && library.name === "Magic UI") score += 1;
    if (
      componentRecommendations.some((item) =>
        library.pairings.includes(item.item.libraryName) || item.item.libraryName.includes(library.name),
      )
    ) {
      score += 2;
    }

    const reason =
      locale === "tr"
        ? `${library.name}, ${brief.siteType} deneyimi ve secili komponentler ile uyumlu calisir.`
        : `${library.name} aligns with the ${brief.siteType} experience and the selected components.`;

    return {
      id: library.id,
      name: library.name,
      type: library.type,
      bestFor: library.bestFor,
      pairings: library.pairings,
      constraints: library.constraints,
      reason,
      url: library.url,
      score,
    };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ score: _score, ...library }) => library);
}

function buildEnhancedPrompt(
  brief: ProjectBrief,
  pack: StylePack,
  locale: Locale,
  preset: PromptPreset,
  pagePlans: PagePlan[],
  componentRecommendations: ComponentRecommendation[],
  frameworkRecommendations: FrameworkRecommendation[],
) {
  const base = buildPromptByPreset(pack, preset, brief.brandBrief, locale);
  const pageLines = pagePlans
    .map((pagePlan) => `- ${pagePlan.page}: ${pagePlan.sections.join(", ")}`)
    .join("\n");
  const componentLines = componentRecommendations
    .map(
      (entry) =>
        `- ${entry.item.libraryName} / ${entry.item.componentName} -> ${entry.recommendedForPage} / ${entry.recommendedForSection}`,
    )
    .join("\n");
  const frameworkLines = frameworkRecommendations
    .map((framework) => `- ${framework.name} (${framework.type})`)
    .join("\n");

  if (locale === "tr") {
    return `${base}

Proje brifi:
- Site tipi: ${brief.siteType}
- Hedef kitle: ${brief.audience || "Belirtilmedi"}
- Sayfa sayisi: ${brief.pageCount}
- Gerekli sayfalar: ${brief.requiredPages.join(", ")}
- Framework tercihi: ${brief.frameworkPreference}

Sayfa plani:
${pageLines}

Onerilen ucretsiz bilesen kaynaklari:
${componentLines || "- Henuz onerilen bilesen yok"}

Onerilen framework / React katmani:
${frameworkLines || "- Henuz onerilen framework yok"}`;
  }

  return `${base}

Project brief:
- Site type: ${brief.siteType}
- Audience: ${brief.audience || "Not provided"}
- Page count: ${brief.pageCount}
- Required pages: ${brief.requiredPages.join(", ")}
- Framework preference: ${brief.frameworkPreference}

Page plan:
${pageLines}

Recommended free component sources:
${componentLines || "- No component recommendations yet"}

Recommended framework / React layer:
${frameworkLines || "- No framework recommendations yet"}`;
}

function buildIdeaBoardFromBlueprint(
  brief: ProjectBrief,
  pack: StylePack,
  locale: Locale,
  componentRecommendations: ComponentRecommendation[],
): IdeaBoard {
  const baseBoard = buildIdeaBoard(pack, locale);
  const pageBoard = buildPagePlans(brief);

  return {
    moodboard: [
      ...baseBoard.moodboard,
      {
        title:
          locale === "tr"
            ? `${brief.siteType} Kullanici Beklentisi`
            : `${brief.siteType} User Expectation`,
        cue:
          locale === "tr"
            ? `${brief.audience || "Genel kitle"} icin guven, hiz ve netlik dengesini kur.`
            : `Balance trust, speed, and clarity for ${brief.audience || "a broad audience"}.`,
      },
    ].slice(0, 4),
    wireframe: pageBoard.slice(0, 4).map((pagePlan) => ({
      section: pagePlan.page,
      blocks: [
        pagePlan.sections[0] ?? "Hero",
        componentRecommendations.find((entry) => entry.recommendedForPage === pagePlan.page)?.item
          .componentName ?? (locale === "tr" ? "Onerilen bilesen" : "Recommended component"),
        pagePlan.sections[pagePlan.sections.length - 1] ??
          (locale === "tr" ? "Kapanis CTA" : "Closing CTA"),
      ],
    })),
    artDirection: [
      ...baseBoard.artDirection,
      locale === "tr"
        ? `Ucretsiz component ekseni: ${
            componentRecommendations[0]?.item.libraryName ?? "Elle secilecek"
          }`
        : `Free component axis: ${componentRecommendations[0]?.item.libraryName ?? "Manual choice"}`,
    ].slice(0, 4),
  };
}

export function buildBlueprintOutput(
  briefInput: ProjectBrief,
  pack: StylePack,
  preset: PromptPreset,
  locale: Locale,
): BlueprintOutput {
  const brief = normalizeBrief(briefInput);
  const pagePlans = buildPagePlans(brief);
  const componentRecommendations = recommendComponents(brief, pack, locale);
  const frameworkRecommendations = recommendFrameworkLibraries(
    brief,
    pack,
    componentRecommendations,
    locale,
  );
  const designDirections = recommendBrandDirections(brief.brandBrief, 5);
  const concept = buildConcept(pack, locale);
  const ideaBoard = buildIdeaBoardFromBlueprint(
    brief,
    pack,
    locale,
    componentRecommendations,
  );

  return {
    prompt: buildEnhancedPrompt(
      brief,
      pack,
      locale,
      preset,
      pagePlans,
      componentRecommendations,
      frameworkRecommendations,
    ),
    designDirections,
    pagePlans,
    componentRecommendations,
    frameworkRecommendations,
    ideaBoard,
    concept,
  };
}

export function searchCatalog(
  query: string,
  siteType?: SiteType,
  category?: RegistryCategory,
) {
  const normalized = query.trim().toLocaleLowerCase("tr-TR");

  return REGISTRY_ITEMS.filter((item) => {
    if (siteType && !item.industryFit.includes(siteType)) return false;
    if (category && item.category !== category) return false;
    if (!normalized) return true;

    const haystack = [
      item.libraryName,
      item.componentName,
      item.category,
      item.tags.join(" "),
      item.useCases.join(" "),
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR");

    return haystack.includes(normalized);
  });
}
