"use client";

export default function ObsidianLanding() {
  const modules = [
    {
      id: "01",
      tag: "strategy",
      title: "Decision extraction",
      lines: [
        "→ Product interpretation",
        "→ Recommended scope",
        "→ Conversion logic",
        "→ Primary user journey",
        "→ Risks & tradeoffs",
      ],
      accent: "#06b6d4",
    },
    {
      id: "02",
      tag: "architecture",
      title: "Page structure",
      lines: [
        "→ Page roles & priorities",
        "→ Content depth mapping",
        "→ Section blueprints",
        "→ Navigation logic",
        "→ SEO architecture",
      ],
      accent: "#22c55e",
    },
    {
      id: "03",
      tag: "taste_engine",
      title: "Aesthetic resolution",
      lines: [
        "→ Visual direction",
        "→ Typography system",
        "→ Motion level",
        "→ Trust signal type",
        "→ Aesthetic signals",
      ],
      accent: "#a855f7",
    },
    {
      id: "04",
      tag: "component_intel",
      title: "Pattern scoring",
      lines: [
        "→ Pattern family match",
        "→ Weighted score ranking",
        "→ Complexity fit check",
        "→ Source attribution",
        "→ Implementation notes",
      ],
      accent: "#f59e0b",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#e2e8f0",
        fontFamily: "'Space Grotesk', 'Inter', 'Helvetica Neue', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <div
          className="lp-glow"
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="lp-glow lp-d3"
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "500px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(6,182,212,0.12)",
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: "56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 12px #06b6d4",
            }}
            className="lp-glow"
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#e2e8f0",
            }}
          >
            Style Engine
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(6,182,212,0.7)" }}>
            v2.4.0
          </span>
          <a
            href="/workspace"
            style={{
              border: "1px solid rgba(6,182,212,0.4)",
              color: "#06b6d4",
              padding: "7px 18px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.3)";
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
            }}
          >
            Launch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "140px 32px 80px",
          textAlign: "center",
        }}
      >
        {/* Terminal badge */}
        <div
          className="lp-fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(6,182,212,0.05)",
            border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "4px",
            padding: "8px 16px",
            marginBottom: "48px",
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#06b6d4",
          }}
        >
          <span className="lp-blink" style={{ color: "#22c55e" }}>▌</span>
          style-engine --mode=intelligence --output=decision-pack
        </div>

        <h1
          className="lp-fade-in lp-d1"
          style={{
            fontSize: "clamp(48px, 9vw, 96px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 24px",
          }}
        >
          <span style={{ color: "#06b6d4", textShadow: "0 0 40px rgba(6,182,212,0.4)" }}>
            Build
          </span>{" "}
          before
          <br />
          you{" "}
          <span style={{ color: "rgba(255,255,255,0.2)" }}>build.</span>
        </h1>

        <p
          className="lp-fade-in lp-d2"
          style={{
            fontSize: "17px",
            color: "rgba(226,232,240,0.5)",
            maxWidth: "480px",
            margin: "0 auto 48px",
            lineHeight: 1.65,
          }}
        >
          Deterministic decision intelligence. Brief in — complete architecture, strategy,
          component picks and export packs out.
        </p>

        <div className="lp-fade-in lp-d3" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/workspace"
            style={{
              background: "#06b6d4",
              color: "#080808",
              padding: "13px 28px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              boxShadow: "0 0 32px rgba(6,182,212,0.35)",
              transition: "box-shadow 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 48px rgba(6,182,212,0.55)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 32px rgba(6,182,212,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Initialize →
          </a>
          <a
            href="#modules"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              padding: "13px 28px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            View modules
          </a>
        </div>

        {/* Metric strip */}
        <div
          className="lp-fade-in lp-d4"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0",
            marginTop: "80px",
            border: "1px solid rgba(6,182,212,0.12)",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "600px",
            margin: "80px auto 0",
          }}
        >
          {[
            { val: "6", label: "LAYERS" },
            { val: "100%", label: "DETERMINISTIC" },
            { val: "5+", label: "TARGETS" },
            { val: "∞", label: "REPRODUCIBLE" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: "20px 12px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(6,182,212,0.12)" : "none",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#06b6d4", letterSpacing: "-0.02em", textShadow: "0 0 20px rgba(6,182,212,0.3)" }}>
                {s.val}
              </div>
              <div style={{ fontSize: "10px", color: "rgba(226,232,240,0.25)", fontFamily: "monospace", marginTop: "4px", letterSpacing: "0.1em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(6,182,212,0.6)", marginBottom: "8px", letterSpacing: "0.08em" }}>
              // intelligence_modules
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
              Four decision layers.
            </h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {modules.map((mod) => (
            <div
              key={mod.id}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid rgba(${mod.accent === "#06b6d4" ? "6,182,212" : mod.accent === "#22c55e" ? "34,197,94" : mod.accent === "#a855f7" ? "168,85,247" : "245,158,11"},0.15)`,
                borderRadius: "8px",
                padding: "24px",
                transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow = `0 0 32px ${mod.accent}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: mod.accent, opacity: 0.8, letterSpacing: "0.06em" }}>
                  [{mod.id}] {mod.tag}
                </span>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: mod.accent, boxShadow: `0 0 10px ${mod.accent}` }} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0", marginBottom: "16px", letterSpacing: "-0.01em" }}>
                {mod.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {mod.lines.map((line) => (
                  <p key={line} style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(226,232,240,0.35)", lineHeight: 1.5 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA terminal */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto 80px",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(6,182,212,0.06)",
          }}
        >
          {/* Terminal bar */}
          <div
            style={{
              background: "rgba(6,182,212,0.06)",
              borderBottom: "1px solid rgba(6,182,212,0.1)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.6 }} />
            ))}
            <span style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(226,232,240,0.3)", marginLeft: "8px" }}>
              style-engine — decision-workspace
            </span>
          </div>
          <div
            style={{
              background: "#080808",
              padding: "48px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(6,182,212,0.5)", marginBottom: "24px" }}>
              $ style-engine generate --brief=&quot;your idea here&quot; --output=all
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#e2e8f0",
                marginBottom: "16px",
              }}
            >
              Ready to initialize?
            </h2>
            <p style={{ color: "rgba(226,232,240,0.35)", fontSize: "15px", marginBottom: "36px" }}>
              Paste your brief. Receive your complete decision package.
            </p>
            <a
              href="/workspace"
              style={{
                display: "inline-block",
                background: "#06b6d4",
                color: "#080808",
                padding: "14px 32px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 800,
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "0 0 40px rgba(6,182,212,0.4)",
              }}
            >
              Open Style Engine →
            </a>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(6,182,212,0.08)",
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(226,232,240,0.2)" }}>
          style-engine v2.4.0
        </span>
        <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(6,182,212,0.3)" }}>
          // build before you build
        </span>
      </footer>
    </div>
  );
}
