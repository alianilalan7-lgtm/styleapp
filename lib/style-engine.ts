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

export const PROMPT_PRESETS: PromptPreset[] = ["GPT", "Claude", "v0"];

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

export function buildPrompt(pack: StylePack) {
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

export function buildPromptByPreset(pack: StylePack, preset: PromptPreset) {
  if (preset === "Claude") {
    return `You are a senior web designer.

Task:
Create a website direction with these constraints.

Inputs:
- Layout: ${pack.layout}
- Visual: ${pack.visual}
- Typography: ${pack.typography}
- Mood: ${pack.mood}
- Motion: ${pack.motion}

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
    return `Build a production-ready Next.js + Tailwind landing page concept.

Style pack:
- layout: ${pack.layout}
- visual: ${pack.visual}
- typography: ${pack.typography}
- mood: ${pack.mood}
- motion: ${pack.motion}

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

  return buildPrompt(pack);
}

export function buildConcept(pack: StylePack): Concept {
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

  const defaultSections = [
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
    colorDirection: visualToColor[pack.visual] ?? "Neutral base with one disciplined accent family",
    typeScale:
      typeScale[pack.typography] ?? "H1 60-72 / H2 34-42 / Body 17-19 with clear rhythm",
    motionNotes: motionNotesMap[pack.motion] ?? [
      `Anchor interactions around: ${pack.motion}.`,
      "Keep motion consistent across list, card, and CTA transitions.",
    ],
  };
}

export function buildIdeaBoard(pack: StylePack): IdeaBoard {
  const concept = buildConcept(pack);
  return {
    moodboard: [
      {
        title: `${pack.visual} Atmosphere`,
        cue: `Collect 3 references focused on lighting, textures, and contrast.`,
      },
      {
        title: `${pack.typography} Type Voice`,
        cue: `Match headline rhythm to ${pack.mood.toLowerCase()} positioning.`,
      },
      {
        title: `${pack.motion} Interaction`,
        cue: "Define one signature transition for section changes and CTA hovers.",
      },
    ],
    wireframe: concept.sections.map((section) => ({
      section,
      blocks: ["Headline", "Supporting copy", "Primary action"],
    })),
    artDirection: [
      `Primary art axis: ${pack.visual}`,
      `Narrative axis: ${pack.layout}`,
      `Brand perception: ${pack.mood}`,
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
