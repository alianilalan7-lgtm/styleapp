"use client";

import Link from "next/link";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";

/* ─── Light Teal Palette ─── */
const C = {
  bg:       "#f0fdfb",
  surface:  "#ffffff",
  panel:    "#e6faf7",
  border:   "rgba(20,184,166,0.18)",
  borderHover: "rgba(20,184,166,0.38)",
  text:     "#0f2828",
  muted:    "#3d7070",
  faint:    "rgba(15,40,40,0.4)",
  accent:   "#14b8a6",
  accent2:  "#0ea5e9",
  grad:     "linear-gradient(135deg,#14b8a6,#0ea5e9)",
  cardHover:"rgba(20,184,166,0.05)",
  topbar:   "rgba(240,253,251,0.92)",
};

const MOCK_DESIGNS = [
  { id:"1", name:"AI SaaS Landing",    vertical:"ai-saas",   destination:"v0",    date:"2 saat önce",  status:"complete", favorite:true  },
  { id:"2", name:"E-Ticaret Anasayfa", vertical:"ecommerce", destination:"codex", date:"1 gün önce",   status:"complete", favorite:true  },
  { id:"3", name:"Portfolio Sitesi",   vertical:"portfolio", destination:"bolt",  date:"3 gün önce",   status:"draft",    favorite:false },
  { id:"4", name:"Fintech Dashboard",  vertical:"fintech",   destination:"codex", date:"1 hafta önce", status:"complete", favorite:false },
  { id:"5", name:"Agency Landing",     vertical:"agency",    destination:"cursor",date:"2 hafta önce", status:"complete", favorite:true  },
  { id:"6", name:"Blog & İçerik",      vertical:"blog",      destination:"v0",    date:"3 hafta önce", status:"archive",  favorite:false },
];

const STATS = [
  { label:"Toplam Brief",  value:"24", sub:"+3 bu hafta",   icon:"✦", color:"#14b8a6" },
  { label:"Export Paketi", value:"18", sub:"5 platform",    icon:"⟁", color:"#0ea5e9" },
  { label:"Beğendiklerim", value:"7",  sub:"koleksiyondan", icon:"◎", color:"#0d9488" },
  { label:"Arşiv",         value:"6",  sub:"geçmiş proje",  icon:"⊡", color:"#f59e0b" },
];

const RECENT = [
  { action:"Brief oluşturuldu", target:"AI SaaS Landing",   time:"2 saat önce",  icon:"✦" },
  { action:"Export paketi",     target:"E-Ticaret → Codex", time:"1 gün önce",   icon:"⟁" },
  { action:"Beğenildi",         target:"Agency Landing",    time:"3 gün önce",   icon:"◎" },
  { action:"Arşivlendi",        target:"Blog & İçerik",     time:"3 hafta önce", icon:"⊡" },
];

const VCOLOR: Record<string,string> = {
  "ai-saas":"#14b8a6","ecommerce":"#0ea5e9","portfolio":"#a855f7",
  "fintech":"#f59e0b","agency":"#f43f5e","blog":"#a3e635",
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<"all"|"favorites"|"archive">("all");

  const filtered = MOCK_DESIGNS.filter((d) => {
    if (activeSection === "favorites") return d.favorite;
    if (activeSection === "archive")   return d.status === "archive";
    return d.status !== "archive";
  });

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Helvetica Neue',sans-serif", display:"flex" }}>
      <AppSidebar />

      <div style={{ marginLeft:"224px", flex:1, display:"flex", flexDirection:"column" }}>

        {/* Topbar */}
        <header style={{ position:"sticky", top:0, zIndex:40, background:C.topbar, backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:"14px", fontWeight:600, color:C.text }}>Dashboard</span>
            <span style={{ fontSize:"13px", color:C.muted, marginLeft:"8px" }}>/ Genel Bakış</span>
          </div>
          <Link href="/workspace" style={{ display:"flex", alignItems:"center", gap:"7px", background:C.grad, color:"#fff", padding:"7px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:700, textDecoration:"none", boxShadow:"0 4px 12px rgba(20,184,166,0.25)" }}>
            <span>✦</span> Yeni Brief
          </Link>
        </header>

        <main style={{ padding:"32px", flex:1 }}>
          {/* Welcome */}
          <div style={{ marginBottom:"32px" }}>
            <h1 style={{ fontSize:"22px", fontWeight:800, color:C.text, letterSpacing:"-0.03em", margin:"0 0 4px" }}>Merhaba, Kullanıcı 👋</h1>
            <p style={{ fontSize:"14px", color:C.muted, margin:0 }}>Son aktivitelerine ve projelerine hızlı erişim.</p>
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"14px", marginBottom:"36px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"20px", boxShadow:"0 1px 4px rgba(20,184,166,0.08)", transition:"border-color 0.2s,transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(20,184,166,0.12)"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(20,184,166,0.08)"; }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
                  <span style={{ fontSize:"13px", color:C.muted }}>{s.label}</span>
                  <span style={{ fontSize:"16px", color:s.color }}>{s.icon}</span>
                </div>
                <div style={{ fontSize:"28px", fontWeight:800, color:C.text, letterSpacing:"-0.03em", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:"11px", color:s.color, marginTop:"6px", fontWeight:600 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:"24px" }}>
            {/* Sol — Tasarımlar */}
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                <div style={{ display:"flex", gap:"4px" }}>
                  {([
                    { key:"all",       label:"Tümü"         },
                    { key:"favorites", label:"Beğendiklerim" },
                    { key:"archive",   label:"Arşiv"         },
                  ] as const).map((tab) => (
                    <button key={tab.key} onClick={() => setActiveSection(tab.key)} style={{ padding:"6px 14px", borderRadius:"7px", border:"none", background:activeSection===tab.key?C.panel:"transparent", color:activeSection===tab.key?C.accent:C.muted, fontSize:"12px", fontWeight:activeSection===tab.key?700:400, cursor:"pointer", transition:"all 0.15s", borderBottom:activeSection===tab.key?`2px solid ${C.accent}`:"2px solid transparent" }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <Link href="/workspace" style={{ fontSize:"12px", color:C.accent, textDecoration:"none", fontWeight:600 }}>+ Yeni Brief</Link>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {filtered.length === 0 && (
                  <div style={{ padding:"48px", textAlign:"center", border:`1px dashed ${C.border}`, borderRadius:"12px" }}>
                    <p style={{ color:C.muted, fontSize:"14px" }}>Burada henüz bir şey yok.</p>
                  </div>
                )}
                {filtered.map((d) => (
                  <div key={d.id} style={{ display:"flex", alignItems:"center", gap:"16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px 16px", cursor:"pointer", transition:"border-color 0.15s,background 0.15s,box-shadow 0.15s", boxShadow:"0 1px 3px rgba(20,184,166,0.06)" }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.background=C.cardHover; e.currentTarget.style.boxShadow="0 4px 12px rgba(20,184,166,0.1)"; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface; e.currentTarget.style.boxShadow="0 1px 3px rgba(20,184,166,0.06)"; }}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:`${VCOLOR[d.vertical]??"#14b8a6"}15`, border:`1px solid ${VCOLOR[d.vertical]??"#14b8a6"}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:VCOLOR[d.vertical]??"#14b8a6" }} />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"14px", fontWeight:600, color:C.text, marginBottom:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</div>
                      <div style={{ fontSize:"11px", color:C.muted }}>{d.vertical} · {d.date}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
                      <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"4px", background:"rgba(20,184,166,0.08)", color:C.accent, letterSpacing:"0.06em", textTransform:"uppercase" }}>{d.destination}</span>
                      <span style={{ fontSize:"10px", fontWeight:600, padding:"3px 8px", borderRadius:"4px", background:d.status==="complete"?"rgba(20,184,166,0.08)":d.status==="draft"?"rgba(245,158,11,0.08)":"rgba(0,0,0,0.04)", color:d.status==="complete"?C.accent:d.status==="draft"?"#f59e0b":C.muted }}>
                        {d.status==="complete"?"✓ Tamam":d.status==="draft"?"Taslak":"Arşiv"}
                      </span>
                      {d.favorite && <span style={{ color:C.accent, fontSize:"12px" }}>◎</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ — Aktivite + hızlı erişim */}
            <div>
              <h3 style={{ fontSize:"12px", fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"14px" }}>Son Aktivite</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"1px", borderRadius:"10px", overflow:"hidden", border:`1px solid ${C.border}` }}>
                {RECENT.map((r, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"12px 14px", background:C.surface, borderBottom:i<RECENT.length-1?`1px solid ${C.border}`:"none" }}>
                    <span style={{ fontSize:"13px", color:C.accent, marginTop:"1px", minWidth:"16px", textAlign:"center" }}>{r.icon}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"12px", color:C.muted }}>{r.action}</div>
                      <div style={{ fontSize:"12px", fontWeight:600, color:C.text, marginTop:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.target}</div>
                    </div>
                    <span style={{ fontSize:"10px", color:C.faint as string, flexShrink:0, marginTop:"2px" }}>{r.time}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize:"12px", fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"14px", marginTop:"24px" }}>Hızlı Erişim</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {[
                  { href:"/workspace",     icon:"✦", label:"Yeni Brief Oluştur"  },
                  { href:"/designs/aurora",icon:"◈", label:"Tasarım Galerisi"    },
                  { href:"/admin/catalog", icon:"⟁", label:"Katalog Yönetimi"   },
                ].map((a) => (
                  <Link key={a.href} href={a.href} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", borderRadius:"8px", background:C.surface, border:`1px solid ${C.border}`, textDecoration:"none", fontSize:"13px", color:C.muted, transition:"border-color 0.15s,background 0.15s,color 0.15s" }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.background=C.cardHover; e.currentTarget.style.color=C.text; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface; e.currentTarget.style.color=C.muted; }}>
                    <span style={{ color:C.accent, fontSize:"13px" }}>{a.icon}</span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
