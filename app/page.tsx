"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { InstallPwaButton } from "@/components/install-pwa-button";
import {
  BrandDirection,
  OPTIONS,
  PILLARS,
  PROMPT_PRESETS,
  Pillar,
  PromptPreset,
  StylePack,
  buildConcept,
  buildIdeaBoard,
  buildPromptByPreset,
  generatePack,
  getPackValue,
  recommendBrandDirections,
  setPackValue,
} from "@/lib/style-engine";
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
    <div className="rounded-2xl border border-edge bg-panel/80 p-4 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
        <button
          onClick={() => onToggle(pillar)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            isLocked
              ? "bg-accent text-surface"
              : "bg-surface text-text hover:border hover:border-edge"
          }`}
        >
          {isLocked ? lockedText : lockText}
        </button>
      </div>
      <p className="mt-2 text-lg font-semibold leading-snug">{value}</p>
      <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-muted">
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

export default function StyleEnginePage() {
  const [locked, setLocked] = useState<Partial<Record<Pillar, boolean>>>({
    Layout: false,
    Visual: false,
    Typography: false,
    Mood: false,
    Motion: false,
  });
  const [pack, setPack] = useState<StylePack>(() => generatePack({}));
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [promptPreset, setPromptPreset] = useState<PromptPreset>("GPT");
  const [brandBrief, setBrandBrief] = useState("");
  const [brandDirections, setBrandDirections] = useState<BrandDirection[]>([]);
  const [favorites, setFavorites] = useState<SavedPack[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [message, setMessage] = useState("");
  const [urlReady, setUrlReady] = useState(false);
  const hasLoadedPackFromUrl = useRef(false);
  const text = UI_TEXT[locale];

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
  }, [trackHistory, text.packLoadedFromUrl]);

  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    url.searchParams.set("pack", encodePack(pack));
    url.searchParams.set(LOCALE_QUERY_KEY, locale);
    window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
  }, [pack, urlReady, locale]);

  const prompt = useMemo(
    () => buildPromptByPreset(pack, promptPreset, brandBrief, locale),
    [pack, promptPreset, brandBrief, locale],
  );
  const concept = useMemo(() => buildConcept(pack, locale), [pack, locale]);
  const ideaBoard = useMemo(() => buildIdeaBoard(pack, locale), [pack, locale]);

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
    const suggestions = recommendBrandDirections(brandBrief, 5);
    setBrandDirections(suggestions);
    setMessage(text.generatedBrandDirections);
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
      const next: SavedPack[] = [
        {
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          pack,
        },
        ...prev,
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

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{text.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
                {text.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs uppercase tracking-[0.18em] text-muted">
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
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-surface transition hover:brightness-105"
            >
              {text.randomize}
            </button>
            <button
              onClick={generateFromManualSelection}
              className="rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.buildFromSelection}
            </button>
            <button
              onClick={copyPrompt}
              className="rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.copyPrompt}
            </button>
            <button
              onClick={copyShareLink}
              className="rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.copyShareLink}
            </button>
            <button
              onClick={saveFavorite}
              className="rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.saveFavorite}
            </button>
            <button
              onClick={unlockAll}
              className="rounded-xl border border-edge bg-panel px-5 py-2.5 text-sm font-semibold transition hover:border-accent"
            >
              {text.unlockAll}
            </button>
          </div>

          {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel xl:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold">{text.brandBriefTitle}</h2>
              <button
                onClick={createBrandDirections}
                className="rounded-xl border border-edge bg-panel px-4 py-2 text-sm font-semibold transition hover:border-accent"
              >
                {text.brandBriefAction}
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              {text.brandBriefDescription}
            </p>
            <textarea
              value={brandBrief}
              onChange={(event) => setBrandBrief(event.target.value)}
              placeholder={text.brandBriefPlaceholder}
              className="mt-3 min-h-36 w-full rounded-xl border border-edge bg-surface/60 p-4 text-sm text-text outline-none transition placeholder:text-muted focus:border-accent"
            />

            {brandDirections.length > 0 ? (
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {brandDirections.map((direction) => (
                  <article
                    key={direction.id}
                    className="rounded-xl border border-edge bg-surface/60 p-4"
                  >
                    <h3 className="text-sm font-semibold">{direction.name}</h3>
                    <p className="mt-1 text-sm text-muted">{direction.summary}</p>
                    <p className="mt-3 text-xs text-muted">
                      {text.layoutLabel}: {direction.pack.layout} | {text.visualLabel}:{" "}
                      {direction.pack.visual}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {text.typographyLabel}: {direction.pack.typography} | {text.moodLabel}:{" "}
                      {direction.pack.mood}
                    </p>
                    <p className="mt-1 text-xs text-muted">
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
                      className="mt-3 rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
                    >
                      {text.applyDirection}
                    </button>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold">{text.aiPromptTitle}</h2>
              <span className="text-xs text-muted">{text.aiPromptHint}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPromptPreset(preset)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    promptPreset === preset
                      ? "border-accent bg-accent text-surface"
                      : "border-edge bg-panel text-text hover:border-accent"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-edge bg-surface/60 p-4 text-sm leading-relaxed text-text">
              {prompt}
            </pre>
          </div>

          <div className="rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel">
            <h2 className="text-xl font-bold">{text.conceptBlueprintTitle}</h2>
            <div className="mt-4 grid gap-4 text-sm">
              <div className="rounded-xl border border-edge bg-surface/60 p-4">
                <h3 className="font-semibold">{text.homepageSections}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.sections.map((section) => (
                    <li key={section}>- {section}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-edge bg-surface/60 p-4">
                <h3 className="font-semibold">{text.signatureComponents}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.components.map((component) => (
                    <li key={component}>- {component}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-edge bg-surface/60 p-4 text-muted">
                <p>
                  <span className="font-semibold text-text">{text.colorDirection}:</span>{" "}
                  {concept.colorDirection}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-text">{text.typeScale}:</span>{" "}
                  {concept.typeScale}
                </p>
              </div>
              <div className="rounded-xl border border-edge bg-surface/60 p-4">
                <h3 className="font-semibold">{text.motionNotes}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {concept.motionNotes.map((note) => (
                    <li key={note}>- {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold">{text.ideaBoardTitle}</h2>
            <p className="text-xs text-muted">{text.ideaBoardHint}</p>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {ideaBoard.moodboard.map((card) => (
              <article key={card.title} className="rounded-xl border border-edge bg-surface/60 p-4">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.cue}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {ideaBoard.wireframe.slice(0, 4).map((row) => (
              <article key={row.section} className="rounded-xl border border-edge bg-surface/60 p-4">
                <p className="text-sm font-semibold">{row.section}</p>
                <div className="mt-3 grid gap-2">
                  {row.blocks.map((block) => (
                    <div key={block} className="rounded-lg border border-edge/80 bg-panel px-3 py-2 text-xs text-muted">
                      {block}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-edge bg-surface/60 p-4">
            <h3 className="font-semibold">{text.artDirectionAxes}</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {ideaBoard.artDirection.map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{text.favoritesTitle}</h2>
            <p className="text-xs text-muted">{text.favoritesHint}</p>
          </div>

          {favorites.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{text.favoritesEmpty}</p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {favorites.map((favorite) => (
                <article
                  key={favorite.id}
                  className="rounded-xl border border-edge bg-surface/60 p-4"
                >
                  <p className="text-xs text-muted">
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
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
                    >
                      {text.load}
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
                    >
                      {text.remove}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl border border-edge bg-panel/70 p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{text.historyTitle}</h2>
            <button
              onClick={clearHistory}
              className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
            >
              {text.clear}
            </button>
          </div>
          {history.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{text.historyEmpty}</p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {history.map((entry) => (
                <article key={entry.id} className="rounded-xl border border-edge bg-surface/60 p-4">
                  <p className="text-xs text-muted">
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
                      className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
                    >
                      {text.load}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
