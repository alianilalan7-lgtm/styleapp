"use client";

import { AppSidebar } from "@/components/app-sidebar";

const C = {
  bg:          "#f0fdfb",
  surface:     "#ffffff",
  border:      "rgba(20,184,166,0.18)",
  borderHover: "rgba(20,184,166,0.38)",
  text:        "#0f2828",
  muted:       "#3d7070",
  accent:      "#14b8a6",
  topbar:      "rgba(240,253,251,0.92)",
  cardHover:   "rgba(20,184,166,0.05)",
};

const ARCHIVE = [
  { id:"6", name:"Blog & İçerik", vertical:"blog", destination:"v0", date:"3 hafta önce", archivedAt:"2 hafta önce" },
];

export default function ArchivePage() {
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Helvetica Neue',sans-serif", display:"flex" }}>
      <AppSidebar />
      <div style={{ marginLeft:"224px", flex:1, display:"flex", flexDirection:"column" }}>

        <header style={{ position:"sticky", top:0, zIndex:40, background:C.topbar, backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:"14px", fontWeight:600, color:C.text }}>Arşiv</span>
            <span style={{ fontSize:"13px", color:C.muted, marginLeft:"8px" }}>/ {ARCHIVE.length} proje</span>
          </div>
        </header>

        <main style={{ padding:"32px", flex:1 }}>
          <p style={{ fontSize:"13px", color:C.muted, marginBottom:"20px" }}>
            Arşivlenen projeler burada. İstediğin zaman geri alabilirsin.
          </p>

          {ARCHIVE.length === 0 ? (
            <div style={{ padding:"80px 32px", textAlign:"center", border:`1px dashed ${C.border}`, borderRadius:"12px" }}>
              <p style={{ color:C.muted, fontSize:"14px" }}>Arşiv boş.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {ARCHIVE.map((d) => (
                <div key={d.id}
                  style={{ display:"flex", alignItems:"center", gap:"16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px 16px", opacity:0.75, transition:"opacity 0.15s,border-color 0.15s" }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.borderColor=C.borderHover; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.opacity="0.75"; e.currentTarget.style.borderColor=C.border; }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:"rgba(20,184,166,0.06)", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:"14px", color:C.muted }}>⊡</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"14px", fontWeight:600, color:C.text, marginBottom:"2px" }}>{d.name}</div>
                    <div style={{ fontSize:"11px", color:C.muted }}>{d.vertical} · Arşivlendi: {d.archivedAt}</div>
                  </div>
                  <button style={{ padding:"6px 14px", borderRadius:"6px", border:`1px solid ${C.border}`, background:"transparent", color:C.accent, fontSize:"11px", fontWeight:600, cursor:"pointer", transition:"border-color 0.15s,background 0.15s" }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=C.borderHover; e.currentTarget.style.background="rgba(20,184,166,0.06)"; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background="transparent"; }}>
                    Geri al
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop:"32px", padding:"16px", background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:"10px" }}>
            <p style={{ fontSize:"12px", color:"#b45309", margin:0 }}>
              ⊡ Arşivlenen projeler 90 gün sonra kalıcı olarak silinir.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
