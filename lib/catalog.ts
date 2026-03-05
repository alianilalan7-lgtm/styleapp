export type SiteType =
  | "marketing"
  | "saas"
  | "agency"
  | "portfolio"
  | "ecommerce"
  | "dashboard"
  | "blog"
  | "fintech";

export type PageType =
  | "home"
  | "pricing"
  | "security"
  | "faq"
  | "contact"
  | "about"
  | "features"
  | "integrations"
  | "blog"
  | "case-studies"
  | "portfolio"
  | "shop"
  | "product"
  | "docs"
  | "login";

export type RegistryCategory =
  | "hero"
  | "navbar"
  | "footer"
  | "pricing"
  | "faq"
  | "cta"
  | "features"
  | "dashboard"
  | "auth"
  | "form"
  | "modal"
  | "table"
  | "carousel"
  | "testimonials"
  | "portfolio"
  | "blog"
  | "contact"
  | "ecommerce";

export type FrameworkCategory =
  | "ui-primitive"
  | "headless-component"
  | "styled-component"
  | "animation"
  | "data-display"
  | "form-system"
  | "navigation-pattern";

export type FrameworkPreference =
  | "auto"
  | "nextjs"
  | "accessibility"
  | "headless"
  | "animation";

export type ComponentDepthPreference = "starter" | "balanced" | "deep";

export type RegistryItem = {
  id: string;
  source: string;
  libraryName: string;
  componentName: string;
  componentType: "block" | "component" | "pattern";
  category: RegistryCategory;
  tags: string[];
  framework: string;
  reactCompatible: boolean;
  stylingSystem: string;
  license: "free";
  useCases: string[];
  industryFit: SiteType[];
  toneFit: string[];
  stylePackFit: string[];
  pageTypeFit: PageType[];
  complexity: "low" | "medium" | "high";
  accessibilityLevel: "good" | "strong";
  url: string;
  previewImage: string;
  lastIndexedAt: string;
};

export type FrameworkLibrary = {
  id: string;
  name: string;
  type: FrameworkCategory;
  source: string;
  framework: string;
  license: "free";
  bestFor: SiteType[];
  tags: string[];
  pairings: string[];
  constraints: string[];
  url: string;
};

export const SITE_TYPE_OPTIONS: SiteType[] = [
  "marketing",
  "saas",
  "agency",
  "portfolio",
  "ecommerce",
  "dashboard",
  "blog",
  "fintech",
];

export const PAGE_TYPE_OPTIONS: PageType[] = [
  "home",
  "pricing",
  "security",
  "faq",
  "contact",
  "about",
  "features",
  "integrations",
  "blog",
  "case-studies",
  "portfolio",
  "shop",
  "product",
  "docs",
  "login",
];

export const FREE_SOURCES = [
  "registry.directory",
  "shadcn",
  "Magic UI",
  "HeroUI",
  "React Aria",
  "Flowbite",
  "HyperUI",
  "Radix UI",
  "Headless UI",
  "Embla",
  "TanStack",
] as const;

export const DEFAULT_PAGE_MAP: Record<SiteType, PageType[]> = {
  marketing: ["home", "features", "pricing", "faq", "contact"],
  saas: ["home", "features", "pricing", "integrations", "contact"],
  agency: ["home", "about", "case-studies", "contact", "blog"],
  portfolio: ["home", "portfolio", "about", "contact", "blog"],
  ecommerce: ["home", "shop", "product", "faq", "contact"],
  dashboard: ["home", "features", "docs", "login", "contact"],
  blog: ["home", "blog", "about", "contact", "faq"],
  fintech: ["home", "pricing", "security", "faq", "contact"],
};

export const REGISTRY_ITEMS: RegistryItem[] = [
  {
    id: "registry-hero-gradient",
    source: "registry.directory",
    libraryName: "shadcn community registry",
    componentName: "Gradient Hero",
    componentType: "block",
    category: "hero",
    tags: ["hero", "marketing", "cta", "landing"],
    framework: "Next.js",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["landing page", "product launch"],
    industryFit: ["marketing", "saas", "agency", "fintech"],
    toneFit: ["innovative", "premium", "modern"],
    stylePackFit: ["Apple Inspired Clean", "Neo-Futuristic Tech", "Swiss Design Precision"],
    pageTypeFit: ["home"],
    complexity: "medium",
    accessibilityLevel: "good",
    url: "https://registry.directory",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "shadcn-navbar",
    source: "shadcn",
    libraryName: "shadcn/ui",
    componentName: "Responsive Navbar",
    componentType: "pattern",
    category: "navbar",
    tags: ["navigation", "responsive", "header"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["marketing site", "saas site", "fintech site"],
    industryFit: ["marketing", "saas", "fintech", "agency", "blog"],
    toneFit: ["trustworthy", "clean", "modern"],
    stylePackFit: ["Swiss Design Precision", "Apple Inspired Clean", "Centered Minimal Layout"],
    pageTypeFit: ["home", "pricing", "security", "blog", "contact"],
    complexity: "low",
    accessibilityLevel: "strong",
    url: "https://ui.shadcn.com/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "magicui-spotlight",
    source: "Magic UI",
    libraryName: "Magic UI",
    componentName: "Spotlight Hero",
    componentType: "block",
    category: "hero",
    tags: ["hero", "motion", "spotlight"],
    framework: "Next.js",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["marketing site", "agency launch", "saas hero"],
    industryFit: ["marketing", "saas", "agency", "portfolio"],
    toneFit: ["bold", "innovative", "experimental"],
    stylePackFit: ["Cinematic Dark", "Cyberpunk Neon", "Minimal with Massive Typography"],
    pageTypeFit: ["home"],
    complexity: "medium",
    accessibilityLevel: "good",
    url: "https://magicui.design/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "hyperui-pricing",
    source: "HyperUI",
    libraryName: "HyperUI",
    componentName: "Pricing Grid",
    componentType: "block",
    category: "pricing",
    tags: ["pricing", "plans", "comparison"],
    framework: "HTML",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["pricing page", "saas site", "fintech plans"],
    industryFit: ["saas", "marketing", "fintech"],
    toneFit: ["clean", "trustworthy", "corporate"],
    stylePackFit: ["Swiss Design Precision", "Scandinavian Minimal", "Apple Inspired Clean"],
    pageTypeFit: ["pricing", "home"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://www.hyperui.dev/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "flowbite-faq",
    source: "Flowbite",
    libraryName: "Flowbite",
    componentName: "Accordion FAQ",
    componentType: "component",
    category: "faq",
    tags: ["faq", "accordion", "support"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["help area", "product questions", "conversion support"],
    industryFit: ["saas", "marketing", "fintech", "ecommerce"],
    toneFit: ["trustworthy", "clean", "supportive"],
    stylePackFit: ["Swiss Design Precision", "Centered Minimal Layout", "Card Based Modular"],
    pageTypeFit: ["faq", "pricing", "product"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://flowbite.com/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "heroui-inputs",
    source: "HeroUI",
    libraryName: "HeroUI",
    componentName: "Input Suite",
    componentType: "component",
    category: "form",
    tags: ["form", "input", "contact", "auth"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "CSS-in-JS",
    license: "free",
    useCases: ["contact form", "lead form", "login form"],
    industryFit: ["saas", "fintech", "marketing", "dashboard", "agency"],
    toneFit: ["clean", "professional", "trustworthy"],
    stylePackFit: ["Apple Inspired Clean", "Swiss Design Precision", "Centered Minimal Layout"],
    pageTypeFit: ["contact", "login", "home"],
    complexity: "medium",
    accessibilityLevel: "strong",
    url: "https://www.heroui.com/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "reactaria-dialog",
    source: "React Aria",
    libraryName: "React Aria",
    componentName: "Accessible Dialog",
    componentType: "component",
    category: "modal",
    tags: ["modal", "dialog", "accessibility"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Headless",
    license: "free",
    useCases: ["announcement modal", "lead capture", "legal dialog"],
    industryFit: ["saas", "dashboard", "fintech", "ecommerce"],
    toneFit: ["accessible", "trustworthy", "clean"],
    stylePackFit: ["Swiss Design Precision", "Apple Inspired Clean", "Scandinavian Minimal"],
    pageTypeFit: ["home", "pricing", "product", "login"],
    complexity: "medium",
    accessibilityLevel: "strong",
    url: "https://react-spectrum.adobe.com/react-aria/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "hyperui-testimonials",
    source: "HyperUI",
    libraryName: "HyperUI",
    componentName: "Testimonial Masonry",
    componentType: "block",
    category: "testimonials",
    tags: ["social proof", "testimonials", "reviews"],
    framework: "HTML",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["case proof", "customer trust", "agency proof"],
    industryFit: ["agency", "saas", "marketing", "fintech"],
    toneFit: ["trustworthy", "friendly", "premium"],
    stylePackFit: ["Luxury Editorial", "Scandinavian Minimal", "Playful Illustration"],
    pageTypeFit: ["home", "case-studies"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://www.hyperui.dev/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "flowbite-contact",
    source: "Flowbite",
    libraryName: "Flowbite",
    componentName: "Contact Section",
    componentType: "block",
    category: "contact",
    tags: ["contact", "lead", "form"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["contact page", "lead generation", "consulting site"],
    industryFit: ["agency", "marketing", "fintech", "blog"],
    toneFit: ["professional", "clean", "friendly"],
    stylePackFit: ["Centered Minimal Layout", "Card Based Modular", "Apple Inspired Clean"],
    pageTypeFit: ["contact"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://flowbite.com/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "registry-dashboard-cards",
    source: "registry.directory",
    libraryName: "community registry",
    componentName: "Metric Cards",
    componentType: "block",
    category: "dashboard",
    tags: ["dashboard", "stats", "widgets"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["app dashboard", "analytics view"],
    industryFit: ["dashboard", "saas", "fintech"],
    toneFit: ["innovative", "clean", "professional"],
    stylePackFit: ["Dashboard / App UI", "Neo-Futuristic Tech", "Swiss Design Precision"],
    pageTypeFit: ["home", "docs"],
    complexity: "medium",
    accessibilityLevel: "good",
    url: "https://registry.directory",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "reactaria-table-pattern",
    source: "React Aria",
    libraryName: "React Aria",
    componentName: "Accessible Table",
    componentType: "component",
    category: "table",
    tags: ["table", "data", "dashboard"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Headless",
    license: "free",
    useCases: ["admin tables", "pricing comparison", "transaction list"],
    industryFit: ["dashboard", "fintech", "saas"],
    toneFit: ["trustworthy", "clean", "professional"],
    stylePackFit: ["Dashboard / App UI", "Swiss Design Precision", "Monospace Tech"],
    pageTypeFit: ["pricing", "security", "docs"],
    complexity: "high",
    accessibilityLevel: "strong",
    url: "https://react-spectrum.adobe.com/react-aria/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "magicui-cta",
    source: "Magic UI",
    libraryName: "Magic UI",
    componentName: "Animated CTA Banner",
    componentType: "block",
    category: "cta",
    tags: ["cta", "banner", "motion"],
    framework: "Next.js",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["hero follow-up", "conversion band"],
    industryFit: ["marketing", "saas", "agency", "portfolio"],
    toneFit: ["bold", "innovative", "premium"],
    stylePackFit: ["Cinematic Dark", "Neo-Futuristic Tech", "Minimal with Massive Typography"],
    pageTypeFit: ["home", "pricing"],
    complexity: "medium",
    accessibilityLevel: "good",
    url: "https://magicui.design/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "hyperui-portfolio-grid",
    source: "HyperUI",
    libraryName: "HyperUI",
    componentName: "Portfolio Grid",
    componentType: "block",
    category: "portfolio",
    tags: ["portfolio", "gallery", "showcase"],
    framework: "HTML",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["creative portfolio", "agency work", "case studies"],
    industryFit: ["portfolio", "agency", "marketing"],
    toneFit: ["artistic", "bold", "friendly"],
    stylePackFit: ["Asymmetric Grid", "Masonry Creative Grid", "Playful Illustration"],
    pageTypeFit: ["portfolio", "case-studies", "home"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://www.hyperui.dev/",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "flowbite-blog-cards",
    source: "Flowbite",
    libraryName: "Flowbite",
    componentName: "Blog Card List",
    componentType: "block",
    category: "blog",
    tags: ["blog", "content", "cards"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["content marketing", "news", "journal"],
    industryFit: ["blog", "marketing", "agency", "portfolio"],
    toneFit: ["clean", "editorial", "friendly"],
    stylePackFit: ["Editorial Magazine Grid", "Scandinavian Minimal", "Luxury Editorial"],
    pageTypeFit: ["blog", "home"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://flowbite.com/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "registry-ecommerce-grid",
    source: "registry.directory",
    libraryName: "community registry",
    componentName: "Product Grid",
    componentType: "block",
    category: "ecommerce",
    tags: ["shop", "product", "grid"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["shop page", "featured products"],
    industryFit: ["ecommerce", "marketing"],
    toneFit: ["clean", "premium", "friendly"],
    stylePackFit: ["Centered Minimal Layout", "Apple Inspired Clean", "Card Based Modular"],
    pageTypeFit: ["shop", "product", "home"],
    complexity: "medium",
    accessibilityLevel: "good",
    url: "https://registry.directory",
    previewImage: "/icon-512.svg",
    lastIndexedAt: "2026-03-05",
  },
  {
    id: "shadcn-auth-card",
    source: "shadcn",
    libraryName: "shadcn/ui",
    componentName: "Auth Card",
    componentType: "pattern",
    category: "auth",
    tags: ["auth", "login", "signup"],
    framework: "React",
    reactCompatible: true,
    stylingSystem: "Tailwind CSS",
    license: "free",
    useCases: ["sign in", "member access", "dashboard entry"],
    industryFit: ["saas", "dashboard", "fintech"],
    toneFit: ["clean", "trustworthy", "professional"],
    stylePackFit: ["Swiss Design Precision", "Dashboard / App UI", "Apple Inspired Clean"],
    pageTypeFit: ["login"],
    complexity: "low",
    accessibilityLevel: "good",
    url: "https://ui.shadcn.com/",
    previewImage: "/icon-192.svg",
    lastIndexedAt: "2026-03-05",
  },
];

export const FRAMEWORK_LIBRARY_CATALOG: FrameworkLibrary[] = [
  {
    id: "nextjs-app-router",
    name: "Next.js App Router",
    type: "navigation-pattern",
    source: "Next.js",
    framework: "Next.js",
    license: "free",
    bestFor: ["marketing", "saas", "agency", "portfolio", "blog", "fintech", "ecommerce", "dashboard"],
    tags: ["routing", "server components", "metadata"],
    pairings: ["shadcn/ui", "React Aria", "Magic UI"],
    constraints: ["Requires React knowledge", "Best with component-driven architecture"],
    url: "https://nextjs.org/docs/app",
  },
  {
    id: "react-aria",
    name: "React Aria",
    type: "ui-primitive",
    source: "Adobe",
    framework: "React",
    license: "free",
    bestFor: ["fintech", "dashboard", "saas", "marketing"],
    tags: ["accessibility", "headless", "forms", "dialogs"],
    pairings: ["Next.js App Router", "Tailwind CSS"],
    constraints: ["Needs custom styling", "More setup than styled kits"],
    url: "https://react-spectrum.adobe.com/react-aria/",
  },
  {
    id: "heroui",
    name: "HeroUI",
    type: "styled-component",
    source: "HeroUI",
    framework: "React",
    license: "free",
    bestFor: ["saas", "fintech", "dashboard", "marketing"],
    tags: ["forms", "overlays", "styled components"],
    pairings: ["Next.js App Router", "Framer Motion"],
    constraints: ["Opinionated visual layer"],
    url: "https://www.heroui.com/",
  },
  {
    id: "radix-ui",
    name: "Radix UI",
    type: "headless-component",
    source: "Radix UI",
    framework: "React",
    license: "free",
    bestFor: ["dashboard", "saas", "fintech"],
    tags: ["primitives", "menus", "dialogs", "popover"],
    pairings: ["shadcn/ui", "Tailwind CSS"],
    constraints: ["Needs custom composition"],
    url: "https://www.radix-ui.com/",
  },
  {
    id: "headless-ui",
    name: "Headless UI",
    type: "headless-component",
    source: "Tailwind Labs",
    framework: "React",
    license: "free",
    bestFor: ["marketing", "saas", "agency", "ecommerce"],
    tags: ["dialogs", "lists", "menus", "forms"],
    pairings: ["Tailwind CSS", "Next.js"],
    constraints: ["Smaller surface than Radix"],
    url: "https://headlessui.com/",
  },
  {
    id: "embla-carousel",
    name: "Embla Carousel",
    type: "animation",
    source: "Embla",
    framework: "React",
    license: "free",
    bestFor: ["marketing", "agency", "portfolio", "ecommerce"],
    tags: ["carousel", "slider", "gallery"],
    pairings: ["Magic UI", "HyperUI"],
    constraints: ["Needs custom controls and styling"],
    url: "https://www.embla-carousel.com/",
  },
  {
    id: "tanstack-table",
    name: "TanStack Table",
    type: "data-display",
    source: "TanStack",
    framework: "React",
    license: "free",
    bestFor: ["dashboard", "fintech", "saas"],
    tags: ["table", "data", "grid"],
    pairings: ["React Aria", "shadcn/ui"],
    constraints: ["Requires manual UI composition"],
    url: "https://tanstack.com/table/latest",
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    type: "styled-component",
    source: "shadcn",
    framework: "React",
    license: "free",
    bestFor: ["saas", "dashboard", "fintech", "marketing"],
    tags: ["blocks", "primitives", "tailwind"],
    pairings: ["Next.js App Router", "Radix UI"],
    constraints: ["You own the copied components"],
    url: "https://ui.shadcn.com/",
  },
];
