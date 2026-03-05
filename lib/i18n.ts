export type Locale = "tr" | "en";

export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_STORAGE_KEY = "style-engine-locale-v1";
export const LOCALE_QUERY_KEY = "lang";

type PillarLabelKey = "Layout" | "Visual" | "Typography" | "Mood" | "Motion";
type SiteTypeKey =
  | "marketing"
  | "saas"
  | "agency"
  | "portfolio"
  | "ecommerce"
  | "dashboard"
  | "blog"
  | "fintech";
type PageTypeKey =
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
type FrameworkPreferenceKey = "auto" | "nextjs" | "accessibility" | "headless" | "animation";
type ComponentDepthKey = "starter" | "balanced" | "deep";

type UiDictionary = {
  localeShortLabel: string;
  title: string;
  subtitle: string;
  languageLabel: string;
  installApp: string;
  lock: string;
  locked: string;
  manualSelect: string;
  randomize: string;
  buildFromSelection: string;
  copyPrompt: string;
  copyShareLink: string;
  saveFavorite: string;
  unlockAll: string;
  brandBriefTitle: string;
  brandBriefAction: string;
  blueprintAction: string;
  generatingBlueprint: string;
  generationError: string;
  brandBriefDescription: string;
  brandBriefPlaceholder: string;
  siteTypeLabel: string;
  audienceLabel: string;
  audiencePlaceholder: string;
  pageCountLabel: string;
  requiredPagesLabel: string;
  frameworkPreferenceLabel: string;
  componentDepthLabel: string;
  applyDirection: string;
  aiPromptTitle: string;
  aiPromptHint: string;
  conceptBlueprintTitle: string;
  pageStructureTitle: string;
  pageStructureHint: string;
  homepageSections: string;
  signatureComponents: string;
  colorDirection: string;
  typeScale: string;
  motionNotes: string;
  ideaBoardTitle: string;
  ideaBoardHint: string;
  artDirectionAxes: string;
  freeComponentsTitle: string;
  freeComponentsHint: string;
  frameworksTitle: string;
  frameworksHint: string;
  pageMatchTitle: string;
  pageMatchHint: string;
  noRecommendations: string;
  reasonLabel: string;
  recommendedForLabel: string;
  licenseLabel: string;
  pageLabel: string;
  sectionsLabel: string;
  componentLabel: string;
  frameworkLabel: string;
  constraintsLabel: string;
  pairingsLabel: string;
  sourceLabel: string;
  favoritesTitle: string;
  favoritesHint: string;
  favoritesEmpty: string;
  historyTitle: string;
  historyEmpty: string;
  load: string;
  remove: string;
  clear: string;
  pillarLabels: Record<PillarLabelKey, string>;
  packLoadedFromUrl: string;
  generatedPack: string;
  copiedPrompt: string;
  clipboardBlocked: string;
  copiedShareLink: string;
  copiedShareLinkError: string;
  unlockedAll: string;
  savedPack: string;
  loadedFavorite: string;
  loadedHistory: string;
  clearedHistory: string;
  removedFavorite: string;
  generatedBrandDirections: string;
  builtFromSelection: string;
  manualUpdatedTemplate: string;
  directionAppliedTemplate: string;
  persistedLocally: string;
  layoutLabel: string;
  visualLabel: string;
  typographyLabel: string;
  moodLabel: string;
  motionLabel: string;
  siteTypeLabels: Record<SiteTypeKey, string>;
  pageTypeLabels: Record<PageTypeKey, string>;
  frameworkPreferenceLabels: Record<FrameworkPreferenceKey, string>;
  componentDepthLabels: Record<ComponentDepthKey, string>;
};

export const UI_TEXT: Record<Locale, UiDictionary> = {
  tr: {
    localeShortLabel: "TR",
    title: "Style Engine",
    subtitle:
      "Tek tip kalıpların dışına çıkan web tasarım yönleri üret. Başlıkları kilitle, rastgeleleştir ve prompt ile blueprint çıktısı al.",
    languageLabel: "Dil",
    installApp: "Uygulamayi Yukle",
    lock: "Kilitle",
    locked: "Kilitli",
    manualSelect: "Manuel Seçim",
    randomize: "Rastgele Üret",
    buildFromSelection: "Seçimden Template Üret",
    copyPrompt: "Prompt Kopyala",
    copyShareLink: "Paylaşım Linki Kopyala",
    saveFavorite: "Favoriye Kaydet",
    unlockAll: "Tüm Kilitleri Aç",
    brandBriefTitle: "Marka Kimliği Briefi",
    brandBriefAction: "5 Tasarım Hattı Öner",
    blueprintAction: "Tam Paket Üret",
    generatingBlueprint: "Blueprint hazırlanıyor...",
    generationError: "Blueprint üretilirken bir hata oluştu.",
    brandBriefDescription:
      "Marka karakteri, hedef kitle, sektör, ton ve farklılaşma notlarını yaz. Sistem briefine göre 5 öneri sunsun.",
    brandBriefPlaceholder:
      "Örnek: Fintech startup. 25-40 yaş profesyoneller. Güven veren ama modern bir algı istiyoruz. Mavi-gri tonlar, sade tipografi, net CTA.",
    siteTypeLabel: "Site Tipi",
    audienceLabel: "Hedef Kitle",
    audiencePlaceholder: "Örnek: Karar verici ekip liderleri, genç teknoloji kullanıcıları, premium müşteri kitlesi",
    pageCountLabel: "Sayfa Sayısı",
    requiredPagesLabel: "Gerekli Sayfalar",
    frameworkPreferenceLabel: "Framework Tercihi",
    componentDepthLabel: "Bileşen Derinliği",
    applyDirection: "Bu Hattı Uygula",
    aiPromptTitle: "AI Prompt",
    aiPromptHint: "Preset odaklı çıktı",
    conceptBlueprintTitle: "Konsept Blueprint",
    pageStructureTitle: "Sayfa Yapısı",
    pageStructureHint: "Site ağacı ve section planı",
    homepageSections: "Ana Sayfa Bölümleri",
    signatureComponents: "İmza Bileşenler",
    colorDirection: "Renk yönü",
    typeScale: "Tipografi ölçeği",
    motionNotes: "Hareket Notları",
    ideaBoardTitle: "Fikir Panosu",
    ideaBoardHint: "Moodboard ipuçları + wireframe iskeleti",
    artDirectionAxes: "Sanat Yönetimi Eksenleri",
    freeComponentsTitle: "Ücretsiz Bileşen Önerileri",
    freeComponentsHint: "Brief ve stil paketine göre seçilen ücretsiz kaynaklar",
    frameworksTitle: "Framework Önerileri",
    frameworksHint: "Uygulama kalitesi için önerilen React / framework katmanı",
    pageMatchTitle: "Sayfa Bazlı Bileşen Eşleşmeleri",
    pageMatchHint: "Her sayfa için önerilen block ve component eşleşmeleri",
    noRecommendations: "Bu alan için henüz öneri yok.",
    reasonLabel: "Neden",
    recommendedForLabel: "Önerilen kullanım",
    licenseLabel: "Lisans",
    pageLabel: "Sayfa",
    sectionsLabel: "Bölümler",
    componentLabel: "Bileşen",
    frameworkLabel: "Framework",
    constraintsLabel: "Kısıtlar",
    pairingsLabel: "Uyumlu eşleşmeler",
    sourceLabel: "Kaynak",
    favoritesTitle: "Kaydedilen Favoriler",
    favoritesHint: "Bu cihazda yerel olarak saklanır",
    favoritesEmpty: "Henüz favori yok. Geri dönmek istediğin kombinasyonları kaydet.",
    historyTitle: "Paket Geçmişi",
    historyEmpty: "Henüz geçmiş yok. Önce paket üret veya bir paket yükle.",
    load: "Yükle",
    remove: "Sil",
    clear: "Temizle",
    pillarLabels: {
      Layout: "Yerleşim",
      Visual: "Görsel Stil",
      Typography: "Tipografi",
      Mood: "Mood",
      Motion: "Hareket",
    },
    packLoadedFromUrl: "Paket URL üzerinden yüklendi.",
    generatedPack: "Yeni bir stil paketi üretildi.",
    copiedPrompt: "Prompt kopyalandı.",
    clipboardBlocked: "Tarayıcı panoya erişimi engelledi.",
    copiedShareLink: "Paylaşım linki kopyalandı.",
    copiedShareLinkError: "Paylaşım linki kopyalanamadı.",
    unlockedAll: "Tüm başlıkların kilidi açıldı.",
    savedPack: "Stil paketi favorilere kaydedildi.",
    loadedFavorite: "Favori paket yüklendi.",
    loadedHistory: "Geçmişteki paket yüklendi.",
    clearedHistory: "Geçmiş temizlendi.",
    removedFavorite: "Favori kaldırıldı.",
    generatedBrandDirections: "Briefine uygun 5 tasarım hattı üretildi.",
    builtFromSelection: "Seçili değerlerle template üretildi.",
    manualUpdatedTemplate: "{pillar} alanı manuel seçimle güncellendi.",
    directionAppliedTemplate: "{name} uygulandı.",
    persistedLocally: "Bu cihazda yerel olarak saklanır",
    layoutLabel: "Yerleşim",
    visualLabel: "Görsel",
    typographyLabel: "Tipografi",
    moodLabel: "Mood",
    motionLabel: "Hareket",
    siteTypeLabels: {
      marketing: "Marketing",
      saas: "SaaS",
      agency: "Ajans",
      portfolio: "Portfolyo",
      ecommerce: "E-ticaret",
      dashboard: "Dashboard",
      blog: "Blog",
      fintech: "Fintech",
    },
    pageTypeLabels: {
      home: "Ana Sayfa",
      pricing: "Fiyatlandırma",
      security: "Güvenlik",
      faq: "SSS",
      contact: "İletişim",
      about: "Hakkımızda",
      features: "Özellikler",
      integrations: "Entegrasyonlar",
      blog: "Blog",
      "case-studies": "Vaka Çalışmaları",
      portfolio: "Portfolyo",
      shop: "Mağaza",
      product: "Ürün",
      docs: "Dokümantasyon",
      login: "Giriş",
    },
    frameworkPreferenceLabels: {
      auto: "Otomatik",
      nextjs: "Next.js odaklı",
      accessibility: "Erişilebilirlik odaklı",
      headless: "Headless yaklaşım",
      animation: "Animasyon odaklı",
    },
    componentDepthLabels: {
      starter: "Başlangıç",
      balanced: "Dengeli",
      deep: "Derin",
    },
  },
  en: {
    localeShortLabel: "EN",
    title: "Style Engine",
    subtitle:
      "Generate non-generic website directions. Lock pillars, randomize, and get prompt + blueprint output.",
    languageLabel: "Language",
    installApp: "Install App",
    lock: "Lock",
    locked: "Locked",
    manualSelect: "Manual Selection",
    randomize: "Randomize",
    buildFromSelection: "Build Template From Selection",
    copyPrompt: "Copy Prompt",
    copyShareLink: "Copy Share Link",
    saveFavorite: "Save Favorite",
    unlockAll: "Unlock All",
    brandBriefTitle: "Brand Identity Brief",
    brandBriefAction: "Suggest 5 Design Directions",
    blueprintAction: "Generate Full Blueprint",
    generatingBlueprint: "Generating blueprint...",
    generationError: "Something went wrong while generating the blueprint.",
    brandBriefDescription:
      "Write brand personality, target audience, sector, tone, and differentiation notes. The system will suggest 5 directions.",
    brandBriefPlaceholder:
      "Example: Fintech startup. Audience: professionals 25-40. We need a trustworthy but modern tone. Blue-gray palette, clean typography, clear CTA.",
    siteTypeLabel: "Site Type",
    audienceLabel: "Audience",
    audiencePlaceholder: "Example: decision-maker team leads, younger tech users, premium customers",
    pageCountLabel: "Page Count",
    requiredPagesLabel: "Required Pages",
    frameworkPreferenceLabel: "Framework Preference",
    componentDepthLabel: "Component Depth",
    applyDirection: "Apply This Direction",
    aiPromptTitle: "AI Prompt",
    aiPromptHint: "Preset specific output",
    conceptBlueprintTitle: "Concept Blueprint",
    pageStructureTitle: "Page Structure",
    pageStructureHint: "Site tree and section plan",
    homepageSections: "Homepage Sections",
    signatureComponents: "Signature Components",
    colorDirection: "Color direction",
    typeScale: "Type scale",
    motionNotes: "Motion Notes",
    ideaBoardTitle: "Idea Board",
    ideaBoardHint: "Moodboard cues + wireframe skeleton",
    artDirectionAxes: "Art Direction Axes",
    freeComponentsTitle: "Free Component Recommendations",
    freeComponentsHint: "Free sources selected for the brief and style pack",
    frameworksTitle: "Framework Recommendations",
    frameworksHint: "Recommended React / framework layer for implementation quality",
    pageMatchTitle: "Page-Level Component Matches",
    pageMatchHint: "Recommended blocks and components for each page",
    noRecommendations: "No recommendations available yet.",
    reasonLabel: "Reason",
    recommendedForLabel: "Recommended usage",
    licenseLabel: "License",
    pageLabel: "Page",
    sectionsLabel: "Sections",
    componentLabel: "Component",
    frameworkLabel: "Framework",
    constraintsLabel: "Constraints",
    pairingsLabel: "Good pairings",
    sourceLabel: "Source",
    favoritesTitle: "Saved Favorites",
    favoritesHint: "Stored locally on this device",
    favoritesEmpty: "No saved packs yet. Save combinations you want to revisit.",
    historyTitle: "Pack History",
    historyEmpty: "No history yet. Generate or load a pack first.",
    load: "Load",
    remove: "Remove",
    clear: "Clear",
    pillarLabels: {
      Layout: "Layout",
      Visual: "Visual",
      Typography: "Typography",
      Mood: "Mood",
      Motion: "Motion",
    },
    packLoadedFromUrl: "Pack loaded from URL.",
    generatedPack: "Generated a new style pack.",
    copiedPrompt: "Prompt copied.",
    clipboardBlocked: "Clipboard access is blocked by the browser.",
    copiedShareLink: "Share link copied.",
    copiedShareLinkError: "Could not copy the share link.",
    unlockedAll: "All pillars unlocked.",
    savedPack: "Style pack saved.",
    loadedFavorite: "Favorite loaded.",
    loadedHistory: "History item loaded.",
    clearedHistory: "History cleared.",
    removedFavorite: "Favorite removed.",
    generatedBrandDirections: "Generated 5 design directions for your brief.",
    builtFromSelection: "Template generated from selected values.",
    manualUpdatedTemplate: "{pillar} updated by manual selection.",
    directionAppliedTemplate: "{name} applied.",
    persistedLocally: "Stored locally on this device",
    layoutLabel: "Layout",
    visualLabel: "Visual",
    typographyLabel: "Typography",
    moodLabel: "Mood",
    motionLabel: "Motion",
    siteTypeLabels: {
      marketing: "Marketing",
      saas: "SaaS",
      agency: "Agency",
      portfolio: "Portfolio",
      ecommerce: "Ecommerce",
      dashboard: "Dashboard",
      blog: "Blog",
      fintech: "Fintech",
    },
    pageTypeLabels: {
      home: "Home",
      pricing: "Pricing",
      security: "Security",
      faq: "FAQ",
      contact: "Contact",
      about: "About",
      features: "Features",
      integrations: "Integrations",
      blog: "Blog",
      "case-studies": "Case Studies",
      portfolio: "Portfolio",
      shop: "Shop",
      product: "Product",
      docs: "Docs",
      login: "Login",
    },
    frameworkPreferenceLabels: {
      auto: "Auto",
      nextjs: "Next.js first",
      accessibility: "Accessibility first",
      headless: "Headless",
      animation: "Animation heavy",
    },
    componentDepthLabels: {
      starter: "Starter",
      balanced: "Balanced",
      deep: "Deep",
    },
  },
};

export function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}

export function localeTag(locale: Locale) {
  return locale === "tr" ? "tr-TR" : "en-US";
}
