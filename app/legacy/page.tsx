"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { InstallPwaButton } from "@/components/install-pwa-button";
import {
  BlueprintGenerationMeta,
  BlueprintOutput,
  ProjectBrief,
  buildBlueprintOutput,
  buildSuggestedPages,
} from "@/lib/blueprint";
import {
  ComponentDepthPreference,
  FrameworkPreference,
  PAGE_TYPE_OPTIONS,
  PageType,
  SITE_TYPE_OPTIONS,
  SiteType,
} from "@/lib/catalog";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_QUERY_KEY,
  LOCALE_STORAGE_KEY,
  Locale,
  UI_TEXT,
  interpolate,
  localeTag,
} from "@/lib/i18n";
import {
  BrandDirection,
  OPTIONS,
  PILLARS,
  PROMPT_PRESETS,
  Pillar,
  PromptPreset,
  StylePack,
  generatePack,
  getPackValue,
  setPackValue,
} from "@/lib/style-engine";

type SavedPack = {
  id: string;
  createdAt: string;
  pack: StylePack;
};

type HistoryItem = {
  id: string;
  createdAt: string;
  pack: StylePack;
};

const FAVORITES_KEY = "style-engine-favorites-v1";
const HISTORY_KEY = "style-engine-history-v1";
const MAX_FAVORITES = 12;
const MAX_HISTORY = 20;
const BLUEPRINT_CLIENT_TIMEOUT_MS_DEFAULT = 15000;
const BLUEPRINT_CLIENT_TIMEOUT_MS_INPUT = Number.parseInt(
  process.env.NEXT_PUBLIC_BLUEPRINT_TIMEOUT_MS || "",
  10,
);
const BLUEPRINT_CLIENT_TIMEOUT_MS =
  Number.isFinite(BLUEPRINT_CLIENT_TIMEOUT_MS_INPUT) &&
  BLUEPRINT_CLIENT_TIMEOUT_MS_INPUT >= 3000 &&
  BLUEPRINT_CLIENT_TIMEOUT_MS_INPUT <= 120000
    ? BLUEPRINT_CLIENT_TIMEOUT_MS_INPUT
    : BLUEPRINT_CLIENT_TIMEOUT_MS_DEFAULT;
const STYLE_ENGINE_DEBUG = process.env.NEXT_PUBLIC_STYLE_DEBUG === "1";
const INITIAL_PACK: StylePack = {
  layout: OPTIONS.Layout[0],
  visual: OPTIONS.Visual[0],
  typography: OPTIONS.Typography[0],
  mood: OPTIONS.Mood[0],
  motion: OPTIONS.Motion[0],
};

function debugLog(event: string, payload: Record<string, unknown>) {
  if (!STYLE_ENGINE_DEBUG) return;
  console.info(`[style-engine:${event}]`, payload);
}

function getStorageSafe(): Storage | null {
  if (typeof globalThis === "undefined") return null;
  const storage = (globalThis as { localStorage?: Storage }).localStorage;
  if (!storage) return null;
  if (typeof storage.getItem !== "function") return null;
  if (typeof storage.setItem !== "function") return null;
  return storage;
}

function readList<T>(key: string): T[] {
  const storage = getStorageSafe();
  if (!storage) return [];
  try {
    const raw = storage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readListWithGuard<T>(key: string, guard: (value: unknown) => value is T): T[] {
  const list = readList<unknown>(key);
  return list.filter(guard);
}

function writeList<T>(key: string, value: T[]) {
  const storage = getStorageSafe();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

function isStylePack(value: unknown): value is StylePack {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.layout === "string" &&
    typeof candidate.visual === "string" &&
    typeof candidate.typography === "string" &&
    typeof candidate.mood === "string" &&
    typeof candidate.motion === "string"
  );
}

function isSavedPack(value: unknown): value is SavedPack {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    isStylePack(candidate.pack)
  );
}

function isHistoryItem(value: unknown): value is HistoryItem {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    isStylePack(candidate.pack)
  );
}

function encodePack(pack: StylePack) {
  const json = JSON.stringify(pack);
  const binary = encodeURIComponent(json).replace(
    /%([0-9A-F]{2})/g,
    (_, hex: string) => String.fromCharCode(parseInt(hex, 16)),
  );
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodePack(token: string): StylePack | null {
  try {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
    const binary = window.atob(padded);
    const percentEncoded = Array.from(binary)
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("");
    const parsed = JSON.parse(decodeURIComponent(percentEncoded)) as unknown;
    return isStylePack(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function packSignature(pack: StylePack) {
  return JSON.stringify(pack);
}

function pageSignature(pages: PageType[]) {
  return pages.join("|");
}

function buildBrief(input: {
  siteType: SiteType;
  brandBrief: string;
  audience: string;
  pageCount: number;
  requiredPages: PageType[];
  frameworkPreference: FrameworkPreference;
  componentDepthPreference: ComponentDepthPreference;
}): ProjectBrief {
  return {
    siteType: input.siteType,
    brandBrief: input.brandBrief,
    audience: input.audience,
    pageCount: input.pageCount,
    requiredPages: input.requiredPages,
    frameworkPreference: input.frameworkPreference,
    componentDepthPreference: input.componentDepthPreference,
  };
}

function getGenerationStatusText(
  locale: Locale,
  generationMeta?: BlueprintGenerationMeta,
) {
  if (!generationMeta) return "";

  const latency = `${generationMeta.latencyMs}ms`;

  if (generationMeta.source === "ai") {
    if (locale === "tr") {
      return `AI üretimi aktif (${generationMeta.model ?? "model"} · ${latency})`;
    }
    return `AI generation active (${generationMeta.model ?? "model"} · ${latency})`;
  }

  if (generationMeta.warning) {
    return generationMeta.warning;
  }

  return locale === "tr"
    ? "Yerel üretim kullanıldı."
    : "Local generation was used.";
}

function getGenerationErrorText(
  locale: Locale,
  fallbackText: string,
  error: unknown,
) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return locale === "tr"
      ? "İstek zaman aşımına uğradı. Tekrar deneyin."
      : "Request timed out. Please try again.";
  }

  if (error instanceof Error && error.message.startsWith("HTTP")) {
    return locale === "tr"
      ? `Sunucu hatası alındı (${error.message}).`
      : `Server returned an error (${error.message}).`;
  }

  return fallbackText;
}

function Pill({
  label,
  value,
  pillar,
  options,
  isLocked,
  onToggle,
  onSelect,
  lockText,
  lockedText,
  manualSelectText,
}: {
  label: string;
  value: string;
  pillar: Pillar;
  options: string[];
  isLocked: boolean;
  onToggle: (pillar: Pillar) => void;
  onSelect: (pillar: Pillar, value: string) => void;
  lockText: string;
  lockedText: string;
  manualSelectText: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-4 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
        <button
          onClick={() => onToggle(pillar)}
          className={`choice-chip rounded-full px-3 py-1 text-sm font-semibold transition ${
            isLocked
              ? "bg-accent text-surface"
              : "bg-surface text-text hover:border hover:border-edge"
          }`}
        >
          {isLocked ? lockedText : lockText}
        </button>
      </div>
      <p className="mt-2 text-lg font-semibold leading-snug">{value}</p>
      <label className="mt-4 block text-sm uppercase tracking-[0.14em] text-muted">
        {manualSelectText}
      </label>
      <select
        value={value}
        onChange={(event) => onSelect(pillar, event.target.value)}
        className="mt-2 w-full rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-text outline-none transition focus:border-accent"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface text-text">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionCard({
  id,
  title,
  hint,
  children,
}: {
  id?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="glass-panel rounded-3xl p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function StyleEnginePage() {
  const [locked, setLocked] = useState<Partial<Record<Pillar, boolean>>>({
    Layout: false,
    Visual: false,
    Typography: false,
    Mood: false,
    Motion: false,
  });
  const [pack, setPack] = useState<StylePack>(INITIAL_PACK);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [promptPreset, setPromptPreset] = useState<PromptPreset>("GPT");
  const [brandBrief, setBrandBrief] = useState("");
  const [audience, setAudience] = useState("");
  const [siteType, setSiteType] = useState<SiteType>("marketing");
  const [pageCount, setPageCount] = useState(5);
  const [requiredPages, setRequiredPages] = useState<PageType[]>(() =>
    buildSuggestedPages("marketing", 5),
  );
  const [frameworkPreference, setFrameworkPreference] =
    useState<FrameworkPreference>("auto");
  const [componentDepthPreference, setComponentDepthPreference] =
    useState<ComponentDepthPreference>("balanced");
  const [brandDirections, setBrandDirections] = useState<BrandDirection[]>([]);
  const [generatedBlueprint, setGeneratedBlueprint] =
    useState<BlueprintOutput | null>(null);
  const [favorites, setFavorites] = useState<SavedPack[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [message, setMessage] = useState("");
  const [generationError, setGenerationError] = useState("");
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const hasLoadedPackFromUrl = useRef(false);
  const text = UI_TEXT[locale];

  const brief = useMemo(
    () =>
      buildBrief({
        siteType,
        brandBrief,
        audience,
        pageCount,
        requiredPages,
        frameworkPreference,
        componentDepthPreference,
      }),
    [
      audience,
      brandBrief,
      componentDepthPreference,
      frameworkPreference,
      pageCount,
      requiredPages,
      siteType,
    ],
  );

  const localBlueprint = useMemo(
    () => buildBlueprintOutput(brief, pack, promptPreset, locale),
    [brief, locale, pack, promptPreset],
  );

  const displayedBlueprint = generatedBlueprint ?? localBlueprint;
  const generationStatusText = useMemo(
    () => getGenerationStatusText(locale, generatedBlueprint?.generationMeta),
    [generatedBlueprint?.generationMeta, locale],
  );
  const prompt = displayedBlueprint.prompt;
  const concept = displayedBlueprint.concept;
  const ideaBoard = displayedBlueprint.ideaBoard;
  const pagePlans = displayedBlueprint.pagePlans;
  const componentRecommendations = displayedBlueprint.componentRecommendations;
  const frameworkRecommendations = displayedBlueprint.frameworkRecommendations;

  const pageMatches = useMemo(
    () =>
      Object.fromEntries(
        pagePlans.map((pagePlan) => [
          pagePlan.page,
          componentRecommendations.filter(
            (recommendation) => recommendation.recommendedForPage === pagePlan.page,
          ),
        ]),
      ) as Record<PageType, typeof componentRecommendations>,
    [componentRecommendations, pagePlans],
  );

  const trackHistory = useCallback((nextPack: StylePack) => {
    setHistory((prev) => {
      const nextSignature = packSignature(nextPack);
      const deduped = prev.filter((entry) => packSignature(entry.pack) !== nextSignature);
      const next: HistoryItem[] = [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
          pack: nextPack,
        },
        ...deduped,
      ].slice(0, MAX_HISTORY);
      writeList(HISTORY_KEY, next);
      return next;
    });
  }, []);

  const applyPack = useCallback(
    (nextPack: StylePack, notice: string) => {
      setPack(nextPack);
      trackHistory(nextPack);
      setMessage(notice);
    },
    [trackHistory],
  );

  useEffect(() => {
    const storage = getStorageSafe();
    const url = new URL(window.location.href);
    const urlLocale = url.searchParams.get(LOCALE_QUERY_KEY);

    if (urlLocale && LOCALES.includes(urlLocale as Locale)) {
      setLocale(urlLocale as Locale);
    } else if (storage) {
      const storedLocale = storage.getItem(LOCALE_STORAGE_KEY);
      if (storedLocale && LOCALES.includes(storedLocale as Locale)) {
        setLocale(storedLocale as Locale);
      }
    }
  }, []);

  useEffect(() => {
    const storage = getStorageSafe();
    if (storage) {
      storage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  useEffect(() => {
    setFavorites(readListWithGuard(FAVORITES_KEY, isSavedPack));
    setHistory(readListWithGuard(HISTORY_KEY, isHistoryItem));
  }, []);

  useEffect(() => {
    if (hasLoadedPackFromUrl.current) return;
    hasLoadedPackFromUrl.current = true;

    const url = new URL(window.location.href);
    const token = url.searchParams.get("pack");
    if (token) {
      const decoded = decodePack(token);
      if (decoded) {
        setPack(decoded);
        trackHistory(decoded);
        setMessage(text.packLoadedFromUrl);
      }
    }
    setUrlReady(true);
  }, [text.packLoadedFromUrl, trackHistory]);

  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    url.searchParams.set("pack", encodePack(pack));
    url.searchParams.set(LOCALE_QUERY_KEY, locale);
    window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
  }, [locale, pack, urlReady]);

  useEffect(() => {
    const suggested = buildSuggestedPages(siteType, pageCount);
    setRequiredPages((prev) => {
      const preserved = prev.filter((page) => suggested.includes(page));
      const next = Array.from(new Set([...preserved, ...suggested])).slice(0, pageCount);
      return pageSignature(prev) === pageSignature(next) ? prev : next;
    });
  }, [pageCount, siteType]);

  useEffect(() => {
    setGeneratedBlueprint(null);
    setGenerationError("");
  }, [
    audience,
    brandBrief,
    componentDepthPreference,
    frameworkPreference,
    locale,
    pack,
    pageCount,
    promptPreset,
    requiredPages,
    siteType,
  ]);

  const toggleLock = (pillar: Pillar) => {
    setLocked((prev) => ({ ...prev, [pillar]: !prev[pillar] }));
  };

  const randomize = () => {
    const next = generatePack(locked, pack);
    applyPack(next, text.generatedPack);
  };

  const updatePillarManually = (pillar: Pillar, value: string) => {
    setPack((prev) => setPackValue(prev, pillar, value));
    setMessage(
      interpolate(text.manualUpdatedTemplate, {
        pillar: text.pillarLabels[pillar],
      }),
    );
  };

  const generateFromManualSelection = () => {
    trackHistory(pack);
    setMessage(text.builtFromSelection);
  };

  const createBrandDirections = () => {
    setBrandDirections(displayedBlueprint.designDirections);
    setMessage(text.generatedBrandDirections);
  };

  const generateBlueprint = async () => {
    setIsGeneratingBlueprint(true);
    setGenerationError("");
    setMessage(text.generatingBlueprint);
    const startedAt = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), BLUEPRINT_CLIENT_TIMEOUT_MS);

    try {
      debugLog("blueprint.request.start", {
        locale,
        preset: promptPreset,
        timeoutMs: BLUEPRINT_CLIENT_TIMEOUT_MS,
      });

      const response = await fetch("/api/blueprint/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          brief,
          pack,
          locale,
          preset: promptPreset,
        }),
      });

      const requestId = response.headers.get("x-blueprint-request-id");
      const responseSource = response.headers.get("x-blueprint-source");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}${requestId ? ` / ${requestId}` : ""}`);
      }

      const blueprint = (await response.json()) as BlueprintOutput;
      setGeneratedBlueprint(blueprint);
      setBrandDirections(blueprint.designDirections);
      setMessage(getGenerationStatusText(locale, blueprint.generationMeta));
      debugLog("blueprint.request.success", {
        requestId,
        responseSource,
        generationSource: blueprint.generationMeta?.source ?? "unknown",
        model: blueprint.generationMeta?.model ?? null,
        latencyMs: Math.round(performance.now() - startedAt),
      });
    } catch (error) {
      debugLog("blueprint.request.error", {
        message: error instanceof Error ? error.message : "Unknown error",
        latencyMs: Math.round(performance.now() - startedAt),
      });
      setGenerationError(getGenerationErrorText(locale, text.generationError, error));
    } finally {
      clearTimeout(timeout);
      setIsGeneratingBlueprint(false);
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setMessage(text.copiedPrompt);
    } catch {
      setMessage(text.clipboardBlocked);
    }
  };

  const copyShareLink = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("pack", encodePack(pack));
      url.searchParams.set(LOCALE_QUERY_KEY, locale);
      await navigator.clipboard.writeText(url.toString());
      setMessage(text.copiedShareLink);
    } catch {
      setMessage(text.copiedShareLinkError);
    }
  };

  const unlockAll = () => {
    setLocked({
      Layout: false,
      Visual: false,
      Typography: false,
      Mood: false,
      Motion: false,
    });
    setMessage(text.unlockedAll);
  };

  const saveFavorite = () => {
    setFavorites((prev) => {
      const signature = packSignature(pack);
      const deduped = prev.filter((favorite) => packSignature(favorite.pack) !== signature);
      const next: SavedPack[] = [
        {
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          pack,
        },
        ...deduped,
      ].slice(0, MAX_FAVORITES);
      writeList(FAVORITES_KEY, next);
      return next;
    });
    setMessage(text.savedPack);
  };

  const loadFavorite = (favorite: SavedPack) => {
    applyPack(favorite.pack, text.loadedFavorite);
  };

  const loadFromHistory = (entry: HistoryItem) => {
    applyPack(entry.pack, text.loadedHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    writeList(HISTORY_KEY, []);
    setMessage(text.clearedHistory);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((favorite) => favorite.id !== id);
      writeList(FAVORITES_KEY, next);
      return next;
    });
    setMessage(text.removedFavorite);
  };

  const toggleRequiredPage = (page: PageType) => {
    setRequiredPages((prev) => {
      const exists = prev.includes(page);
      if (exists) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== page);
      }
      if (prev.length >= pageCount) return prev;
      return [...prev, page];
    });
  };

  const moduleLinks = [
    { id: "legacy-style-pack", label: text.title },
    { id: "legacy-brief", label: text.brandBriefTitle },
    { id: "legacy-prompt", label: text.aiPromptTitle },
    { id: "legacy-page-structure", label: text.pageStructureTitle },
    { id: "legacy-concept", label: text.conceptBlueprintTitle },
    { id: "legacy-idea-board", label: text.ideaBoardTitle },
    { id: "legacy-components", label: text.freeComponentsTitle },
    { id: "legacy-frameworks", label: text.frameworksTitle },
    { id: "legacy-page-match", label: text.pageMatchTitle },
    { id: "legacy-favorites", label: text.favoritesTitle },
    { id: "legacy-history", label: text.historyTitle },
  ] as const;

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="glass-panel rounded-3xl p-4 shadow-panel xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] xl:overflow-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Command Center
            </p>
            <h2 className="mt-2 text-xl font-bold">Legacy Workspace</h2>
            <p className="mt-1 text-sm text-muted">
              Classic style flow preserved with command navigation.
            </p>

            <div className="mt-4 grid gap-2 text-xs">
              <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
                packs: {history.length}
              </span>
              <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
                favorites: {favorites.length}
              </span>
              <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
                pages: {pagePlans.length}
              </span>
            </div>

            <nav className="mt-4 grid gap-2">
              {moduleLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="choice-chip rounded-xl border border-edge bg-surface px-3 py-2 text-sm font-semibold text-muted"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/"
                className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 text-xs font-semibold"
              >
                New Workspace
              </a>
              <a
                href="/admin/catalog"
                className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 text-xs font-semibold"
              >
                Catalog Admin
              </a>
            </div>
          </aside>

          <div>
        <section id="legacy-style-pack" className="glass-panel rounded-3xl p-6 shadow-panel backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{text.title}</h1>
              <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
                {text.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm uppercase tracking-[0.18em] text-muted">
                {text.languageLabel}
              </label>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-text outline-none transition focus:border-accent"
              >
                {LOCALES.map((value) => (
                  <option key={value} value={value}>
                    {UI_TEXT[value].localeShortLabel}
                  </option>
                ))}
              </select>
              <InstallPwaButton label={text.installApp} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Pill
              label={text.layoutLabel}
              value={pack.layout}
              pillar="Layout"
              options={OPTIONS.Layout}
              isLocked={Boolean(locked.Layout)}
              onToggle={toggleLock}
              onSelect={updatePillarManually}
              lockText={text.lock}
              lockedText={text.locked}
              manualSelectText={text.manualSelect}
            />
            <Pill
              label={text.visualLabel}
              value={pack.visual}
              pillar="Visual"
              options={OPTIONS.Visual}
              isLocked={Boolean(locked.Visual)}
              onToggle={toggleLock}
              onSelect={updatePillarManually}
              lockText={text.lock}
              lockedText={text.locked}
              manualSelectText={text.manualSelect}
            />
            <Pill
              label={text.typographyLabel}
              value={pack.typography}
              pillar="Typography"
              options={OPTIONS.Typography}
              isLocked={Boolean(locked.Typography)}
              onToggle={toggleLock}
              onSelect={updatePillarManually}
              lockText={text.lock}
              lockedText={text.locked}
              manualSelectText={text.manualSelect}
            />
            <Pill
              label={text.moodLabel}
              value={pack.mood}
              pillar="Mood"
              options={OPTIONS.Mood}
              isLocked={Boolean(locked.Mood)}
              onToggle={toggleLock}
              onSelect={updatePillarManually}
              lockText={text.lock}
              lockedText={text.locked}
              manualSelectText={text.manualSelect}
            />
            <Pill
              label={text.motionLabel}
              value={pack.motion}
              pillar="Motion"
              options={OPTIONS.Motion}
              isLocked={Boolean(locked.Motion)}
              onToggle={toggleLock}
              onSelect={updatePillarManually}
              lockText={text.lock}
              lockedText={text.locked}
              manualSelectText={text.manualSelect}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={randomize}
              className="choice-chip rounded-xl border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-surface transition hover:brightness-105"
            >
              {text.randomize}
            </button>
            <button
              onClick={generateFromManualSelection}
              className="choice-chip rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.buildFromSelection}
            </button>
            <button
              onClick={copyPrompt}
              className="choice-chip rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.copyPrompt}
            </button>
            <button
              onClick={copyShareLink}
              className="choice-chip rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.copyShareLink}
            </button>
            <button
              onClick={saveFavorite}
              className="choice-chip rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.saveFavorite}
            </button>
            <button
              onClick={unlockAll}
              className="choice-chip rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.unlockAll}
            </button>
          </div>

          {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard id="legacy-brief" title={text.brandBriefTitle}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.siteTypeLabel}
                </label>
                <select
                  value={siteType}
                  onChange={(event) => setSiteType(event.target.value as SiteType)}
                  className="mt-2 w-full rounded-xl glass-surface px-3 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  {SITE_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {text.siteTypeLabels[option]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.pageCountLabel}
                </label>
                <select
                  value={pageCount}
                  onChange={(event) => setPageCount(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl glass-surface px-3 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  {[3, 4, 5, 6, 7, 8].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.audienceLabel}
                </label>
                <input
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  placeholder={text.audiencePlaceholder}
                  className="mt-2 w-full rounded-xl glass-surface px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-accent"
                />
              </div>

              <div>
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.frameworkPreferenceLabel}
                </label>
                <select
                  value={frameworkPreference}
                  onChange={(event) =>
                    setFrameworkPreference(event.target.value as FrameworkPreference)
                  }
                  className="mt-2 w-full rounded-xl glass-surface px-3 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  {(
                    Object.keys(text.frameworkPreferenceLabels) as FrameworkPreference[]
                  ).map((option) => (
                    <option key={option} value={option}>
                      {text.frameworkPreferenceLabels[option]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.componentDepthLabel}
                </label>
                <select
                  value={componentDepthPreference}
                  onChange={(event) =>
                    setComponentDepthPreference(
                      event.target.value as ComponentDepthPreference,
                    )
                  }
                  className="mt-2 w-full rounded-xl glass-surface px-3 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  {(
                    Object.keys(text.componentDepthLabels) as ComponentDepthPreference[]
                  ).map((option) => (
                    <option key={option} value={option}>
                      {text.componentDepthLabels[option]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm uppercase tracking-[0.18em] text-muted">
                  {text.requiredPagesLabel}
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PAGE_TYPE_OPTIONS.map((page) => {
                    const isSelected = requiredPages.includes(page);
                    const isDisabled = !isSelected && requiredPages.length >= pageCount;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => toggleRequiredPage(page)}
                        disabled={isDisabled}
                        className={`choice-chip rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                          isSelected
                            ? "border-accent bg-accent text-surface"
                            : "border-edge bg-surface text-text hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
                        }`}
                      >
                        {text.pageTypeLabels[page]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted">{text.brandBriefDescription}</p>
            <textarea
              value={brandBrief}
              onChange={(event) => setBrandBrief(event.target.value)}
              placeholder={text.brandBriefPlaceholder}
              className="mt-3 min-h-36 w-full rounded-xl glass-surface p-4 text-sm text-text outline-none transition placeholder:text-muted focus:border-accent"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={createBrandDirections}
                className="choice-chip rounded-xl border border-edge bg-panel px-4 py-2 text-sm font-semibold transition hover:border-accent"
              >
                {text.brandBriefAction}
              </button>
              <button
                onClick={generateBlueprint}
                disabled={isGeneratingBlueprint}
                className="choice-chip rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGeneratingBlueprint ? text.generatingBlueprint : text.blueprintAction}
              </button>
            </div>

            {generationError ? (
              <p className="mt-3 text-sm text-red-300">{generationError}</p>
            ) : null}
            {generationStatusText ? (
              <p className="mt-2 text-sm text-muted">{generationStatusText}</p>
            ) : null}

            {brandDirections.length > 0 ? (
              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {brandDirections.map((direction) => (
                  <article
                    key={direction.id}
                    className="rounded-xl glass-surface p-5 shadow-panel"
                  >
                    <h3 className="text-base font-semibold text-text">{direction.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text">{direction.summary}</p>
                    <p className="mt-3 text-sm text-muted">
                      {text.layoutLabel}: {direction.pack.layout} | {text.visualLabel}:{" "}
                      {direction.pack.visual}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {text.typographyLabel}: {direction.pack.typography} | {text.moodLabel}:{" "}
                      {direction.pack.mood}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {text.motionLabel}: {direction.pack.motion}
                    </p>
                    <button
                      onClick={() =>
                        applyPack(
                          direction.pack,
                          interpolate(text.directionAppliedTemplate, {
                            name: direction.name,
                          }),
                        )
                      }
                      className="mt-4 rounded-lg border border-edge bg-surface px-3 py-2 text-sm font-semibold text-text transition hover:border-accent"
                    >
                      {text.applyDirection}
                    </button>
                  </article>
                ))}
              </div>
            ) : null}
          </SectionCard>

          <SectionCard id="legacy-prompt" title={text.aiPromptTitle} hint={text.aiPromptHint}>
            <div className="flex flex-wrap gap-2">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPromptPreset(preset)}
                  className={`choice-chip rounded-full border px-3 py-1 text-sm font-semibold transition ${
                    promptPreset === preset
                      ? "border-accent bg-accent text-surface"
                      : "border-edge bg-panel text-text hover:border-accent"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl glass-surface p-4 text-sm leading-relaxed text-text">
              {prompt}
            </pre>
          </SectionCard>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <SectionCard id="legacy-page-structure" title={text.pageStructureTitle} hint={text.pageStructureHint}>
            <div className="grid gap-4">
              {pagePlans.map((pagePlan) => (
                <article
                  key={pagePlan.page}
                  className="rounded-xl glass-surface p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">{text.pageTypeLabels[pagePlan.page]}</h3>
                    <span className="text-sm text-muted">
                      {pagePlan.recommendedCategories.join(" / ")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-muted">
                    {text.sectionsLabel}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pagePlan.sections.map((section) => (
                      <span
                        key={section}
                        className="rounded-full border border-edge bg-panel px-3 py-1 text-sm text-muted"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="legacy-concept" title={text.conceptBlueprintTitle}>
            <div className="grid gap-4 text-sm">
              <div className="rounded-xl glass-surface p-4">
                <h3 className="font-semibold">{text.homepageSections}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.sections.map((section) => (
                    <li key={section}>- {section}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h3 className="font-semibold">{text.signatureComponents}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.components.map((component) => (
                    <li key={component}>- {component}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4 text-muted">
                <p>
                  <span className="font-semibold text-text">{text.colorDirection}:</span>{" "}
                  {concept.colorDirection}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-text">{text.typeScale}:</span>{" "}
                  {concept.typeScale}
                </p>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h3 className="font-semibold">{text.motionNotes}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.motionNotes.map((note) => (
                    <li key={note}>- {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>
        </section>

        <SectionCard id="legacy-idea-board" title={text.ideaBoardTitle} hint={text.ideaBoardHint}>
          <div className="grid gap-4 lg:grid-cols-3">
            {ideaBoard.moodboard.map((card) => (
              <article key={card.title} className="rounded-xl glass-surface p-4">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.cue}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {ideaBoard.wireframe.map((row) => (
              <article key={row.section} className="rounded-xl glass-surface p-4">
                <p className="text-sm font-semibold">{row.section}</p>
                <div className="mt-3 grid gap-2">
                  {row.blocks.map((block) => (
                    <div
                      key={block}
                      className="rounded-lg border border-edge/80 bg-panel px-3 py-2 text-sm text-muted"
                    >
                      {block}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-xl glass-surface p-4">
            <h3 className="font-semibold">{text.artDirectionAxes}</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {ideaBoard.artDirection.map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <SectionCard id="legacy-components" title={text.freeComponentsTitle} hint={text.freeComponentsHint}>
            {componentRecommendations.length === 0 ? (
              <p className="text-sm text-muted">{text.noRecommendations}</p>
            ) : (
              <div className="grid gap-4">
                {componentRecommendations.map((entry) => (
                  <article
                    key={`${entry.item.id}-${entry.recommendedForPage}`}
                    className="rounded-xl glass-surface p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">{entry.item.componentName}</h3>
                      <span className="text-sm text-muted">
                        {text.sourceLabel}: {entry.item.source}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {entry.item.libraryName} · {entry.item.category}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      <span className="font-semibold text-text">{text.reasonLabel}:</span>{" "}
                      {entry.reason}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-text">
                        {text.recommendedForLabel}:
                      </span>{" "}
                      {text.pageTypeLabels[entry.recommendedForPage]} /{" "}
                      {entry.recommendedForSection}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted">
                      <span>
                        {text.licenseLabel}: {entry.item.license}
                      </span>
                      <span>React: {entry.item.reactCompatible ? "Yes" : "No"}</span>
                      <span>{entry.item.framework}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard id="legacy-frameworks" title={text.frameworksTitle} hint={text.frameworksHint}>
            {frameworkRecommendations.length === 0 ? (
              <p className="text-sm text-muted">{text.noRecommendations}</p>
            ) : (
              <div className="grid gap-4">
                {frameworkRecommendations.map((framework) => (
                  <article
                    key={framework.id}
                    className="rounded-xl glass-surface p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">{framework.name}</h3>
                      <span className="text-sm text-muted">{framework.type}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      <span className="font-semibold text-text">{text.reasonLabel}:</span>{" "}
                      {framework.reason}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-text">{text.pairingsLabel}:</span>{" "}
                      {framework.pairings.join(", ")}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-text">
                        {text.constraintsLabel}:
                      </span>{" "}
                      {framework.constraints.join(", ")}
                    </p>
                    <a
                      href={framework.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-sm font-semibold text-accent transition hover:opacity-80"
                    >
                      {framework.name}
                    </a>
                  </article>
                ))}
              </div>
            )}
          </SectionCard>
        </section>

        <SectionCard id="legacy-page-match" title={text.pageMatchTitle} hint={text.pageMatchHint}>
          <div className="grid gap-4 lg:grid-cols-2">
            {pagePlans.map((pagePlan) => {
              const matches = pageMatches[pagePlan.page] ?? [];
              return (
                <article
                  key={pagePlan.page}
                  className="rounded-xl glass-surface p-4"
                >
                  <h3 className="font-semibold">{text.pageTypeLabels[pagePlan.page]}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {pagePlan.sections.join(" / ")}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {matches.length === 0 ? (
                      <p className="text-sm text-muted">{text.noRecommendations}</p>
                    ) : (
                      matches.map((entry) => (
                        <div
                          key={`${pagePlan.page}-${entry.item.id}`}
                          className="rounded-lg border border-edge bg-panel px-3 py-3"
                        >
                          <p className="text-sm font-semibold">{entry.item.componentName}</p>
                          <p className="mt-1 text-sm text-muted">
                            {entry.item.libraryName} · {entry.recommendedForSection}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </SectionCard>

        <section id="legacy-favorites" className="mt-6 glass-panel rounded-3xl p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{text.favoritesTitle}</h2>
            <p className="text-sm text-muted">{text.favoritesHint}</p>
          </div>

          {favorites.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{text.favoritesEmpty}</p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {favorites.map((favorite) => (
                <article
                  key={favorite.id}
                  className="rounded-xl glass-surface p-4"
                >
                  <p className="text-sm text-muted">
                    {new Date(favorite.createdAt).toLocaleString(localeTag(locale))}
                  </p>
                  <p className="mt-2 text-sm">
                    {PILLARS.map(
                      (pillar) =>
                        `${text.pillarLabels[pillar]}: ${getPackValue(favorite.pack, pillar)}`,
                    ).join(" | ")}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => loadFavorite(favorite)}
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm font-semibold transition hover:border-accent"
                    >
                      {text.load}
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm font-semibold transition hover:border-accent"
                    >
                      {text.remove}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="legacy-history" className="mt-6 glass-panel rounded-3xl p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{text.historyTitle}</h2>
            <button
              onClick={clearHistory}
              className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.clear}
            </button>
          </div>

          {history.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{text.historyEmpty}</p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {history.map((entry) => (
                <article key={entry.id} className="rounded-xl glass-surface p-4">
                  <p className="text-sm text-muted">
                    {new Date(entry.createdAt).toLocaleString(localeTag(locale))}
                  </p>
                  <p className="mt-2 text-sm">
                    {PILLARS.map(
                      (pillar) =>
                        `${text.pillarLabels[pillar]}: ${getPackValue(entry.pack, pillar)}`,
                    ).join(" | ")}
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => loadFromHistory(entry)}
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm font-semibold transition hover:border-accent"
                    >
                      {text.load}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
          </div>
        </div>
      </main>
    </div>
  );
}
