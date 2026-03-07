"use client";

const C = {
  bg:       "#0D0B09",
  surface:  "#161310",
  edge:     "rgba(240,235,220,0.08)",
  edgeMid:  "rgba(240,235,220,0.12)",
  text:     "#F0EDE6",
  muted:    "rgba(240,237,230,0.42)",
  faint:    "rgba(240,237,230,0.18)",
  accent:   "#8BAE7A",
  accentDim:"rgba(139,174,122,0.15)",
};

export default function ForgeLanding() {
  const principles = [
    {
      num: "I",
      title: "Brief to Strategy",
      body: "Product interpretation, recommended scope, conversion logic and user journey framework — derived from a single input.",
    },
    {
      num: "II",
      title: "Page Architecture",
      body: "Every page receives a role, priority, content depth and section list. Structure comes before visuals.",
    },
    {
      num: "III",
      title: "Component Intelligence",
      body: "Pattern families scored with a deterministic weighted ranking system. Reproducible, auditable choices.",
    },
    {
      num: "IV",
      title: "Destination Export",
      body: "Implementation packs formatted for Codex, v0, Cursor, Bolt and more. One click to handoff.",
    },
  ];

  const steps = [
    {
      n: "1",
      title: "Describe your project",
      body: "Business type, audience, goals, brand personality and target build destination. Plain language, no templates.",
    },
    {
      n: "2",
      title: "Engine extracts strategy",
      body: "Deterministic intelligence processes your brief across six layers: strategy, architecture, taste, components, rationale and export.",
    },
    {
      n: "3",
      title: "Receive your decision pack",
      body: "A complete, implementation-ready package formatted for your chosen build tool. Download and build.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Warm ambient glow — very subtle */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,174,122,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(13,11,9,0.88)",
          borderBottom: `1px solid ${C.edge}`,
          backdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <span
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: C.text,
            }}
          >
            Style Engine
          </span>
          <span style={{ width: "1px", height: "16px", background: C.edge }} />
          <a href="#principles" style={{ fontSize: "13px", color: C.muted, textDecoration: "none" }}>Principles</a>
          <a href="#process" style={{ fontSize: "13px", color: C.muted, textDecoration: "none" }}>Process</a>
        </div>
        <a
          href="/workspace"
          style={{
            background: C.accent,
            color: "#0D0B09",
            padding: "8px 20px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Launch →
        </a>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "128px 40px 88px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
        }}
      >
        <div className="lp-left">
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: "32px",
              opacity: 0.75,
            }}
          >
            Pre-build Decision Intelligence
          </p>
          <h1
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              margin: "0 0 32px",
              color: C.text,
            }}
          >
            Build
            <br />
            before
            <br />
            <span style={{ color: C.accent }}>you build.</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: C.muted,
              lineHeight: 1.72,
              maxWidth: "380px",
              marginBottom: "48px",
            }}
          >
            Turn a rough brief into strategy, page architecture,
            component intelligence and destination-ready export packs.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="/workspace"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: C.accent,
                color: "#0D0B09",
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Start building
              <span style={{ fontSize: "18px" }}>→</span>
            </a>
            <a
              href="#principles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: `1px solid ${C.edgeMid}`,
                color: C.muted,
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(240,235,220,0.28)"; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.edgeMid; e.currentTarget.style.color = C.muted; }}
            >
              See principles
            </a>
          </div>
        </div>

        <div className="lp-right">
          {/* Pullquote */}
          <div
            style={{
              borderLeft: `3px solid ${C.accent}`,
              paddingLeft: "28px",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "20px",
                lineHeight: 1.5,
                color: "rgba(240,237,230,0.65)",
                fontStyle: "italic",
              }}
            >
              "Scope and architecture are prioritised before implementation. Pattern fit is scored with deterministic weighted ranking."
            </p>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: C.edge,
              border: `1px solid ${C.edge}`,
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {[
              { val: "6", label: "Decision layers" },
              { val: "100%", label: "Deterministic" },
              { val: "5+", label: "Export targets" },
              { val: "∞", label: "Reproducible" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: C.surface,
                  padding: "24px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,174,122,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; }}
              >
                <div
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: "12px", color: C.faint, marginTop: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.edge}`, maxWidth: "1200px", margin: "0 auto 0 40px" }} />

      {/* Principles */}
      <section id="principles" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "80px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "64px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: C.text,
            }}
          >
            Four principles.
          </h2>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: C.faint,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Capabilities
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {principles.map((p, i) => (
            <div
              key={p.num}
              style={{
                borderLeft: i === 0 ? `1px solid ${C.edge}` : "none",
                borderRight: `1px solid ${C.edge}`,
                borderTop: `1px solid ${C.edge}`,
                borderBottom: `1px solid ${C.edge}`,
                padding: "32px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.accentDim; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "14px",
                  color: C.accent,
                  fontStyle: "italic",
                  marginBottom: "20px",
                  letterSpacing: "0.06em",
                  opacity: 0.8,
                }}
              >
                {p.num}
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.68 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process — full-width dark section within dark bg, differentiated by surface */}
      <section
        id="process"
        style={{
          position: "relative",
          zIndex: 1,
          background: C.surface,
          borderTop: `1px solid ${C.edge}`,
          borderBottom: `1px solid ${C.edge}`,
          padding: "100px 40px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: C.faint,
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Process
              </p>
              <h2
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: C.text,
                }}
              >
                From brief to implementation in three steps.
              </h2>
            </div>
            <div>
              {steps.map((step, idx) => (
                <div
                  key={step.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: "24px",
                    paddingBottom: "40px",
                    marginBottom: idx < steps.length - 1 ? "40px" : 0,
                    borderBottom: idx < steps.length - 1 ? `1px solid ${C.edge}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: `1px solid ${C.accent}`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: C.accent,
                      fontFamily: "Georgia, serif",
                      flexShrink: 0,
                      opacity: 0.75,
                    }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: C.text }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: C.muted, lineHeight: 1.68 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: C.text,
              marginBottom: "24px",
            }}
          >
            Ready to decide before you design?
          </h2>
          <p style={{ fontSize: "15px", color: C.muted, lineHeight: 1.68, marginBottom: "36px", maxWidth: "380px" }}>
            Start with a brief. Leave with every decision made, documented and ready to implement.
          </p>
          <a
            href="/workspace"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: C.accent,
              color: "#0D0B09",
              padding: "14px 28px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Open Style Engine →
          </a>
        </div>

        {/* Decision card */}
        <div
          style={{
            border: `1px solid ${C.edge}`,
            borderRadius: "8px",
            overflow: "hidden",
            background: C.surface,
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              borderBottom: `1px solid ${C.edge}`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: C.faint, fontStyle: "italic" }}>
              Decision Package
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontWeight: 700,
                color: C.accent,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Ready
            </span>
          </div>
          {[
            ["Engine", "Style Engine v2.4"],
            ["Mode", "Deterministic"],
            ["Vertical", "AI SaaS"],
            ["Destination", "Codex"],
            ["Status", "Ready to export"],
          ].map(([key, val], idx) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 20px",
                borderBottom: idx < 4 ? `1px solid ${C.edge}` : "none",
                fontSize: "13px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.accentDim; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: C.faint }}>{key}</span>
              <span style={{ fontWeight: 600, color: key === "Status" ? C.accent : C.text }}>{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.edge}`,
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: "12px", color: C.faint }}>Style Engine</span>
        <span
          style={{
            fontSize: "12px",
            color: C.faint,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}
        >
          Build before you build.
        </span>
      </footer>
    </div>
  );
}
