"use client";

/* ─── Teal palette (sabit) ─── */
const T = {
  primary:      "#14b8a6",
  secondary:    "#0ea5e9",
  tertiary:     "#22d3ee",
  fourth:       "#a3e635",
  gradient:     "linear-gradient(135deg,#14b8a6,#0ea5e9)",
  gradientText: "linear-gradient(135deg,#14b8a6,#22d3ee)",
  blob1: "rgba(20,184,166,0.22)",
  blob2: "rgba(14,165,233,0.18)",
  blob3: "rgba(34,211,238,0.14)",
  badgeBg:     "rgba(20,184,166,0.08)",
  badgeBorder: "rgba(20,184,166,0.22)",
  badgeColor:  "#14b8a6",
  btnShadow:   "rgba(20,184,166,0.36)",
  ctaBg:       "linear-gradient(135deg,rgba(20,184,166,0.1),rgba(14,165,233,0.1))",
  ctaBorder:   "rgba(20,184,166,0.2)",
  cardColors: [
    { accent:"rgba(20,184,166,0.13)",  border:"rgba(20,184,166,0.28)",  glyph:"#14b8a6" },
    { accent:"rgba(14,165,233,0.13)",  border:"rgba(14,165,233,0.28)",  glyph:"#0ea5e9" },
    { accent:"rgba(34,211,238,0.13)",  border:"rgba(34,211,238,0.28)",  glyph:"#22d3ee" },
    { accent:"rgba(163,230,53,0.13)",  border:"rgba(163,230,53,0.28)",  glyph:"#a3e635" },
  ],
};

const CARDS = [
  { tag:"Strategy",     title:"Brief to direction in seconds", desc:"Product interpretation, recommended scope, conversion logic and user journey — all extracted from your rough idea.",                        glyph:"✦" },
  { tag:"Architecture", title:"Pages with purpose",            desc:"Every page gets a role, content depth, priority level and suggested sections before you write any code.",                                  glyph:"⬡" },
  { tag:"Components",   title:"Scored pattern picks",          desc:"Component recommendations ranked by deterministic weighted scoring. Know exactly which pattern and why.",                                   glyph:"◎" },
  { tag:"Export",       title:"Destination-ready packs",       desc:"One-click export packs formatted for Codex, v0, Cursor, Bolt and more. Implementation ready.",                                             glyph:"⟁" },
];

export default function AuroraLanding() {
  return (
    <div style={{ minHeight:"100vh", background:"#fff", fontFamily:"'Inter','Helvetica Neue',sans-serif", overflowX:"hidden", position:"relative" }}>

      {/* Aurora blobs */}
      <div aria-hidden style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <div className="lp-float" style={{ position:"absolute", top:"-10%", right:"-5%", width:"620px", height:"620px", borderRadius:"50%", background:`radial-gradient(circle,${T.blob1} 0%,transparent 70%)`, filter:"blur(60px)" }} />
        <div className="lp-float lp-d3" style={{ position:"absolute", top:"30%", left:"-8%", width:"520px", height:"520px", borderRadius:"50%", background:`radial-gradient(circle,${T.blob2} 0%,transparent 70%)`, filter:"blur(55px)" }} />
        <div className="lp-float lp-d2" style={{ position:"absolute", bottom:"10%", right:"18%", width:"420px", height:"420px", borderRadius:"50%", background:`radial-gradient(circle,${T.blob3} 0%,transparent 70%)`, filter:"blur(50px)" }} />
      </div>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(20px)", background:"rgba(255,255,255,0.8)", borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 24px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"28px", height:"28px", borderRadius:"8px", background:T.gradient }} />
            <span style={{ fontWeight:700, fontSize:"15px", color:"#111", letterSpacing:"-0.01em" }}>Style Engine</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <a href="#features" style={{ color:"#666", fontSize:"14px", textDecoration:"none", padding:"6px 12px" }}>Features</a>
            <a href="/workspace" style={{ background:T.gradient, color:"#fff", padding:"8px 20px", borderRadius:"100px", fontSize:"14px", fontWeight:600, textDecoration:"none", boxShadow:`0 4px 14px ${T.btnShadow}` }}>
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position:"relative", zIndex:1, maxWidth:"1200px", margin:"0 auto", padding:"150px 24px 80px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
        <div>
          <div className="lp-fade-in" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:T.badgeBg, border:`1px solid ${T.badgeBorder}`, borderRadius:"100px", padding:"6px 16px", fontSize:"12px", fontWeight:600, color:T.badgeColor, marginBottom:"32px", letterSpacing:"0.04em", textTransform:"uppercase" }}>
            ✦ Pre-build intelligence
          </div>

          <h1 className="lp-fade-in lp-d1" style={{ fontSize:"clamp(40px,5.5vw,72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em", color:"#0a0a0a", margin:"0 0 24px" }}>
            Build before
            <br />
            <span style={{ backgroundImage:T.gradientText, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              you build.
            </span>
          </h1>

          <p className="lp-fade-in lp-d2" style={{ fontSize:"17px", color:"#555", lineHeight:1.65, marginBottom:"40px", maxWidth:"420px" }}>
            Turn a rough brief into strategy, architecture, component picks and implementation-ready export packs.
          </p>

          <div className="lp-fade-in lp-d3" style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="/workspace" style={{ background:T.gradient, color:"#fff", padding:"14px 28px", borderRadius:"12px", fontSize:"15px", fontWeight:700, textDecoration:"none", boxShadow:`0 8px 24px ${T.btnShadow}`, display:"inline-block" }}>
              Try it free →
            </a>
            <a href="#features" style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.08)", color:"#333", padding:"14px 28px", borderRadius:"12px", fontSize:"15px", fontWeight:600, textDecoration:"none", display:"inline-block" }}>
              See features
            </a>
          </div>

          <div className="lp-fade-in lp-d4" style={{ display:"flex", gap:"24px", marginTop:"48px", flexWrap:"wrap" }}>
            {["6 decision layers","100% traceable","5+ export targets"].map((label) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ color:T.fourth, fontSize:"14px" }}>✓</span>
                <span style={{ fontSize:"13px", color:"#666" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero card */}
        <div className="lp-right" style={{ position:"relative" }}>
          <div className="lp-float" style={{ background:"rgba(255,255,255,0.78)", backdropFilter:"blur(20px)", border:`1px solid ${T.badgeBorder}`, borderRadius:"20px", padding:"28px", boxShadow:`0 32px 64px rgba(20,184,166,0.12), 0 8px 24px rgba(0,0,0,0.06)` }}>
            <div style={{ fontSize:"11px", fontWeight:700, color:T.badgeColor, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>
              Style Engine · Decision Package
            </div>
            {[
              { label:"Strategy",     value:"✓ Extracted",    green:true  },
              { label:"Architecture", value:"✓ 7 pages",      green:true  },
              { label:"Taste Engine", value:"✓ Dark minimal", green:true  },
              { label:"Components",   value:"✓ 12 patterns",  green:true  },
              { label:"Export Pack",  value:"→ Ready for v0", green:false },
            ].map((row, idx) => (
              <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom: idx < 4 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <span style={{ fontSize:"13px", color:"#444", fontWeight:500 }}>{row.label}</span>
                <span style={{ fontSize:"12px", color: row.green ? "#14b8a6" : T.secondary, fontWeight:600 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop:"20px" }}>
              <div style={{ background:T.gradient, color:"#fff", borderRadius:"10px", padding:"12px 16px", fontSize:"13px", fontWeight:600, textAlign:"center" }}>
                Export to Codex →
              </div>
            </div>
          </div>

          <div className="lp-float lp-d2" style={{ position:"absolute", top:"-20px", right:"-20px", background:T.gradient, color:"#fff", borderRadius:"100px", padding:"8px 16px", fontSize:"12px", fontWeight:700, boxShadow:`0 8px 24px ${T.btnShadow}` }}>
            ✦ AI-powered
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" style={{ position:"relative", zIndex:1, maxWidth:"1200px", margin:"0 auto", padding:"20px 24px 120px" }}>
        <div style={{ textAlign:"center", marginBottom:"64px" }}>
          <p style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.12em", color:T.badgeColor, textTransform:"uppercase", marginBottom:"12px" }}>What you get</p>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, letterSpacing:"-0.03em", color:"#0a0a0a", margin:0 }}>Every layer of the decision.</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px" }}>
          {CARDS.map((card, i) => {
            const c = T.cardColors[i];
            return (
              <div
                key={card.title}
                style={{ background:c.accent, border:`1px solid ${c.border}`, borderRadius:"20px", padding:"28px", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 20px 40px ${c.accent}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ fontSize:"28px", color:c.glyph, marginBottom:"16px" }}>{card.glyph}</div>
                <span style={{ fontSize:"11px", fontWeight:700, color:c.glyph, letterSpacing:"0.1em", textTransform:"uppercase" }}>{card.tag}</span>
                <h3 style={{ fontSize:"17px", fontWeight:700, color:"#111", margin:"8px 0 10px", letterSpacing:"-0.02em" }}>{card.title}</h3>
                <p style={{ fontSize:"14px", color:"#555", lineHeight:1.6 }}>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, margin:"0 24px 80px", borderRadius:"28px", background:T.ctaBg, border:`1px solid ${T.ctaBorder}`, padding:"80px 40px", textAlign:"center", backdropFilter:"blur(20px)" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, letterSpacing:"-0.03em", color:"#0a0a0a", marginBottom:"16px" }}>Start with your brief.</h2>
        <p style={{ color:"#666", fontSize:"16px", marginBottom:"36px" }}>Leave with a complete, implementation-ready decision package.</p>
        <a href="/workspace" style={{ display:"inline-block", background:T.gradient, color:"#fff", padding:"16px 36px", borderRadius:"100px", fontSize:"16px", fontWeight:700, textDecoration:"none", boxShadow:`0 12px 32px ${T.btnShadow}` }}>
          Open Style Engine →
        </a>
      </section>

      <footer style={{ borderTop:"1px solid rgba(0,0,0,0.06)", padding:"24px", textAlign:"center" }}>
        <p style={{ color:"#aaa", fontSize:"12px" }}>Style Engine · Build before you build.</p>
      </footer>
    </div>
  );
}
