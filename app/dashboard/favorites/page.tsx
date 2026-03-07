"use client";

import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";

const C = {
  bg:          "#f0fdfb",
  surface:     "#ffffff",
  border:      "rgba(20,184,166,0.18)",
  borderHover: "rgba(20,184,166,0.38)",
  text:        "#0f2828",
  muted:       "#3d7070",
  accent:      "#14b8a6",
  grad:        "linear-gradient(135deg,#14b8a6,#0ea5e9)",
  topbar:      "rgba(240,253,251,0.92)",
  cardHover:   "rgba(20,184,166,0.05)",
};

const FAVORITES = [
  { id:"1", name:"AI SaaS Landing",    vertical:"ai-saas",   destination:"v0",    date:"2 saat önce"  },
  { id:"2", name:"E-Ticaret Anasayfa", vertical:"ecommerce", destination:"codex", date:"1 gün önce"   },
  { id:"5", name:"Agency Landing",     vertical:"agency",    destination:"cursor",date:"2 hafta önce" },
];

const VCOLOR: Record<string,string> = {
  "ai-saas":"#14b8a6","ecommerce":"#0ea5e9","agency":"#f43f5e",
};

export default function FavoritesPage() {
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Helvetica Neue',sans-serif", display:"flex" }}>
      <AppSidebar />
      <div style={{ marginLeft:"224px", flex:1, display:"flex", flexDirection:"column" }}>

        <header style={{ position:"sticky", top:0, zIndex:40, background:C.topbar, backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:"14px", fontWeight:600, color:C.text }}>Beğendiklerim</span>
            <span style={{ fontSize:"13px", color:C.muted, marginLeft:"8px" }}>/ {FAVORITES.length} proje</span>
          </div>
          <Link href="/workspace" style={{ display:"flex", alignItems:"center", gap:"7px", background:C.grad, color:"#fff", padding:"7px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:700, textDecoration:"none", boxShadow:"0 4px 12px rgba(20,184,166,0.25)" }}>
            <span>✦</span> Yeni Brief
          </Link>
        </header>

        <main style={{ padding:"32px", flex:1 }}>
          {FAVORITES.length === 0 ? (
            <div style={{ padding:"80px 32px", textAlign:"center", border:`1px dashed ${C.border}`, borderRadius:"12px" }}>
              <p style={{ color:C.muted, fontSize:"14px", marginBottom:"16px" }}>Henüz beğenilen proje yok.</p>
              <Link href="/workspace" style={{ color:C.accent, fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Brief oluştur →</Link>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {FAVORITES.map((d) => (
                <div key={d.id}
                  style={{ display:"flex", alignItems:"center", gap:"16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px 16px", cursor:"pointer", transition:"border-color 0.15s,background 0.15s,box-shadow 0.15s", boxShadow:"0 1px 3px rgba(20,184,166,0.06)" }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.background=C.cardHover; e.currentTarget.style.boxShadow="0 4px 12px rgba(20,184,166,0.1)"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface; e.currentTarget.style.boxShadow="0 1px 3px rgba(20,184,166,0.06)"; }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:`${VCOLOR[d.vertical]??"#14b8a6"}15`, border:`1px solid ${VCOLOR[d.vertical]??"#14b8a6"}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:VCOLOR[d.vertical]??"#14b8a6" }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"14px", fontWeight:600, color:C.text, marginBottom:"2px" }}>{d.name}</div>
                    <div style={{ fontSize:"11px", color:C.muted }}>{d.vertical} · {d.date}</div>
                  </div>
                  <span style={{ color:C.accent, fontSize:"16px" }}>◎</span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
