import type { StylePack } from "@/lib/style-engine";

import type { BrandPersonalitySignal, VerticalPack } from "@/lib/strategy/types";

export type TasteProfile = {
  name: string;
  visualTone: string;
  aestheticSignals: string[];
  layoutDirection: string;
  typographyDirection: string;
  motionLevel: string;
  trustSignal: string;
  stylePack: StylePack;
};

const BASE_PROFILES: Record<VerticalPack, TasteProfile> = {
  "ai-saas": {
    name: "AI SaaS Precision",
    visualTone: "Clear, high-confidence product narrative",
    aestheticSignals: ["clarity", "credible innovation", "measured contrast"],
    layoutDirection: "Dashboard / App UI",
    typographyDirection: "Clean Modern Sans",
    motionLevel: "Smooth Apple-like Micro Animations",
    trustSignal: "Evidence blocks, integration proof, security cues",
    stylePack: {
      layout: "Dashboard / App UI",
      visual: "Swiss Design Precision",
      typography: "Clean Modern Sans",
      mood: "Innovative / Tech",
      motion: "Smooth Apple-like Micro Animations",
    },
  },
  agency: {
    name: "Agency Authority",
    visualTone: "Editorial confidence with conversion-ready hierarchy",
    aestheticSignals: ["credibility", "case-study first", "bold headlines"],
    layoutDirection: "Editorial Magazine Grid",
    typographyDirection: "Serif + Sans Editorial Mix",
    motionLevel: "Bold Section Transitions",
    trustSignal: "Client logos, outcomes, process transparency",
    stylePack: {
      layout: "Editorial Magazine Grid",
      visual: "Luxury Editorial",
      typography: "Serif + Sans Editorial Mix",
      mood: "Corporate Professional",
      motion: "Bold Section Transitions",
    },
  },
  dashboard: {
    name: "Operational Clarity",
    visualTone: "Signal-dense and controlled",
    aestheticSignals: ["information hierarchy", "monitoring confidence", "utility"],
    layoutDirection: "Sidebar Navigation Layout",
    typographyDirection: "Monospace Tech",
    motionLevel: "Minimal Static (no motion)",
    trustSignal: "Status visibility, auditability, clear actions",
    stylePack: {
      layout: "Sidebar Navigation Layout",
      visual: "Apple Inspired Clean",
      typography: "Monospace Tech",
      mood: "Trustworthy / Financial",
      motion: "Minimal Static (no motion)",
    },
  },
};

const PERSONALITY_PATCH: Record<BrandPersonalitySignal, Partial<TasteProfile>> = {
  trustworthy: {
    visualTone: "Clean and reliability-first",
    trustSignal: "Proof modules and transparent process",
  },
  premium: {
    visualTone: "Premium polish with restrained contrast",
    typographyDirection: "Luxury High Contrast Serif",
  },
  playful: {
    visualTone: "Human and approachable",
    motionLevel: "Smooth Fade + Blur transitions",
  },
  editorial: {
    layoutDirection: "Editorial Magazine Grid",
    typographyDirection: "Serif + Sans Editorial Mix",
  },
  bold: {
    visualTone: "High contrast and decisive",
    motionLevel: "Bold Section Transitions",
  },
  minimal: {
    visualTone: "Quiet and reductionist",
    layoutDirection: "Centered Minimal Layout",
  },
  technical: {
    typographyDirection: "Monospace Tech",
    trustSignal: "Technical clarity and implementation evidence",
  },
};

export function buildTasteProfile(vertical: VerticalPack, personality: BrandPersonalitySignal[]): TasteProfile {
  const base = BASE_PROFILES[vertical];
  const merged: TasteProfile = {
    ...base,
    aestheticSignals: [...base.aestheticSignals],
    stylePack: { ...base.stylePack },
  };

  personality.forEach((signal) => {
    const patch = PERSONALITY_PATCH[signal];
    if (!patch) return;
    if (patch.visualTone) merged.visualTone = patch.visualTone;
    if (patch.layoutDirection) {
      merged.layoutDirection = patch.layoutDirection;
      merged.stylePack.layout = patch.layoutDirection;
    }
    if (patch.typographyDirection) {
      merged.typographyDirection = patch.typographyDirection;
      merged.stylePack.typography = patch.typographyDirection;
    }
    if (patch.motionLevel) {
      merged.motionLevel = patch.motionLevel;
      merged.stylePack.motion = patch.motionLevel;
    }
    if (patch.trustSignal) merged.trustSignal = patch.trustSignal;
  });

  merged.aestheticSignals = Array.from(new Set([...merged.aestheticSignals, ...personality]));
  return merged;
}
