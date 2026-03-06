import type { Locale } from "./i18n";

export type Pillar = "Layout" | "Visual" | "Typography" | "Mood" | "Motion";

export type StylePack = {
  layout: string;
  visual: string;
  typography: string;
  mood: string;
  motion: string;
};

export type PromptPreset = "GPT" | "Claude" | "v0";

export const PILLARS: Pillar[] = [
  "Layout",
  "Visual",
  "Typography",
  "Mood",
  "Motion",
];

export const OPTIONS: Record<Pillar, string[]> = {
  Layout: [
    "Bento Grid",
    "Split Screen",
    "Asymmetric Grid",
    "Editorial Magazine Grid",
    "Fullscreen Hero + Sections",
    "Sidebar Navigation Layout",
    "Card Based Modular",
    "Long Scroll Storytelling",
    "Dashboard / App UI",
    "Masonry Creative Grid",
    "Centered Minimal Layout",
    "Horizontal Scroll Sections",
  ],
  Visual: [
    "Cinematic Dark",
    "Luxury Editorial",
    "Scandinavian Minimal",
    "Brutalist Web",
    "Glassmorphism",
    "Neo-Futuristic Tech",
    "Soft Pastel Creative",
    "Apple Inspired Clean",
    "Swiss Design Precision",
    "Cyberpunk Neon",
    "Vintage Retro",
    "Playful Illustration",
    "High Contrast Black & White",
    "3D Render Heavy",
    "Minimal with Massive Typography",
  ],
  Typography: [
    "Elegant Serif Dominant",
    "Bold Condensed Headlines",
    "Experimental Display Fonts",
    "Clean Modern Sans",
    "Monospace Tech",
    "Serif + Sans Editorial Mix",
    "Ultra Thin Minimal",
    "Oversized Hero Type",
    "Brutalist Raw Type",
    "Luxury High Contrast Serif",
  ],
  Mood: [
    "Premium / Luxury",
    "Innovative / Tech",
    "Trustworthy / Financial",
    "Artistic / Creative",
    "Calm / Wellness",
    "Bold / Disruptive",
    "Friendly / Human",
    "Energetic / Sporty",
    "Corporate Professional",
    "Experimental Future",
  ],
  Motion: [
    "Smooth Apple-like Micro Animations",
    "Scroll-triggered Storytelling",
    "Parallax Depth",
    "Bold Section Transitions",
    "Minimal Static (no motion)",
    "3D Hover Interaction",
    "Smooth Fade + Blur transitions",
    "Cinematic Scroll Zoom",
    "Magnetic Buttons",
    "Brutalist Sharp Motion",
  ],
};

export type Concept = {
  sections: string[];
  components: string[];
  colorDirection: string;
  typeScale: string;
  motionNotes: string[];
};

export type IdeaBoard = {
  moodboard: Array<{ title: string; cue: string }>;
  wireframe: Array<{ section: string; blocks: string[] }>;
  artDirection: string[];
};

export type BrandDirection = {
  id: string;
  name: string;
  summary: string;
  pack: StylePack;
};

export const PROMPT_PRESETS: PromptPreset[] = ["GPT", "Claude", "v0"];

const BRAND_TEMPLATES: BrandDirection[] = [
  {
    id: "luxury-editorial",
    name: "Luks Editorial Cizgi",
    summary: "Prestij odakli markalar icin rafine tipografi ve premium ritim.",
    pack: {
      layout: "Editorial Magazine Grid",
      visual: "Luxury Editorial",
      typography: "Luxury High Contrast Serif",
      mood: "Premium / Luxury",
      motion: "Smooth Fade + Blur transitions",
    },
  },
  {
    id: "neo-tech",
    name: "Yeni Nesil Teknoloji Cizgisi",
    summary: "Urun ve inovasyon anlatimini temiz, hizli ve etkili sunar.",
    pack: {
      layout: "Dashboard / App UI",
      visual: "Neo-Futuristic Tech",
      typography: "Monospace Tech",
      mood: "Innovative / Tech",
      motion: "Smooth Apple-like Micro Animations",
    },
  },
  {
    id: "trust-finance",
    name: "Guven Odakli Finans Cizgisi",
    summary: "Kurumsal guven, okunabilirlik ve net eylem akisi sunar.",
    pack: {
      layout: "Sidebar Navigation Layout",
      visual: "Swiss Design Precision",
      typography: "Clean Modern Sans",
      mood: "Trustworthy / Financial",
      motion: "Minimal Static (no motion)",
    },
  },
  {
    id: "creative-brand",
    name: "Yaratici Marka Cizgisi",
    summary: "Farkliligi one cikarir, imza bilesenlerle kimlik guclendirir.",
    pack: {
      layout: "Asymmetric Grid",
      visual: "Playful Illustration",
      typography: "Experimental Display Fonts",
      mood: "Artistic / Creative",
      motion: "Bold Section Transitions",
    },
  },
  {
    id: "wellness-calm",
    name: "Sade Wellness Cizgisi",
    summary: "Sakin ritim, yumusak gecler ve guven veren dil kullanir.",
    pack: {
      layout: "Centered Minimal Layout",
      visual: "Scandinavian Minimal",
      typography: "Ultra Thin Minimal",
      mood: "Calm / Wellness",
      motion: "Smooth Fade + Blur transitions",
    },
  },
  {
    id: "bold-disruptive",
    name: "Disruptive Etki Cizgisi",
    summary: "Cesur mesajlar ve sert gecislerle dikkat ceker.",
    pack: {
      layout: "Split Screen",
      visual: "Brutalist Web",
      typography: "Brutalist Raw Type",
      mood: "Bold / Disruptive",
      motion: "Brutalist Sharp Motion",
    },
  },
  {
    id: "friendly-human",
    name: "Insani ve Sicak Cizgi",
    summary: "Topluluk ve kullanici yakinligi odakli marka dili sunar.",
    pack: {
      layout: "Card Based Modular",
      visual: "Soft Pastel Creative",
      typography: "Serif + Sans Editorial Mix",
      mood: "Friendly / Human",
      motion: "Smooth Apple-like Micro Animations",
    },
  },
  {
    id: "sporty-energy",
    name: "Yuksek Enerji Cizgisi",
    summary: "Hiz, aksiyon ve performans algisini guclendirir.",
    pack: {
      layout: "Long Scroll Storytelling",
      visual: "High Contrast Black & White",
      typography: "Bold Condensed Headlines",
      mood: "Energetic / Sporty",
      motion: "Cinematic Scroll Zoom",
    },
  },
  {
    id: "corporate-clean",
    name: "Modern Kurumsal Cizgi",
    summary: "B2B markalar icin profesyonel, sade ve olceklenebilir yapi.",
    pack: {
      layout: "Fullscreen Hero + Sections",
      visual: "Apple Inspired Clean",
      typography: "Clean Modern Sans",
      mood: "Corporate Professional",
      motion: "Smooth Apple-like Micro Animations",
    },
  },
  {
    id: "future-experimental",
    name: "Deneysel Gelecek Cizgisi",
    summary: "Markaya yeni nesil, cesur ve farkli bir durus kazandirir.",
    pack: {
      layout: "Masonry Creative Grid",
      visual: "Cyberpunk Neon",
      typography: "Oversized Hero Type",
      mood: "Experimental Future",
      motion: "3D Hover Interaction",
    },
  },
  {
    id: "cinematic-story",
    name: "Sinematik Hikaye Cizgisi",
    summary: "Anlati odakli markalar icin sahne sahne deneyim olusturur.",
    pack: {
      layout: "Long Scroll Storytelling",
      visual: "Cinematic Dark",
      typography: "Elegant Serif Dominant",
      mood: "Premium / Luxury",
      motion: "Scroll-triggered Storytelling",
    },
  },
  {
    id: "retro-persona",
    name: "Retro Karakter Cizgisi",
    summary: "Nostalji ve karakter odakli markalar icin duygusal ton sunar.",
    pack: {
      layout: "Horizontal Scroll Sections",
      visual: "Vintage Retro",
      typography: "Serif + Sans Editorial Mix",
      mood: "Artistic / Creative",
      motion: "Parallax Depth",
    },
  },
];

const TEMPLATE_KEYWORDS: Record<string, string[]> = {
  "luxury-editorial": ["luks", "premium", "elit", "saat", "muccevher", "moda", "beauty", "kozmetik"],
  "neo-tech": ["yapay zeka", "ai", "saas", "yazilim", "startup", "urun", "teknoloji", "platform"],
  "trust-finance": ["finans", "bank", "sigorta", "hukuk", "guven", "yatirim"],
  "creative-brand": ["yaratici", "tasarim", "ajans", "sanat", "portfolyo", "creator"],
  "wellness-calm": ["wellness", "saglik", "meditasyon", "spa", "minimal", "sade", "dogal"],
  "bold-disruptive": ["disruptive", "cesur", "asi", "genz", "street", "farkli"],
  "friendly-human": ["topluluk", "egitim", "ebeveyn", "cocuk", "insani", "samimi", "arkadas"],
  "sporty-energy": ["spor", "fitness", "performans", "hiz", "enerji", "antrenman"],
  "corporate-clean": ["kurumsal", "b2b", "profesyonel", "sirket", "cozum ortagi", "enterprise"],
  "future-experimental": ["futuristik", "metaverse", "game", "oyun", "deneysel", "gelecek"],
  "cinematic-story": ["hikaye", "film", "sinematik", "duygusal", "narrative"],
  "retro-persona": ["retro", "vintage", "nostalji", "analog", "el yapimi"],
};

function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePack(
  locked: Partial<Record<Pillar, boolean>>,
  current?: StylePack,
): StylePack {
  const layout = locked.Layout && current ? current.layout : pickRandom(OPTIONS.Layout);
  const visual = locked.Visual && current ? current.visual : pickRandom(OPTIONS.Visual);
  const typography =
    locked.Typography && current
      ? current.typography
      : pickRandom(OPTIONS.Typography);
  const mood = locked.Mood && current ? current.mood : pickRandom(OPTIONS.Mood);
  const motion = locked.Motion && current ? current.motion : pickRandom(OPTIONS.Motion);

  return { layout, visual, typography, mood, motion };
}

export function buildPrompt(pack: StylePack, locale: Locale = "en") {
  if (locale === "tr") {
    return `Asagidaki stil kombinasyonuna gore modern bir web sitesi tasarla:

Yerlesim stili: ${pack.layout}
Gorsel yon: ${pack.visual}
Tipografi stili: ${pack.typography}
Marka mood'u: ${pack.mood}
Hareket stili: ${pack.motion}

Sabit kurallar:
- Jenerik SaaS kaliplari ve klişe hero bolumlerinden kacinin.
- Guclu hiyerarsi, bilincli bosluk kullanimi ve ayirt edici bir grid kurun.
- Gorsel kimligi destekleyen 2-3 imza bilesen tasarlayin.
- Mobil/tablet/masaustu icin responsive davraniş tanimlayin.

Teslim:
- Ana sayfa bolum plani ve basliklari
- Bilesen listesi (kart, nav, CTA vb.)
- Renk yonu (kesin hex degil)
- Tipografi olcegi (H1/H2/body)
- Hareket notlari (ne, nasil canlanacak)`;
  }

  return `Design a modern website using the following style combination:

Layout style: ${pack.layout}
Visual direction: ${pack.visual}
Typography style: ${pack.typography}
Brand mood: ${pack.mood}
Motion style: ${pack.motion}

Hard rules:
- Avoid generic SaaS layouts and cliche hero sections.
- Use strong hierarchy, deliberate whitespace, and a distinctive grid.
- Create 2-3 signature components that reinforce the visual identity.
- Provide responsive behavior for mobile/tablet/desktop.

Deliver:
- Homepage layout with section titles
- Component list (cards, nav, CTA, etc.)
- Color direction (not exact hex)
- Type scale direction (H1/H2/body)
- Motion notes (what animates and how)`;
}

function buildBrandBriefLine(brandBrief: string | undefined, locale: Locale) {
  const clean = brandBrief?.trim();
  if (locale === "tr") {
    if (!clean) return "Marka kimligi briefi: Saglanmadi.";
    return `Marka kimligi briefi:\n${clean}\n\nBu briefi ton, dil ve gorsel kararlar icin sabit kisit olarak kullan.`;
  }

  if (!clean) return "Brand identity brief: Not provided.";
  return `Brand identity brief:\n${clean}\n\nUse this brief as a hard constraint for tone and visual choices.`;
}

export function buildPromptByPreset(
  pack: StylePack,
  preset: PromptPreset,
  brandBrief?: string,
  locale: Locale = "en",
) {
  const briefLine = buildBrandBriefLine(brandBrief, locale);

  if (preset === "Claude") {
    if (locale === "tr") {
      return `Sen deneyimli bir web tasarimcisin.

Gorev:
Asagidaki kisitlara gore bir web sitesi yonu olustur.

Girdiler:
- Yerlesim: ${pack.layout}
- Gorsel: ${pack.visual}
- Tipografi: ${pack.typography}
- Mood: ${pack.mood}
- Hareket: ${pack.motion}

${briefLine}

Cikti formati:
1) Ana sayfa yapisi ve bolum amaci
2) 3 imza bilesen
3) Renk yonu ve gerekcesi
4) Tipografi olcegi (H1/H2/body)
5) Bolum bazinda hareket davranisi
6) Mobil uyarlama notlari

Jenerik SaaS kaliplari ve stok hero klişelerinden kacinin.`;
    }

    return `You are a senior web designer.

Task:
Create a website direction with these constraints.

Inputs:
- Layout: ${pack.layout}
- Visual: ${pack.visual}
- Typography: ${pack.typography}
- Mood: ${pack.mood}
- Motion: ${pack.motion}

${briefLine}

Output format:
1) Homepage structure with section purpose
2) 3 signature components
3) Color direction and rationale
4) Type scale (H1/H2/body)
5) Motion behavior by section
6) Mobile adaptation notes

Avoid generic SaaS patterns and stock hero clichés.`;
  }

  if (preset === "v0") {
    if (locale === "tr") {
      return `Uretim kalitesinde Next.js + Tailwind landing page konsepti tasarla.

Stil paketi:
- layout: ${pack.layout}
- visual: ${pack.visual}
- typography: ${pack.typography}
- mood: ${pack.mood}
- motion: ${pack.motion}

${briefLine}

Gereksinimler:
- Ayirt edici grid ve guclu hiyerarsi
- 2-3 marka imza modulu
- Responsive: mobil/tablet/masaustu
- Erisilebilir kontrast ve focus durumlari

Dondur:
- sayfa bolumleri
- bilesen envanteri
- tasarim token yonu
- animasyon notlari`;
    }

    return `Build a production-ready Next.js + Tailwind landing page concept.

Style pack:
- layout: ${pack.layout}
- visual: ${pack.visual}
- typography: ${pack.typography}
- mood: ${pack.mood}
- motion: ${pack.motion}

${briefLine}

Requirements:
- Distinctive grid and hierarchy
- 2-3 branded signature modules
- Responsive: mobile/tablet/desktop
- Accessible contrasts and focus states

Return:
- page sections
- component inventory
- design tokens direction
- animation notes`;
  }

  const basePrompt = buildPrompt(pack, locale);
  return `${basePrompt}

${briefLine}`;
}

export function buildConcept(pack: StylePack, locale: Locale = "en"): Concept {
  const layoutSections: Record<string, string[]> = {
    "Bento Grid": [
      "Signal Hero",
      "Feature Mosaic",
      "Proof Snapshots",
      "Conversion Strip",
    ],
    "Long Scroll Storytelling": [
      "Narrative Intro",
      "Problem Arc",
      "Solution Frames",
      "Action Closing",
    ],
    "Sidebar Navigation Layout": [
      "Pinned Navigation Rail",
      "Context Header",
      "Content Modules",
      "Action Footer",
    ],
    "Dashboard / App UI": [
      "Status Overview",
      "Insight Widgets",
      "Recent Activity",
      "Command Panel",
    ],
  };

  const defaultSections =
    locale === "tr"
      ? [
          "Hero Mesaji",
          "Temel Deger Onermesi",
          "Imza Bloklar",
          "Sosyal Kanit",
          "Ana Cagri Alani",
        ]
      : [
          "Hero Statement",
          "Core Value",
          "Signature Blocks",
          "Social Proof",
          "Primary CTA",
        ];

  const visualToColor: Record<string, string> = {
    "Cinematic Dark": "Near-black base, steel blues, low-sat highlights",
    "Luxury Editorial": "Warm neutrals, soft gold accent, rich ink tones",
    "Scandinavian Minimal": "Bone white, pale grays, muted sea green accents",
    "Cyberpunk Neon": "Deep navy base, electric cyan and coral accents",
    "Vintage Retro": "Paper beige, burnt orange, faded olive details",
    "Swiss Design Precision": "Neutral base, strict red accents, clear contrast",
    "Brutalist Web": "Raw grayscale with one aggressive accent color",
  };

  const typeScale: Record<string, string> = {
    "Elegant Serif Dominant": "H1 64-72 / H2 38-44 / Body 18-20",
    "Bold Condensed Headlines": "H1 72-88 / H2 42-48 / Body 16-18",
    "Monospace Tech": "H1 56-64 / H2 30-36 / Body 15-17",
    "Ultra Thin Minimal": "H1 52-60 / H2 30-34 / Body 17-18",
    "Oversized Hero Type": "H1 88-108 / H2 42-48 / Body 18-20",
    "Brutalist Raw Type": "H1 70-82 / H2 34-40 / Body 17-19",
  };

  const motionNotesMap: Record<string, string[]> = {
    "Smooth Apple-like Micro Animations": [
      "Use 180-260ms ease curves for hover/focus.",
      "Reveal cards with subtle opacity + y-axis transitions.",
    ],
    "Scroll-triggered Storytelling": [
      "Sequence content on scroll checkpoints.",
      "Lock key panels briefly to emphasize transitions.",
    ],
    "Minimal Static (no motion)": [
      "Use near-static UI and rely on spacing hierarchy.",
      "Only keep essential focus indicators.",
    ],
    "Brutalist Sharp Motion": [
      "Use instant state jumps and hard cuts.",
      "Avoid blur, use strong translate and clipping reveals.",
    ],
  };

  const sections = layoutSections[pack.layout] ?? defaultSections;
  const components = [
    `${pack.layout} navigation system`,
    `${pack.visual} hero composition`,
    `${pack.typography} headline module`,
    `${pack.mood} CTA card`,
  ];

  return {
    sections,
    components,
    colorDirection:
      visualToColor[pack.visual] ??
      (locale === "tr"
        ? "Nötr bir temel ve disiplinli bir vurgu renk ailesi kullan."
        : "Neutral base with one disciplined accent family"),
    typeScale:
      typeScale[pack.typography] ??
      (locale === "tr"
        ? "H1 60-72 / H2 34-42 / Body 17-19, ritmi net kur."
        : "H1 60-72 / H2 34-42 / Body 17-19 with clear rhythm"),
    motionNotes: motionNotesMap[pack.motion] ?? [
      locale === "tr"
        ? `Etkilesimleri su hareket dili etrafinda birlestir: ${pack.motion}.`
        : `Anchor interactions around: ${pack.motion}.`,
      locale === "tr"
        ? "Liste, kart ve CTA gecislerinde hareket tutarliligini koru."
        : "Keep motion consistent across list, card, and CTA transitions.",
    ],
  };
}

export function buildIdeaBoard(pack: StylePack, locale: Locale = "en"): IdeaBoard {
  const concept = buildConcept(pack, locale);
  return {
    moodboard: [
      {
        title: `${pack.visual} Atmosphere`,
        cue:
          locale === "tr"
            ? "Isik, doku ve kontrast odakli 3 referans topla."
            : "Collect 3 references focused on lighting, textures, and contrast.",
      },
      {
        title: `${pack.typography} Type Voice`,
        cue:
          locale === "tr"
            ? `Baslik ritmini ${pack.mood.toLowerCase()} konumlandirmasiyla eslestir.`
            : `Match headline rhythm to ${pack.mood.toLowerCase()} positioning.`,
      },
      {
        title: `${pack.motion} Interaction`,
        cue:
          locale === "tr"
            ? "Bolum gecisleri ve CTA hover durumlari icin bir imza hareket tanimla."
            : "Define one signature transition for section changes and CTA hovers.",
      },
    ],
    wireframe: concept.sections.map((section) => ({
      section,
      blocks:
        locale === "tr"
          ? ["Baslik", "Destekleyici metin", "Ana eylem alani"]
          : ["Headline", "Supporting copy", "Primary action"],
    })),
    artDirection: [
      locale === "tr"
        ? `Ana sanat ekseni: ${pack.visual}`
        : `Primary art axis: ${pack.visual}`,
      locale === "tr"
        ? `Anlati ekseni: ${pack.layout}`
        : `Narrative axis: ${pack.layout}`,
      locale === "tr"
        ? `Marka algisi: ${pack.mood}`
        : `Brand perception: ${pack.mood}`,
    ],
  };
}

export function getPackValue(pack: StylePack, pillar: Pillar) {
  const map: Record<Pillar, keyof StylePack> = {
    Layout: "layout",
    Visual: "visual",
    Typography: "typography",
    Mood: "mood",
    Motion: "motion",
  };
  return pack[map[pillar]];
}

export function setPackValue(
  pack: StylePack,
  pillar: Pillar,
  value: string,
): StylePack {
  const map: Record<Pillar, keyof StylePack> = {
    Layout: "layout",
    Visual: "visual",
    Typography: "typography",
    Mood: "mood",
    Motion: "motion",
  };
  return {
    ...pack,
    [map[pillar]]: value,
  };
}

function hashText(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function recommendBrandDirections(
  brandBrief: string,
  count = 5,
): BrandDirection[] {
  const safeCount = Math.max(0, Math.min(count, BRAND_TEMPLATES.length));
  if (safeCount === 0) return [];

  const normalized = brandBrief.trim().toLocaleLowerCase("tr-TR");
  const baseSeed = hashText(normalized || "style-engine");

  const scored = BRAND_TEMPLATES.map((template, index) => {
    const keywords = TEMPLATE_KEYWORDS[template.id] ?? [];
    const score = keywords.reduce(
      (total, keyword) => (normalized.includes(keyword) ? total + 1 : total),
      0,
    );
    const tiebreaker = (baseSeed + index * 37) % 97;
    return { template, score, tiebreaker };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.tiebreaker - a.tiebreaker;
  });

  const selected: BrandDirection[] = [];
  const used = new Set<string>();

  if (scored[0]?.score > 0) {
    for (const item of scored) {
      if (selected.length >= safeCount) break;
      if (used.has(item.template.id)) continue;
      selected.push(item.template);
      used.add(item.template.id);
    }
  }

  let pointer = baseSeed % BRAND_TEMPLATES.length;
  while (selected.length < safeCount) {
    const candidate = BRAND_TEMPLATES[pointer];
    if (!used.has(candidate.id)) {
      selected.push(candidate);
      used.add(candidate.id);
    }
    // +1 guarantees we eventually visit every template and never loop forever.
    pointer = (pointer + 1) % BRAND_TEMPLATES.length;
  }

  return selected.slice(0, safeCount).map((template, index) => ({
    ...template,
    id: `${template.id}-${index + 1}`,
  }));
}
