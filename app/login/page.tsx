"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(45,212,191,0.2)",
    background: "rgba(14,52,52,0.5)",
    color: "#f0fafa",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

      {/* Sol — Marka */}
      <div
        style={{
          background: "linear-gradient(160deg,#0a2828 0%,#091e1e 50%,#061414 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient blobs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 65%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,0.14) 0%,transparent 65%)", filter: "blur(40px)" }} />
        </div>

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg,#14b8a6,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800, color: "#fff" }}>S</div>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#f0fafa", letterSpacing: "-0.01em" }}>Style Engine</span>
          </Link>
        </div>

        {/* Ortadaki mesaj */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: "100px", padding: "5px 14px", marginBottom: "32px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#14b8a6", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#2dd4bf", letterSpacing: "0.08em" }}>PRE-BUILD INTELLIGENCE</span>
          </div>

          <h1 style={{ fontSize: "clamp(90px,10vw,140px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", color: "#f0fafa", margin: "0 0 28px" }}>
            Build before<br />
            <span style={{ backgroundImage: "linear-gradient(135deg,#14b8a6,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              you build.
            </span>
          </h1>
          <p style={{ fontSize: "22px", color: "rgba(240,250,250,0.5)", lineHeight: 1.6, maxWidth: "420px" }}>
            Brief'ini stratejiye, mimariye ve implementation-ready export paketlerine dönüştür.
          </p>

          {/* Feature list */}
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {[
              { icon: "✦", text: "AI destekli strateji çıkarımı" },
              { icon: "⬡", text: "Sayfa mimarisi ve component intelligence" },
              { icon: "⟁", text: "v0, Codex, Cursor'a hazır export paketleri" },
            ].map((f) => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ color: "#14b8a6", fontSize: "22px" }}>{f.icon}</span>
                <span style={{ fontSize: "20px", color: "rgba(240,250,250,0.6)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alıntı */}
        <div style={{ position: "relative", zIndex: 1, borderLeft: "2px solid rgba(20,184,166,0.3)", paddingLeft: "20px" }}>
          <p style={{ fontSize: "14px", color: "rgba(240,250,250,0.45)", fontStyle: "italic", lineHeight: 1.6 }}>
            "Style Engine, bir fikri tam kararlar paketine dönüştürmeden önce inşa etmeye başlamayı neredeyse imkansız hale getiriyor."
          </p>
        </div>
      </div>

      {/* Sağ — Form */}
      <div
        style={{
          background: "#f0fdfb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px" }}>

          {/* Tab */}
          <div style={{ display: "flex", background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: "10px", padding: "4px", marginBottom: "32px" }}>
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "9px",
                  borderRadius: "7px",
                  border: "none",
                  background: tab === t ? "#fff" : "transparent",
                  color: tab === t ? "#0d9488" : "#3d7070",
                  fontSize: "13px",
                  fontWeight: tab === t ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: tab === t ? "0 1px 4px rgba(13,148,136,0.12)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {t === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em", color: "#0f2828", marginBottom: "6px" }}>
            {tab === "login" ? "Tekrar hoş geldin" : "Hesap oluştur"}
          </h2>
          <p style={{ fontSize: "14px", color: "#3d7070", marginBottom: "28px" }}>
            {tab === "login" ? "Hesabına giriş yap ve üretmeye devam et." : "Ücretsiz başla, her zaman yükselt."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {tab === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#3d7070", marginBottom: "6px", letterSpacing: "0.04em" }}>Ad Soyad</label>
                <input
                  type="text"
                  placeholder="Ali Anıl Alan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#14b8a6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#3d7070", marginBottom: "6px", letterSpacing: "0.04em" }}>E-posta</label>
              <input
                type="email"
                placeholder="ali@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#14b8a6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#3d7070", letterSpacing: "0.04em" }}>Şifre</label>
                {tab === "login" && <a href="#" style={{ fontSize: "12px", color: "#0d9488", textDecoration: "none" }}>Şifremi unuttum</a>}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#14b8a6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            <Link
              href="/dashboard"
              style={{
                display: "block",
                textAlign: "center",
                background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
                color: "#fff",
                padding: "13px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
                marginTop: "4px",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {tab === "login" ? "Giriş Yap →" : "Hesap Oluştur →"}
            </Link>

            <div style={{ position: "relative", textAlign: "center", margin: "4px 0" }}>
              <div style={{ borderTop: "1px solid rgba(20,184,166,0.12)", position: "absolute", top: "50%", left: 0, right: 0 }} />
              <span style={{ position: "relative", background: "#f0fdfb", padding: "0 12px", fontSize: "12px", color: "#99c4c0" }}>veya</span>
            </div>

            <button
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid rgba(20,184,166,0.2)", background: "#fff", color: "#0f2828", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google ile devam et
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#99c4c0", marginTop: "24px" }}>
            {tab === "login" ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
            <button onClick={() => setTab(tab === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: "#0d9488", fontWeight: 600, cursor: "pointer", fontSize: "12px", padding: 0 }}>
              {tab === "login" ? "Kayıt ol" : "Giriş yap"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
