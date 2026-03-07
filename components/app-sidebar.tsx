"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    group: null,
    items: [
      { href: "/dashboard",  icon: "⬡", label: "Dashboard"    },
      { href: "/workspace",  icon: "✦", label: "New Brief"    },
    ],
  },
  {
    group: "Koleksiyonlar",
    items: [
      { href: "/dashboard/designs",   icon: "◈", label: "Tasarımlarım"  },
      { href: "/dashboard/favorites", icon: "◎", label: "Beğendiklerim" },
      { href: "/dashboard/archive",   icon: "⊡", label: "Arşiv"         },
    ],
  },
  {
    group: "Araçlar",
    items: [
      { href: "/designs",        icon: "⬕", label: "Tasarım Galerisi" },
      { href: "/admin/catalog",  icon: "⟁", label: "Katalog"          },
    ],
  },
];

interface AppSidebarProps {
  activeStep?: number;
  steps?: string[];
  onStep?: (n: number) => void;
  stepUnlocked?: boolean;
}

export function AppSidebar({ activeStep, steps, onStep, stepUnlocked }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "224px",
        background: "rgba(8,26,26,0.97)",
        borderRight: "1px solid rgba(45,212,191,0.1)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(45,212,191,0.08)" }}>
        <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", color: "#fff", fontWeight: 800,
              flexShrink: 0,
            }}
          >
            S
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#f0fafa", letterSpacing: "-0.01em" }}>Style Engine</div>
            <div style={{ fontSize: "10px", color: "rgba(45,212,191,0.5)", letterSpacing: "0.06em", marginTop: "1px" }}>Studio</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
        {NAV.map((section, si) => (
          <div key={si} style={{ marginBottom: "4px" }}>
            {section.group && (
              <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(45,212,191,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 8px 6px" }}>
                {section.group}
              </p>
            )}
            {section.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    marginBottom: "2px",
                    textDecoration: "none",
                    background: active ? "rgba(20,184,166,0.12)" : "transparent",
                    color: active ? "#2dd4bf" : "rgba(240,250,250,0.5)",
                    fontSize: "13px",
                    fontWeight: active ? 600 : 400,
                    transition: "background 0.15s, color 0.15s",
                    borderLeft: active ? "2px solid #14b8a6" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "rgba(45,212,191,0.06)";
                      e.currentTarget.style.color = "rgba(240,250,250,0.8)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(240,250,250,0.5)";
                    }
                  }}
                >
                  <span style={{ fontSize: "14px", opacity: active ? 1 : 0.6, minWidth: "16px", textAlign: "center" }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Workspace step indicator */}
        {steps && steps.length > 0 && (
          <div style={{ marginTop: "16px", borderTop: "1px solid rgba(45,212,191,0.08)", paddingTop: "16px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(45,212,191,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0 8px 8px" }}>
              Adımlar
            </p>
            {steps.map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = activeStep === stepNum;
              const isDone = (activeStep ?? 0) > stepNum;
              const isLocked = stepNum > 1 && !stepUnlocked;
              return (
                <button
                  key={stepNum}
                  onClick={() => !isLocked && onStep?.(stepNum)}
                  disabled={isLocked}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "7px",
                    marginBottom: "2px",
                    border: "none",
                    background: isActive ? "rgba(20,184,166,0.12)" : "transparent",
                    color: isActive ? "#2dd4bf" : isDone ? "rgba(45,212,191,0.55)" : "rgba(240,250,250,0.35)",
                    fontSize: "12px",
                    fontWeight: isActive ? 600 : 400,
                    cursor: isLocked ? "default" : "pointer",
                    textAlign: "left",
                    opacity: isLocked ? 0.4 : 1,
                    transition: "background 0.15s",
                    borderLeft: isActive ? "2px solid #14b8a6" : "2px solid transparent",
                  }}
                >
                  <span
                    style={{
                      width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", fontWeight: 700,
                      background: isActive ? "#14b8a6" : isDone ? "rgba(45,212,191,0.2)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#091e1e" : isDone ? "#2dd4bf" : "rgba(255,255,255,0.3)",
                      border: isDone && !isActive ? "1px solid rgba(45,212,191,0.3)" : "none",
                    }}
                  >
                    {isDone ? "✓" : stepNum}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* User footer */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(45,212,191,0.08)" }}>
        <Link
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            borderRadius: "8px",
            textDecoration: "none",
            background: "rgba(45,212,191,0.06)",
            border: "1px solid rgba(45,212,191,0.1)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(45,212,191,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(45,212,191,0.06)"; }}
        >
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg,#14b8a6,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            U
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#f0fafa", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Kullanıcı
            </div>
            <div style={{ fontSize: "10px", color: "rgba(45,212,191,0.5)", marginTop: "1px" }}>Ücretsiz plan</div>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(45,212,191,0.4)" }}>⚙</span>
        </Link>
      </div>
    </aside>
  );
}
