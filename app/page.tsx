"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import {
  BRAND_PERSONALITY_OPTIONS,
  BUILD_DESTINATION_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  COMPLEXITY_OPTIONS,
  CONTENT_DENSITY_OPTIONS,
  CONVERSION_GOAL_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TECHNICAL_PREFERENCE_OPTIONS,
  VERTICAL_PACK_OPTIONS,
} from "@/lib/strategy/intake";
import type {
  BriefIntake,
  BuildDestination,
  ComposeOutput,
  DestinationPack,
} from "@/lib/strategy/types";

const STEP_IDS = [1, 2, 3, 4, 5, 6] as const;

type StepId = (typeof STEP_IDS)[number];

const COPY = {
  tr: {
    title: "Style Engine",
    subtitle: "Build before you build.",
    description:
      "Briefi stratejiye, sayfa mimarisine, component zekasina ve hedef araca hazir export paketlerine donustur.",
    stepTitles: [
      "Projeyi Anla",
      "Stratejiyi Cikar",
      "Sayfa Mimarisi",
      "Taste Engine",
      "Component Intelligence",
      "Export Orchestration",
    ],
    generate: "Karar Paketini Uret",
    generating: "Uretiliyor...",
    next: "Sonraki",
    prev: "Onceki",
    why: "Bu onerinin nedeni",
    export: "Destination Pack Uret",
    copyMarkdown: "Markdown Kopyala",
    downloadMarkdown: "Markdown Indir",
    downloadJson: "JSON Indir",
    openLegacy: "Legacy akisi ac",
    adminCatalog: "Catalog Admin",
    error: "Islem basarisiz oldu.",
  },
  en: {
    title: "Style Engine",
    subtitle: "Build before you build.",
    description:
      "Turn a rough brief into strategy, page architecture, component intelligence, and destination-ready export packs.",
    stepTitles: [
      "Understand Project",
      "Extract Strategy",
      "Page Architecture",
      "Taste Engine",
      "Component Intelligence",
      "Export Orchestration",
    ],
    generate: "Generate Decision Package",
    generating: "Generating...",
    next: "Next",
    prev: "Previous",
    why: "Why this recommendation",
    export: "Build Destination Pack",
    copyMarkdown: "Copy Markdown",
    downloadMarkdown: "Download Markdown",
    downloadJson: "Download JSON",
    openLegacy: "Open legacy flow",
    adminCatalog: "Catalog Admin",
    error: "Request failed.",
  },
} as const;

function pretty(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toMarkdownFilename(destination: BuildDestination) {
  return `style-engine-${destination}-pack.md`;
}

function toJsonFilename(destination: BuildDestination) {
  return `style-engine-${destination}-pack.json`;
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

const DEFAULT_INTAKE: BriefIntake = {
  locale: "tr",
  projectType: "marketing-site",
  businessType: "ai-saas",
  audience: "B2B karar vericiler",
  primaryGoal: "lead-generation",
  conversionGoal: "book-demo",
  contentDensity: "balanced",
  brandPersonality: ["trustworthy", "technical"],
  technicalPreference: "nextjs",
  targetBuildDestination: "codex",
  complexityLevel: "balanced",
  verticalPack: "ai-saas",
  briefText:
    "AI destekli urun. Hizli deger anlatimi, guven veren dil, net demo cagrisi ve implementasyona hazir kararlar gerekli.",
};

export default function DecisionWorkspacePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [step, setStep] = useState<StepId>(1);
  const [intake, setIntake] = useState<BriefIntake>(DEFAULT_INTAKE);
  const [compose, setCompose] = useState<ComposeOutput | null>(null);
  const [pack, setPack] = useState<DestinationPack | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const copy = COPY[locale];

  const canGoPrev = step > 1;
  const canGoNext = step < 6;

  const activeStepTitle = copy.stepTitles[step - 1];

  const onField = <K extends keyof BriefIntake>(key: K, value: BriefIntake[K]) => {
    setIntake((prev) => ({ ...prev, [key]: value }));
  };

  const togglePersonality = (signal: BriefIntake["brandPersonality"][number]) => {
    setIntake((prev) => {
      const exists = prev.brandPersonality.includes(signal);
      if (exists) {
        const next = prev.brandPersonality.filter((item) => item !== signal);
        return { ...prev, brandPersonality: next.length > 0 ? next : [signal] };
      }
      return {
        ...prev,
        brandPersonality: [...prev.brandPersonality, signal].slice(0, 4),
      };
    });
  };

  const generateCompose = async () => {
    setBusy(true);
    setError("");
    setPack(null);

    try {
      const response = await fetch("/api/strategy/compose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...intake, locale }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as ComposeOutput;
      setCompose(data);
      setStep(2);
    } catch {
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  const buildPack = async (destination: BuildDestination) => {
    if (!compose) return;
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/exports/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination, compose }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as DestinationPack;
      setPack(data);
      onField("targetBuildDestination", destination);
    } catch {
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  const rationaleBullets = useMemo(() => compose?.rationale.bullets ?? [], [compose]);
  const progressPercent = Math.round((step / STEP_IDS.length) * 100);
  const recommendationCount = compose?.componentIntelligence.recommendations.length ?? 0;
  const pageCount = compose?.pageArchitecture.pages.length ?? 0;

  return (
    <main className="studio-page mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="studio-reveal glass-panel rounded-3xl p-6 shadow-panel sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Style Engine Studio</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{copy.title}</h1>
            <p className="mt-2 text-lg font-semibold text-accent">{copy.subtitle}</p>
            <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">{copy.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setLocale("tr")}
              className={`choice-chip rounded-full border px-3 py-1 text-sm font-semibold ${
                locale === "tr" ? "border-accent bg-accent text-surface" : "border-edge bg-surface"
              }`}
            >
              TR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`choice-chip rounded-full border px-3 py-1 text-sm font-semibold ${
                locale === "en" ? "border-accent bg-accent text-surface" : "border-edge bg-surface"
              }`}
            >
              EN
            </button>
            <a href="/legacy" className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm font-semibold">
              {copy.openLegacy}
            </a>
            <a href="/admin/catalog" className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm font-semibold">
              {copy.adminCatalog}
            </a>
          </div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-surface/80">
          <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">Step {step} / {STEP_IDS.length} · %{progressPercent}</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STEP_IDS.map((id) => {
            const isActive = step === id;
            const isUnlocked = id === 1 || Boolean(compose);
            return (
              <button
                key={id}
                onClick={() => {
                  if (isUnlocked) setStep(id);
                }}
                className={`choice-chip flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
                  isActive ? "border-accent bg-accent/20 text-text" : "border-edge bg-surface text-muted"
                } ${!isUnlocked ? "opacity-55" : ""}`}
              >
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${isActive ? "bg-accent text-surface" : "bg-panel text-muted"}`}>
                  {id}
                </span>
                <span>{copy.stepTitles[id - 1]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="studio-reveal studio-delay-1 mt-6 glass-panel rounded-3xl p-6 shadow-panel">
        <header className="rounded-2xl border border-edge/60 bg-panel/55 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Step {step} of {STEP_IDS.length}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">{activeStepTitle}</h2>
          <p className="mt-1 text-sm text-muted">
            {compose
              ? "Deterministic decision intelligence active. Recommendations are traceable and reproducible."
              : "Fill intake and generate your decision package to unlock full architecture, taste, and component intelligence."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
              pages: {pageCount}
            </span>
            <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
              patterns: {recommendationCount}
            </span>
            <span className="rounded-full border border-edge bg-surface px-2.5 py-1 text-muted">
              destination: {intake.targetBuildDestination}
            </span>
          </div>
        </header>

        <div className="mt-5">
          {step === 1 ? (
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="text-muted">Project type</span>
                  <select
                    value={intake.projectType}
                    onChange={(event) => onField("projectType", event.target.value as BriefIntake["projectType"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {PROJECT_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Business type</span>
                  <select
                    value={intake.businessType}
                    onChange={(event) => onField("businessType", event.target.value as BriefIntake["businessType"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {BUSINESS_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Primary goal</span>
                  <select
                    value={intake.primaryGoal}
                    onChange={(event) => onField("primaryGoal", event.target.value as BriefIntake["primaryGoal"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {PRIMARY_GOAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Conversion goal</span>
                  <select
                    value={intake.conversionGoal}
                    onChange={(event) => onField("conversionGoal", event.target.value as BriefIntake["conversionGoal"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {CONVERSION_GOAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Content density</span>
                  <select
                    value={intake.contentDensity}
                    onChange={(event) => onField("contentDensity", event.target.value as BriefIntake["contentDensity"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {CONTENT_DENSITY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Complexity</span>
                  <select
                    value={intake.complexityLevel}
                    onChange={(event) => onField("complexityLevel", event.target.value as BriefIntake["complexityLevel"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {COMPLEXITY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Technical preference</span>
                  <select
                    value={intake.technicalPreference}
                    onChange={(event) => onField("technicalPreference", event.target.value as BriefIntake["technicalPreference"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {TECHNICAL_PREFERENCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="text-muted">Vertical pack</span>
                  <select
                    value={intake.verticalPack}
                    onChange={(event) => onField("verticalPack", event.target.value as BriefIntake["verticalPack"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {VERTICAL_PACK_OPTIONS.map((option) => (
                      <option key={option} value={option}>{pretty(option)}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm md:col-span-2">
                  <span className="text-muted">Target destination</span>
                  <select
                    value={intake.targetBuildDestination}
                    onChange={(event) => onField("targetBuildDestination", event.target.value as BriefIntake["targetBuildDestination"])}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  >
                    {BUILD_DESTINATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option.toUpperCase()}</option>
                    ))}
                  </select>
                </label>

                <label className="text-sm md:col-span-2">
                  <span className="text-muted">Audience</span>
                  <input
                    value={intake.audience}
                    onChange={(event) => onField("audience", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  />
                </label>

                <label className="text-sm md:col-span-2">
                  <span className="text-muted">Brief</span>
                  <textarea
                    value={intake.briefText}
                    onChange={(event) => onField("briefText", event.target.value)}
                    className="mt-1 min-h-28 w-full rounded-lg border border-edge bg-surface px-3 py-2"
                  />
                </label>
              </div>

              <div>
                <p className="text-sm text-muted">Brand personality</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BRAND_PERSONALITY_OPTIONS.map((signal) => {
                    const active = intake.brandPersonality.includes(signal);
                    return (
                      <button
                        key={signal}
                        type="button"
                        onClick={() => togglePersonality(signal)}
                        className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                          active
                            ? "border-accent bg-accent text-surface"
                            : "border-edge bg-surface text-text"
                        }`}
                      >
                        {pretty(signal)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={generateCompose}
                disabled={busy}
                className="choice-chip rounded-xl border border-accent bg-accent px-4 py-2 text-sm font-semibold text-surface disabled:opacity-70"
              >
                {busy ? copy.generating : copy.generate}
              </button>
            </div>
          ) : null}

          {step === 2 && compose ? (
            <div className="grid gap-4 text-sm">
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Product interpretation</h2>
                <p className="mt-2 text-muted">{compose.strategy.productInterpretation}</p>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Recommended scope</h2>
                <p className="mt-2 text-muted">{compose.strategy.recommendedScope}</p>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Primary user journey</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.strategy.primaryUserJourney.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Conversion logic</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.strategy.conversionLogic.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Content strategy</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.strategy.contentStrategy.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">MVP now</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.strategy.mvpNow.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Later phase</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.strategy.laterPhase.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Risks and tradeoffs</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {[...compose.strategy.risks, ...compose.strategy.tradeoffs].map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </div>
            </div>
          ) : null}

          {step === 3 && compose ? (
            <div className="grid gap-3">
              {compose.pageArchitecture.pages.map((page) => (
                <article key={page.page} className="rounded-xl glass-surface p-4 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold">{page.page}</h2>
                    <span className="text-muted">{page.priority}</span>
                  </div>
                  <p className="mt-2 text-muted">{page.role}</p>
                  <p className="mt-2 text-muted">content depth: {page.contentDepth}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {page.suggestedSections.map((section) => (
                      <span key={section} className="rounded-full border border-edge bg-panel px-2 py-0.5 text-xs text-muted">
                        {section}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {step === 4 && compose ? (
            <div className="grid gap-4 text-sm">
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">{compose.taste.directionName}</h2>
                <p className="mt-2 text-muted">{compose.taste.visualTone}</p>
              </div>
              <div className="rounded-xl glass-surface p-4 text-muted">
                <p><span className="font-semibold text-text">Layout:</span> {compose.taste.layoutDirection}</p>
                <p className="mt-1"><span className="font-semibold text-text">Typography:</span> {compose.taste.typographyDirection}</p>
                <p className="mt-1"><span className="font-semibold text-text">Motion:</span> {compose.taste.motionLevel}</p>
                <p className="mt-1"><span className="font-semibold text-text">Trust signal:</span> {compose.taste.trustSignal}</p>
              </div>
              <div className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Signals</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {compose.taste.aestheticSignals.map((signal) => (
                    <span key={signal} className="rounded-full border border-edge bg-panel px-2 py-0.5 text-xs text-muted">{signal}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 5 && compose ? (
            <div className="grid gap-3 text-sm">
              <article className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Trust modules</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.componentIntelligence.trustModules.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </article>
              <article className="rounded-xl glass-surface p-4">
                <h2 className="font-semibold">Conversion UX suggestions</h2>
                <ul className="mt-2 space-y-1 text-muted">
                  {compose.componentIntelligence.conversionUxSuggestions.map((line) => <li key={line}>- {line}</li>)}
                </ul>
              </article>
              {compose.componentIntelligence.recommendations.map((item) => (
                <article key={item.id} className="rounded-xl glass-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold">{item.componentName}</h2>
                    <span className="text-muted">score {item.scoreBreakdown.total}</span>
                  </div>
                  <p className="mt-1 text-muted">{item.patternFamily} · {item.source}</p>
                  <p className="mt-2 text-muted">complexity fit: {item.complexityFit}</p>
                  <ul className="mt-2 space-y-1 text-muted">
                    {item.rationale.map((line) => <li key={line}>- {line}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}

          {step === 6 && compose ? (
            <div className="grid gap-4 text-sm">
              <div className="flex flex-wrap gap-2">
                {BUILD_DESTINATION_OPTIONS.map((destination) => (
                  <button
                    key={destination}
                    onClick={() => buildPack(destination)}
                    className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 font-semibold"
                  >
                    {copy.export}: {destination.toUpperCase()}
                  </button>
                ))}
              </div>

              {pack ? (
                <>
                  <pre className="max-h-80 overflow-auto rounded-xl glass-surface p-4 text-xs leading-relaxed">
                    {pack.markdown}
                  </pre>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(pack.markdown)}
                      className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 font-semibold"
                    >
                      {copy.copyMarkdown}
                    </button>
                    <button
                      onClick={() => downloadText(toMarkdownFilename(pack.destination), pack.markdown, "text/markdown")}
                      className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 font-semibold"
                    >
                      {copy.downloadMarkdown}
                    </button>
                    <button
                      onClick={() =>
                        downloadText(
                          toJsonFilename(pack.destination),
                          JSON.stringify(pack.json, null, 2),
                          "application/json",
                        )
                      }
                      className="choice-chip rounded-lg border border-edge bg-surface px-3 py-1.5 font-semibold"
                    >
                      {copy.downloadJson}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}

        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => canGoPrev && setStep((prev) => (prev - 1) as StepId)}
            disabled={!canGoPrev}
            className="choice-chip rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {copy.prev}
          </button>
          <button
            onClick={() => canGoNext && setStep((prev) => (prev + 1) as StepId)}
            disabled={!canGoNext || !compose}
            className="choice-chip rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {copy.next}
          </button>
        </div>

        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      </section>

      <section className="studio-reveal studio-delay-2 mt-6 grid gap-6 lg:grid-cols-2">
        <section className="glass-panel rounded-3xl p-6 shadow-panel">
          <h2 className="text-lg font-semibold">{copy.why}</h2>
          <p className="mt-2 text-sm text-muted">
            {compose
              ? `Engine: ${compose.engineVersion} · ${new Date(compose.generatedAt).toLocaleString(locale === "tr" ? "tr-TR" : "en-US")}`
              : "Generate the decision package to view rationale and evidence."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-edge bg-surface px-3 py-2">
              <p className="text-muted">Required pages</p>
              <p className="mt-1 text-sm font-semibold text-text">{pageCount}</p>
            </div>
            <div className="rounded-lg border border-edge bg-surface px-3 py-2">
              <p className="text-muted">Pattern picks</p>
              <p className="mt-1 text-sm font-semibold text-text">{recommendationCount}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-muted">
            {rationaleBullets.length > 0
              ? rationaleBullets.map((line) => <li key={line}>- {line}</li>)
              : [
                  "Scope and architecture are prioritized before implementation.",
                  "Pattern fit is scored with deterministic weighted ranking.",
                  "Destination packs are generated after decision confidence.",
                ].map((line) => <li key={line}>- {line}</li>)}
          </ul>

          {compose ? (
            <div className="mt-5 rounded-xl glass-surface p-4 text-sm text-muted">
              <p>
                <span className="font-semibold text-text">Vertical:</span> {compose.intake.verticalPack}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-text">Goal:</span> {compose.intake.primaryGoal}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-text">Destination:</span> {compose.intake.targetBuildDestination}
              </p>
            </div>
          ) : null}
        </section>

        <section className="glass-panel rounded-3xl p-6 shadow-panel">
          <h2 className="text-lg font-semibold">Decision Snapshot</h2>
          <p className="mt-2 text-sm text-muted">
            Review this summary before continuing to build tools.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-edge bg-surface px-3 py-2">
              <p className="text-muted">Required pages</p>
              <p className="mt-1 text-sm font-semibold text-text">{pageCount}</p>
            </div>
            <div className="rounded-lg border border-edge bg-surface px-3 py-2">
              <p className="text-muted">Pattern picks</p>
              <p className="mt-1 text-sm font-semibold text-text">{recommendationCount}</p>
            </div>
          </div>
          {compose ? (
            <div className="mt-4 rounded-xl border border-edge bg-surface p-4 text-sm text-muted">
              <p>
                <span className="font-semibold text-text">Vertical:</span> {compose.intake.verticalPack}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-text">Goal:</span> {compose.intake.primaryGoal}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-text">Destination:</span> {compose.intake.targetBuildDestination}
              </p>
              <p className="mt-3">
                Outputs are deterministic and can be re-generated with the same brief.
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-edge bg-surface p-4 text-sm text-muted">
              Decision package not generated yet.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
