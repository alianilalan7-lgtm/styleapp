export default function VoidLanding() {
  const features = [
    {
      icon: "◈",
      title: "Brief → Strategy",
      desc: "Rough ideas become structured strategy, scope decisions and conversion logic — before a single line of code.",
    },
    {
      icon: "⬡",
      title: "Page Architecture",
      desc: "Every page, its role, content depth and sections are laid out with prioritised hierarchy.",
    },
    {
      icon: "◎",
      title: "Component Intelligence",
      desc: "Pattern families scored with deterministic weighted ranking. No guesswork.",
    },
    {
      icon: "⟁",
      title: "Destination Packs",
      desc: "Export implementation-ready packs for Codex, v0, Cursor and more with one click.",
    },
    {
      icon: "◐",
      title: "Taste Engine",
      desc: "Visual direction, typography, motion level and trust signals all resolved from your brief.",
    },
    {
      icon: "⊕",
      title: "Rationale Layer",
      desc: "Every recommendation is traceable. Understand exactly why each decision was made.",
    },
  ];

  const steps = [
    { num: "01", label: "Describe your product" },
    { num: "02", label: "Engine extracts strategy" },
    { num: "03", label: "Receive your decision pack" },
  ];

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%)",
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
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Style Engine
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <a href="#features" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>
              Features
            </a>
            <a href="#how" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>
              How it works
            </a>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#000",
                padding: "7px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "160px",
          paddingBottom: "120px",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "160px 24px 120px",
        }}
      >
        <div
          className="lp-fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(37,99,235,0.4)",
            borderRadius: "100px",
            padding: "5px 14px",
            fontSize: "12px",
            color: "rgba(147,197,253,1)",
            marginBottom: "40px",
            background: "rgba(37,99,235,0.08)",
          }}
        >
          <span style={{ width: "6px", height: "6px", background: "#3b82f6", borderRadius: "50%", display: "inline-block" }} className="lp-glow" />
          Pre-build decision intelligence
        </div>

        <h1
          className="lp-fade-in lp-d1"
          style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            margin: "0 0 28px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Build before
          <br />
          <span style={{ color: "rgba(255,255,255,0.3)" }}>you build.</span>
        </h1>

        <p
          className="lp-fade-in lp-d2"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "520px",
            margin: "0 auto 48px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Turn a rough brief into strategy, page architecture, component intelligence,
          and destination-ready export packs.
        </p>

        <div className="lp-fade-in lp-d3" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              background: "#2563EB",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Start building →
          </a>
          <a
            href="#features"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              padding: "13px 28px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            See features
          </a>
        </div>

        {/* Stats row */}
        <div
          className="lp-fade-in lp-d4"
          style={{
            display: "flex",
            gap: "48px",
            justifyContent: "center",
            marginTop: "80px",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "6", label: "Decision layers" },
            { val: "100%", label: "Deterministic" },
            { val: "5+", label: "Export targets" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", maxWidth: "1200px", margin: "0 auto" }} />

      {/* Features */}
      <section id="features" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "16px" }}>
          Capabilities
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "64px", maxWidth: "480px", lineHeight: 1.15 }}>
          Every decision, resolved before you open your editor.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#000",
                padding: "32px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#000"; }}
            >
              <span style={{ fontSize: "22px", display: "block", marginBottom: "16px", color: "rgba(255,255,255,0.3)" }}>{f.icon}</span>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "80px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "16px" }}>
            Process
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "64px", lineHeight: 1.15 }}>
            Three steps to clarity.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {steps.map((s) => (
              <div key={s.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", fontFamily: "monospace", paddingTop: "3px", minWidth: "24px" }}>{s.num}</span>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "24px", lineHeight: 1.05 }}>
            Ready to build smarter?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "16px", marginBottom: "40px" }}>
            Start with a brief. Leave with a complete decision package.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#000",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Open Style Engine →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
          Style Engine · Build before you build.
        </p>
      </footer>
    </div>
  );
}
