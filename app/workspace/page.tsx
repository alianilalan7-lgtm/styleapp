"use client";

import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
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
import type { BriefIntake, BuildDestination, ComposeOutput, DestinationPack } from "@/lib/strategy/types";

const STEP_IDS = [1, 2, 3, 4, 5, 6] as const;
type StepId = (typeof STEP_IDS)[number];

const STEP_LABELS = ["Brief", "Strateji", "Mimari", "Taste", "Komponent", "Export"];

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
  briefText: "AI destekli ürün. Hızlı değer anlatımı, güven veren dil, net demo çağrısı ve implementasyona hazır kararlar gerekli.",
};

function pretty(v: string) {
  return v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ─── Küçük UI primitives ─── */
const label14: React.CSSProperties = { fontSize: "12px", fontWeight: 600, color: "rgba(15,40,40,0.45)", letterSpacing: "0.06em", display: "block", marginBottom: "6px" };

const selectStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: "8px",
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(255,255,255,0.9)",
  color: "#0f2828", fontSize: "13px", outline: "none",
  appearance: "none", cursor: "pointer",
  transition: "border-color 0.15s",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: "8px",
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(255,255,255,0.9)",
  color: "#0f2828", fontSize: "13px", outline: "none",
  transition: "border-color 0.15s",
};

function FieldSelect({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (v: string) => void; options: readonly string[];
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={label14}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={selectStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.18)"; }}
      >
        {options.map((o) => <option key={o} value={o}>{pretty(o)}</option>)}
      </select>
    </label>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: "10px", padding: "18px", marginBottom: "12px" }}>
      <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#14b8a6", marginBottom: "10px", letterSpacing: "-0.01em" }}>{title}</h3>
      <div style={{ fontSize: "13px", color: "rgba(15,40,40,0.55)", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

export default function WorkspacePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [step, setStep] = useState<StepId>(1);
  const [intake, setIntake] = useState<BriefIntake>(DEFAULT_INTAKE);
  const [compose, setCompose] = useState<ComposeOutput | null>(null);
  const [pack, setPack] = useState<DestinationPack | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onField = <K extends keyof BriefIntake>(key: K, value: BriefIntake[K]) =>
    setIntake((p) => ({ ...p, [key]: value }));

  const togglePersonality = (sig: BriefIntake["brandPersonality"][number]) => {
    setIntake((p) => {
      const exists = p.brandPersonality.includes(sig);
      if (exists) {
        const next = p.brandPersonality.filter((x) => x !== sig);
        return { ...p, brandPersonality: next.length > 0 ? next : [sig] };
      }
      return { ...p, brandPersonality: [...p.brandPersonality, sig].slice(0, 4) };
    });
  };

  const generateCompose = async () => {
    setBusy(true); setError(""); setPack(null);
    try {
      const res = await fetch("/api/strategy/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intake, locale }),
      });
      if (!res.ok) throw new Error();
      setCompose(await res.json());
      setStep(2);
    } catch { setError("İşlem başarısız oldu."); }
    finally { setBusy(false); }
  };

  const buildPack = async (dest: BuildDestination) => {
    if (!compose) return;
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/exports/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest, compose }),
      });
      if (!res.ok) throw new Error();
      const data: DestinationPack = await res.json();
      setPack(data);
      onField("targetBuildDestination", dest);
    } catch { setError("Export başarısız."); }
    finally { setBusy(false); }
  };

  const rationaleBullets = useMemo(() => compose?.rationale.bullets ?? [], [compose]);
  const pageCount = compose?.pageArchitecture.pages.length ?? 0;
  const recCount  = compose?.componentIntelligence.recommendations.length ?? 0;

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdfb", fontFamily: "'Inter','Helvetica Neue',sans-serif", display: "flex" }}>
      <AppSidebar
        activeStep={step}
        steps={STEP_LABELS}
        onStep={(n) => setStep(n as StepId)}
        stepUnlocked={!!compose}
      />

      <div style={{ marginLeft: "224px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(240,253,251,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(45,212,191,0.08)", padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f2828" }}>Brief Workspace</span>
            <span style={{ fontSize: "13px", color: "rgba(15,40,40,0.25)" }}>/</span>
            <span style={{ fontSize: "13px", color: "#14b8a6", fontWeight: 500 }}>{STEP_LABELS[step - 1]}</span>
            <div style={{ height: "4px", width: "80px", background: "rgba(45,212,191,0.1)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((step / 6) * 100)}%`, background: "linear-gradient(90deg,#14b8a6,#0ea5e9)", borderRadius: "4px", transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: "11px", color: "rgba(15,40,40,0.4)" }}>{step}/6</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {(["tr", "en"] as Locale[]).map((l) => (
              <button key={l} onClick={() => setLocale(l)} style={{ padding: "5px 10px", borderRadius: "6px", border: "none", background: locale === l ? "rgba(20,184,166,0.2)" : "transparent", color: locale === l ? "#14b8a6" : "rgba(15,40,40,0.35)", fontSize: "11px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px", display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>

          {/* Sol — Step content */}
          <div>
            {/* Step header */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#14b8a6", letterSpacing: "0.1em" }}>ADIM {step}</span>
                <span style={{ fontSize: "11px", color: "rgba(15,40,40,0.2)" }}>·</span>
                <span style={{ fontSize: "11px", color: "rgba(15,40,40,0.4)" }}>{STEP_LABELS[step - 1].toUpperCase()}</span>
              </div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2828", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
                {step === 1 && "Projeyi tanımla"}
                {step === 2 && "Strateji çıktısı"}
                {step === 3 && "Sayfa mimarisi"}
                {step === 4 && "Estetik yön"}
                {step === 5 && "Komponent önerileri"}
                {step === 6 && "Export paketi"}
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(15,40,40,0.35)", margin: 0 }}>
                {compose
                  ? "Deterministik karar motoru aktif. Tüm çıktılar izlenebilir ve tekrar üretilebilir."
                  : "Brief'ini doldur ve karar paketini üret — tüm adımlar bu veriyle kişiselleştirilir."}
              </p>
            </div>

            {/* Step 1 — Intake form */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <FieldSelect label="Proje tipi"       value={intake.projectType}    onChange={(v) => onField("projectType", v as BriefIntake["projectType"])}                   options={PROJECT_TYPE_OPTIONS} />
                  <FieldSelect label="İş tipi"          value={intake.businessType}   onChange={(v) => onField("businessType", v as BriefIntake["businessType"])}                 options={BUSINESS_TYPE_OPTIONS} />
                  <FieldSelect label="Birincil hedef"   value={intake.primaryGoal}    onChange={(v) => onField("primaryGoal", v as BriefIntake["primaryGoal"])}                   options={PRIMARY_GOAL_OPTIONS} />
                  <FieldSelect label="Dönüşüm hedefi"   value={intake.conversionGoal} onChange={(v) => onField("conversionGoal", v as BriefIntake["conversionGoal"])}             options={CONVERSION_GOAL_OPTIONS} />
                  <FieldSelect label="İçerik yoğunluğu" value={intake.contentDensity} onChange={(v) => onField("contentDensity", v as BriefIntake["contentDensity"])}             options={CONTENT_DENSITY_OPTIONS} />
                  <FieldSelect label="Karmaşıklık"      value={intake.complexityLevel} onChange={(v) => onField("complexityLevel", v as BriefIntake["complexityLevel"])}           options={COMPLEXITY_OPTIONS} />
                  <FieldSelect label="Teknik tercih"    value={intake.technicalPreference} onChange={(v) => onField("technicalPreference", v as BriefIntake["technicalPreference"])} options={TECHNICAL_PREFERENCE_OPTIONS} />
                  <FieldSelect label="Dikey paket"      value={intake.verticalPack}   onChange={(v) => onField("verticalPack", v as BriefIntake["verticalPack"])}                 options={VERTICAL_PACK_OPTIONS} />
                </div>

                <label style={{ display: "block" }}>
                  <span style={label14}>Hedef kitle</span>
                  <input value={intake.audience} onChange={(e) => onField("audience", e.target.value)} style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.18)"; }} />
                </label>

                <label style={{ display: "block" }}>
                  <span style={label14}>Hedef build aracı</span>
                  <select value={intake.targetBuildDestination} onChange={(e) => onField("targetBuildDestination", e.target.value as BriefIntake["targetBuildDestination"])} style={selectStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.18)"; }}>
                    {BUILD_DESTINATION_OPTIONS.map((o) => <option key={o} value={o}>{o.toUpperCase()}</option>)}
                  </select>
                </label>

                <label style={{ display: "block" }}>
                  <span style={label14}>Brief metni</span>
                  <textarea value={intake.briefText} onChange={(e) => onField("briefText", e.target.value)}
                    style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.18)"; }} />
                </label>

                {/* Brand personality */}
                <div>
                  <span style={label14}>Marka kişiliği</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                    {BRAND_PERSONALITY_OPTIONS.map((sig) => {
                      const active = intake.brandPersonality.includes(sig);
                      return (
                        <button key={sig} onClick={() => togglePersonality(sig)} style={{ padding: "6px 14px", borderRadius: "100px", border: `1px solid ${active ? "#14b8a6" : "rgba(20,184,166,0.2)"}`, background: active ? "rgba(20,184,166,0.15)" : "transparent", color: active ? "#14b8a6" : "rgba(15,40,40,0.45)", fontSize: "12px", fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                          {pretty(sig)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={generateCompose}
                  disabled={busy}
                  style={{ padding: "13px 24px", borderRadius: "10px", border: "none", background: busy ? "rgba(20,184,166,0.4)" : "linear-gradient(135deg,#14b8a6,#0ea5e9)", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: busy ? "not-allowed" : "pointer", boxShadow: busy ? "none" : "0 6px 20px rgba(20,184,166,0.3)", transition: "all 0.2s", alignSelf: "flex-start" }}
                >
                  {busy ? "Üretiliyor…" : "Karar Paketini Üret →"}
                </button>
              </div>
            )}

            {/* Step 2 — Strategy */}
            {step === 2 && compose && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { title: "Ürün yorumu",       content: compose.strategy.productInterpretation },
                  { title: "Önerilen kapsam",    content: compose.strategy.recommendedScope },
                ].map((s) => (
                  <InfoCard key={s.title} title={s.title}><p style={{ margin: 0 }}>{s.content}</p></InfoCard>
                ))}
                {[
                  { title: "Kullanıcı yolculuğu", list: compose.strategy.primaryUserJourney },
                  { title: "Dönüşüm mantığı",      list: compose.strategy.conversionLogic },
                  { title: "İçerik stratejisi",     list: compose.strategy.contentStrategy },
                  { title: "MVP — Şimdi",           list: compose.strategy.mvpNow },
                  { title: "Sonraki faz",           list: compose.strategy.laterPhase },
                  { title: "Riskler & tradeoff'lar",list: [...compose.strategy.risks, ...compose.strategy.tradeoffs] },
                ].map((s) => (
                  <InfoCard key={s.title} title={s.title}>
                    <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {s.list.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </InfoCard>
                ))}
              </div>
            )}

            {/* Step 3 — Architecture */}
            {step === 3 && compose && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {compose.pageArchitecture.pages.map((page) => (
                  <div key={page.page} style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: "10px", padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f2828", margin: 0 }}>{page.page}</h3>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#14b8a6", background: "rgba(20,184,166,0.1)", padding: "3px 8px", borderRadius: "4px", letterSpacing: "0.06em" }}>{page.priority}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "rgba(15,40,40,0.5)", margin: "0 0 10px", lineHeight: 1.5 }}>{page.role}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {page.suggestedSections.map((s) => (
                        <span key={s} style={{ fontSize: "11px", color: "rgba(15,40,40,0.35)", background: "rgba(45,212,191,0.05)", border: "1px solid rgba(45,212,191,0.1)", padding: "2px 8px", borderRadius: "4px" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4 — Taste */}
            {step === 4 && compose && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <InfoCard title={compose.taste.directionName}>
                  <p style={{ margin: 0 }}>{compose.taste.visualTone}</p>
                </InfoCard>
                <InfoCard title="Yön parametreleri">
                  {[
                    ["Layout", compose.taste.layoutDirection],
                    ["Typography", compose.taste.typographyDirection],
                    ["Motion", compose.taste.motionLevel],
                    ["Trust signal", compose.taste.trustSignal],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontWeight: 600, color: "#14b8a6", minWidth: "90px", fontSize: "12px" }}>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </InfoCard>
                <InfoCard title="Estetik sinyaller">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {compose.taste.aestheticSignals.map((sig) => (
                      <span key={sig} style={{ fontSize: "11px", color: "#14b8a6", background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.18)", padding: "3px 10px", borderRadius: "100px" }}>{sig}</span>
                    ))}
                  </div>
                </InfoCard>
              </div>
            )}

            {/* Step 5 — Components */}
            {step === 5 && compose && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <InfoCard title="Trust modülleri">
                  <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {compose.componentIntelligence.trustModules.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </InfoCard>
                <InfoCard title="Dönüşüm UX önerileri">
                  <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {compose.componentIntelligence.conversionUxSuggestions.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </InfoCard>
                {compose.componentIntelligence.recommendations.map((item) => (
                  <div key={item.id} style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: "10px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f2828", margin: 0 }}>{item.componentName}</h3>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#14b8a6" }}>Skor: {item.scoreBreakdown.total}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#3d7070", margin: "0 0 8px" }}>{item.patternFamily} · {item.source}</p>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "13px", color: "rgba(15,40,40,0.5)", display: "flex", flexDirection: "column", gap: "3px" }}>
                      {item.rationale.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Step 6 — Export */}
            {step === 6 && compose && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <span style={label14}>Build aracı seç</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                    {BUILD_DESTINATION_OPTIONS.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => buildPack(dest)}
                        disabled={busy}
                        style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.2)", background: pack?.destination === dest ? "rgba(20,184,166,0.15)" : "rgba(255,255,255,0.9)", color: pack?.destination === dest ? "#14b8a6" : "rgba(15,40,40,0.6)", fontSize: "13px", fontWeight: 600, cursor: busy ? "not-allowed" : "pointer", transition: "all 0.15s", letterSpacing: "0.04em" }}
                      >
                        {dest.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                {pack && (
                  <>
                    <pre style={{ maxHeight: "340px", overflowY: "auto", background: "rgba(240,253,251,0.8)", border: "1px solid rgba(45,212,191,0.12)", borderRadius: "10px", padding: "20px", fontSize: "12px", color: "rgba(15,40,40,0.65)", lineHeight: 1.65, margin: 0 }}>
                      {pack.markdown}
                    </pre>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {[
                        { label: "Markdown kopyala",   action: () => navigator.clipboard.writeText(pack.markdown) },
                        { label: "Markdown indir",      action: () => downloadText(`style-engine-${pack.destination}-pack.md`, pack.markdown, "text/markdown") },
                        { label: "JSON indir",          action: () => downloadText(`style-engine-${pack.destination}-pack.json`, JSON.stringify(pack.json, null, 2), "application/json") },
                      ].map((btn) => (
                        <button key={btn.label} onClick={btn.action} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.2)", background: "rgba(255,255,255,0.9)", color: "rgba(15,40,40,0.6)", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Boş state */}
            {step > 1 && !compose && (
              <div style={{ padding: "56px 32px", textAlign: "center", border: "1px dashed rgba(45,212,191,0.12)", borderRadius: "12px" }}>
                <p style={{ color: "rgba(15,40,40,0.3)", fontSize: "14px", marginBottom: "16px" }}>Bu adımı açmak için önce Brief'i üret.</p>
                <button onClick={() => setStep(1)} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.2)", background: "transparent", color: "#14b8a6", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  ← Adım 1'e dön
                </button>
              </div>
            )}

            {/* Nav buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button onClick={() => step > 1 && setStep((p) => (p - 1) as StepId)} disabled={step === 1} style={{ padding: "9px 20px", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.15)", background: "transparent", color: "rgba(15,40,40,0.5)", fontSize: "13px", fontWeight: 500, cursor: step === 1 ? "not-allowed" : "pointer", opacity: step === 1 ? 0.4 : 1 }}>
                ← Önceki
              </button>
              <button onClick={() => step < 6 && compose && setStep((p) => (p + 1) as StepId)} disabled={step === 6 || !compose} style={{ padding: "9px 20px", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.1)", color: "#14b8a6", fontSize: "13px", fontWeight: 600, cursor: (step === 6 || !compose) ? "not-allowed" : "pointer", opacity: (step === 6 || !compose) ? 0.4 : 1 }}>
                Sonraki →
              </button>
            </div>

            {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "8px" }}>{error}</p>}
          </div>

          {/* Sağ — Info panel */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(45,212,191,0.1)", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#3d7070", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Karar Özeti</h3>

              {[
                { label: "Sayfa sayısı", value: pageCount > 0 ? String(pageCount) : "—" },
                { label: "Komponent",    value: recCount > 0 ? String(recCount) : "—" },
                { label: "Destination",  value: intake.targetBuildDestination.toUpperCase() },
                { label: "Dikey",        value: intake.verticalPack },
                { label: "Hedef",        value: pretty(intake.primaryGoal) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(45,212,191,0.06)" }}>
                  <span style={{ fontSize: "12px", color: "rgba(15,40,40,0.35)" }}>{label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f2828" }}>{value}</span>
                </div>
              ))}

              {compose && (
                <div style={{ marginTop: "14px", padding: "10px", background: "rgba(20,184,166,0.06)", borderRadius: "8px", border: "1px solid rgba(45,212,191,0.12)" }}>
                  <p style={{ fontSize: "11px", color: "#14b8a6", margin: "0 0 6px", fontWeight: 700 }}>Engine v{compose.engineVersion}</p>
                  <p style={{ fontSize: "11px", color: "rgba(15,40,40,0.3)", margin: 0 }}>{new Date(compose.generatedAt).toLocaleString("tr-TR")}</p>
                </div>
              )}

              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {(compose ? rationaleBullets : [
                  "Kapsam ve mimari implementasyondan önce çözülür.",
                  "Komponent uyumu deterministik ağırlıklı puanlama ile yapılır.",
                  "Paketler karar güveni sonrasında üretilir.",
                ]).slice(0, 3).map((line) => (
                  <p key={line} style={{ fontSize: "11px", color: "rgba(15,40,40,0.3)", lineHeight: 1.55, margin: 0, paddingLeft: "10px", borderLeft: "1px solid rgba(45,212,191,0.2)" }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
