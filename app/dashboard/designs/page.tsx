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

const ALL_DESIGNS = [
  { id:"1", name:"AI SaaS Landing",    vertical:"ai-saas",   destination:"v0",    date:"2 saat önce",   status:"complete", favorite:true  },
  { id:"2", name:"E-Ticaret Anasayfa", vertical:"ecommerce", destination:"codex", date:"1 gün önce",    status:"complete", favorite:true  },
  { id:"3", name:"Portfolio Sitesi",   vertical:"portfolio", destination:"bolt",  date:"3 gün önce",    status:"draft",    favorite:false },
  { id:"4", name:"Fintech Dashboard",  vertical:"fintech",   destination:"codex", date:"1 hafta önce",  status:"complete", favorite:false },
  { id:"5", name:"Agency Landing",     vertical:"agency",    destination:"cursor",date:"2 hafta önce",  status:"complete", favorite:true  },
  { id:"6", name:"Blog & İçerik",      vertical:"blog",      destination:"v0",    date:"3 hafta önce",  status:"archive",  favorite:false },
];

const VCOLOR: Record<string,string> = {
  "ai-saas":"#14b8a6","ecommerce":"#0ea5e9","portfolio":"#a855f7",
  "fintech":"#f59e0b","agency":"#f43f5e","blog":"#a3e635",
};

export default function DesignsPage() {
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Helvetica Neue',sans-serif", display:"flex" }}>
      <AppSidebar />
      <div style={{ marginLeft:"224px", flex:1, display:"flex", flexDirection:"column" }}>

        <header style={{ position:"sticky", top:0, zIndex:40, background:C.topbar, backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:"14px", fontWeight:600, color:C.text }}>Tasarımlarım</span>
            <span style={{ fontSize:"13px", color:C.muted, marginLeft:"8px" }}>/ {ALL_DESIGNS.length} proje</span>
          </div>
          <Link href="/workspace" style={{ display:"flex", alignItems:"center", gap:"7px", background:C.grad, color:"#fff", padding:"7px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:700, textDecoration:"none", boxShadow:"0 4px 12px rgba(20,184,166,0.25)" }}>
            <span>✦</span> Yeni Brief
          </Link>
        </header>

        <main style={{ padding:"32px", flex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
            {ALL_DESIGNS.map((d) => (
              <div key={d.id}
                style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"20px", cursor:"pointer", transition:"border-color 0.15s,transform 0.15s,box-shadow 0.15s", boxShadow:"0 1px 4px rgba(20,184,166,0.08)" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(20,184,166,0.12)"; e.currentTarget.style.background=C.cardHover; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(20,184,166,0.08)"; e.currentTarget.style.background=C.surface; }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:`${VCOLOR[d.vertical]??"#14b8a6"}15`, border:`1px solid ${VCOLOR[d.vertical]??"#14b8a6"}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:VCOLOR[d.vertical]??"#14b8a6" }} />
                  </div>
                  {d.favorite && <span style={{ color:C.accent, fontSize:"14px" }}>◎</span>}
                </div>
                <h3 style={{ fontSize:"15px", fontWeight:700, color:C.text, margin:"0 0 4px", letterSpacing:"-0.01em" }}>{d.name}</h3>
                <p style={{ fontSize:"12px", color:C.muted, margin:"0 0 14px" }}>{d.vertical} · {d.date}</p>
                <div style={{ display:"flex", gap:"6px" }}>
                  <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"4px", background:"rgba(20,184,166,0.08)", color:C.accent, letterSpacing:"0.06em", textTransform:"uppercase" }}>{d.destination}</span>
                  <span style={{ fontSize:"10px", fontWeight:600, padding:"3px 8px", borderRadius:"4px", background:d.status==="complete"?"rgba(20,184,166,0.08)":d.status==="draft"?"rgba(245,158,11,0.08)":"rgba(0,0,0,0.04)", color:d.status==="complete"?C.accent:d.status==="draft"?"#f59e0b":C.muted }}>
                    {d.status==="complete"?"✓ Tamam":d.status==="draft"?"Taslak":"Arşiv"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
