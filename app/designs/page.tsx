"use client";

import Link from "next/link";

const designs = [
  {
    id: "void",
    name: "VOID",
    subtitle: "Dark Precision",
    inspiration: "Linear · Vercel · Raycast",
    desc: "Saf siyah üzerine ultra-minimal bir tasarım. Electric blue aksanlar, ince 1px borderlar ve maximum white space. Yüksek kontrast, sıfır gürültü.",
    bg: "#000",
    fg: "#fff",
    accent: "#2563EB",
    preview: {
      bg: "#000",
      border: "rgba(37,99,235,0.3)",
      badge: { bg: "rgba(37,99,235,0.08)", color: "#93c5fd", text: "Pre-build intelligence" },
      h1Color: "#fff",
      h1Dim: "rgba(255,255,255,0.25)",
      btnBg: "#2563EB",
      btnColor: "#fff",
      btnText: "Start building →",
      subColor: "rgba(255,255,255,0.4)",
      gridBg: "rgba(255,255,255,0.05)",
      gridBorder: "rgba(255,255,255,0.07)",
    },
    tags: ["High Contrast", "Minimalist", "Dark Mode", "Grid Layout"],
  },
  {
    id: "aurora",
    name: "AURORA",
    subtitle: "Gradient Glass",
    inspiration: "Framer · Linear · Loom",
    desc: "Animated gradient blob'lar üzerinde glassmorphism kartlar. Mor-mavi-pembe renk paleti. Işıltılı, premium SaaS hissi. Split hero layout.",
    bg: "#fff",
    fg: "#0a0a0a",
    accent: "#a855f7",
    preview: {
      bg: "#f8f7ff",
      border: "rgba(168,85,247,0.2)",
      badge: { bg: "rgba(168,85,247,0.08)", color: "#a855f7", text: "✦ Pre-build intelligence" },
      h1Color: "#0a0a0a",
      h1Dim: "#a855f7",
      btnBg: "linear-gradient(135deg,#a855f7,#3b82f6)",
      btnColor: "#fff",
      btnText: "Try it free →",
      subColor: "#555",
      gridBg: "rgba(168,85,247,0.06)",
      gridBorder: "rgba(168,85,247,0.15)",
    },
    tags: ["Glassmorphism", "Gradient", "Light Mode", "Split Layout"],
  },
  {
    id: "forge",
    name: "FORGE",
    subtitle: "Editorial Serif",
    inspiration: "Stripe · Apple · Notion",
    desc: "Sıcak krem zemin üzerinde Serif tipografi. Editorial gazete grid'i. Adım adım minimal kompozisyon. Güven ve otorite hissi.",
    bg: "#F7F5F0",
    fg: "#111",
    accent: "#5C7A5A",
    preview: {
      bg: "#F7F5F0",
      border: "rgba(0,0,0,0.1)",
      badge: { bg: "transparent", color: "#888", text: "Pre-build Decision Intelligence" },
      h1Color: "#0d0d0d",
      h1Dim: "#5C7A5A",
      btnBg: "#111",
      btnColor: "#F7F5F0",
      btnText: "Start building →",
      subColor: "#555",
      gridBg: "#F7F5F0",
      gridBorder: "rgba(0,0,0,0.08)",
    },
    tags: ["Editorial", "Serif Font", "Warm Minimal", "Grid + Rules"],
  },
  {
    id: "obsidian",
    name: "OBSIDIAN",
    subtitle: "Neon Matrix",
    inspiration: "Resend · Raycast · Terminal",
    desc: "Koyu siyah üzerinde dot grid ve neon cyan glow efektleri. Monospace detaylar, terminal estetiği. Devs için tasarlanmış, kod dokusu.",
    bg: "#080808",
    fg: "#e2e8f0",
    accent: "#06b6d4",
    preview: {
      bg: "#080808",
      border: "rgba(6,182,212,0.15)",
      badge: { bg: "rgba(6,182,212,0.05)", color: "#06b6d4", text: "▌ style-engine --mode=intelligence" },
      h1Color: "#e2e8f0",
      h1Dim: "#06b6d4",
      btnBg: "#06b6d4",
      btnColor: "#080808",
      btnText: "Initialize →",
      subColor: "rgba(226,232,240,0.4)",
      gridBg: "rgba(6,182,212,0.03)",
      gridBorder: "rgba(6,182,212,0.12)",
    },
    tags: ["Terminal UI", "Neon Glow", "Dark Mode", "Dot Grid"],
  },
];

export default function DesignsGallery() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "-0.01em" }}>Style Engine</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Design Gallery</span>
        </div>
        <Link
          href="/"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          ← Back to workspace
        </Link>
      </header>

      {/* Hero */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "72px 32px 56px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Landing Page Designs
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            margin: "0 0 16px",
            lineHeight: 1.05,
          }}
        >
          4 Premium Tasarım
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", maxWidth: "520px", lineHeight: 1.6 }}>
          Birbirinden farklı 4 premium landing page konsepti. Her biri farklı estetik,
          farklı his. Beğendiğini seç, ana sayfa olarak uygulayalım.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(580px, 1fr))",
          gap: "24px",
        }}
      >
        {designs.map((d) => (
          <div
            key={d.id}
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Mini preview */}
            <div
              style={{
                height: "320px",
                background: d.preview.bg,
                border: `1px solid ${d.preview.border}`,
                margin: "12px",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                gap: "14px",
              }}
            >
              {/* Dot grid for Obsidian */}
              {d.id === "obsidian" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Aurora blobs */}
              {d.id === "aurora" && (
                <div
                  style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-10%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
                    filter: "blur(30px)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Badge */}
              <div
                style={{
                  background: d.preview.badge.bg,
                  border: `1px solid ${d.preview.border}`,
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontSize: "10px",
                  color: d.preview.badge.color,
                  fontFamily: d.id === "obsidian" ? "monospace" : "inherit",
                  fontWeight: 600,
                  letterSpacing: d.id === "forge" ? "0.1em" : "0.02em",
                  textTransform: d.id === "forge" ? "uppercase" : "none",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {d.preview.badge.text}
              </div>

              {/* H1 */}
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontSize: "clamp(28px, 4vw, 38px)",
                    fontWeight: 800,
                    lineHeight: 1.0,
                    letterSpacing: "-0.04em",
                    color: d.preview.h1Color,
                    fontFamily: d.id === "forge" ? "'Georgia', serif" : "inherit",
                  }}
                >
                  Build before
                </div>
                <div
                  style={{
                    fontSize: "clamp(28px, 4vw, 38px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    color: d.preview.h1Dim,
                    fontFamily: d.id === "forge" ? "'Georgia', serif" : "inherit",
                    ...(d.id === "aurora"
                      ? {
                          backgroundImage: "linear-gradient(135deg,#a855f7,#3b82f6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : {}),
                  }}
                >
                  you build.
                </div>
              </div>

              {/* Sub */}
              <p style={{ fontSize: "12px", color: d.preview.subColor, maxWidth: "280px", textAlign: "center", lineHeight: 1.5, position: "relative", zIndex: 1 }}>
                Turn a rough brief into strategy, architecture and implementation-ready export packs.
              </p>

              {/* CTA */}
              <a
                href={`/designs/${d.id}`}
                style={{
                  background: d.preview.btnBg,
                  color: d.preview.btnColor,
                  padding: "9px 20px",
                  borderRadius: d.id === "obsidian" || d.id === "forge" ? "4px" : d.id === "aurora" ? "100px" : "7px",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow:
                    d.id === "aurora"
                      ? "0 4px 14px rgba(168,85,247,0.4)"
                      : d.id === "obsidian"
                      ? "0 0 20px rgba(6,182,212,0.3)"
                      : "none",
                  position: "relative",
                  zIndex: 1,
                  letterSpacing: d.id === "obsidian" || d.id === "forge" ? "0.04em" : "normal",
                  textTransform: d.id === "obsidian" ? "uppercase" : "none",
                  fontFamily: d.id === "obsidian" ? "monospace" : "inherit",
                }}
              >
                {d.preview.btnText}
              </a>

              {/* Feature grid preview */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {["Strategy", "Architecture", "Export"].map((label) => (
                  <div
                    key={label}
                    style={{
                      background: d.preview.gridBg,
                      border: `1px solid ${d.preview.gridBorder}`,
                      borderRadius: d.id === "forge" ? "2px" : "6px",
                      padding: "5px 10px",
                      fontSize: "10px",
                      color: d.id === "aurora" ? "#555" : d.id === "forge" ? "#888" : "rgba(255,255,255,0.35)",
                      fontFamily: d.id === "obsidian" ? "monospace" : "inherit",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Card info */}
            <div style={{ padding: "20px 24px 24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "17px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {d.name}
                    </span>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: d.accent,
                        display: "inline-block",
                      }}
                    />
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                      {d.subtitle}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
                    {d.inspiration}
                  </p>
                </div>
                <Link
                  href={`/designs/${d.id}`}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Preview →
                </Link>
              </div>

              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: "16px" }}>
                {d.desc}
              </p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "4px",
                      padding: "3px 8px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
          Beğendiğin tasarımı söyle — ana sayfa olarak aktif hale getirelim.
        </p>
      </div>
    </div>
  );
}
