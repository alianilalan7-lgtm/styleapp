export type Locale = "tr" | "en";

export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_STORAGE_KEY = "style-engine-locale-v1";
export const LOCALE_QUERY_KEY = "lang";

type PillarLabelKey = "Layout" | "Visual" | "Typography" | "Mood" | "Motion";

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
  brandBriefDescription: string;
  brandBriefPlaceholder: string;
  applyDirection: string;
  aiPromptTitle: string;
  aiPromptHint: string;
  conceptBlueprintTitle: string;
  homepageSections: string;
  signatureComponents: string;
  colorDirection: string;
  typeScale: string;
  motionNotes: string;
  ideaBoardTitle: string;
  ideaBoardHint: string;
  artDirectionAxes: string;
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
    brandBriefDescription:
      "Marka karakteri, hedef kitle, sektör, ton ve farklılaşma notlarını yaz. Sistem briefine göre 5 öneri sunsun.",
    brandBriefPlaceholder:
      "Örnek: Fintech startup. 25-40 yaş profesyoneller. Güven veren ama modern bir algı istiyoruz. Mavi-gri tonlar, sade tipografi, net CTA.",
    applyDirection: "Bu Hattı Uygula",
    aiPromptTitle: "AI Prompt",
    aiPromptHint: "Preset odaklı çıktı",
    conceptBlueprintTitle: "Konsept Blueprint",
    homepageSections: "Ana Sayfa Bölümleri",
    signatureComponents: "İmza Bileşenler",
    colorDirection: "Renk yönü",
    typeScale: "Tipografi ölçeği",
    motionNotes: "Hareket Notları",
    ideaBoardTitle: "Fikir Panosu",
    ideaBoardHint: "Moodboard ipuçları + wireframe iskeleti",
    artDirectionAxes: "Sanat Yönetimi Eksenleri",
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
    brandBriefDescription:
      "Write brand personality, target audience, sector, tone, and differentiation notes. The system will suggest 5 directions.",
    brandBriefPlaceholder:
      "Example: Fintech startup. Audience: professionals 25-40. We need a trustworthy but modern tone. Blue-gray palette, clean typography, clear CTA.",
    applyDirection: "Apply This Direction",
    aiPromptTitle: "AI Prompt",
    aiPromptHint: "Preset specific output",
    conceptBlueprintTitle: "Concept Blueprint",
    homepageSections: "Homepage Sections",
    signatureComponents: "Signature Components",
    colorDirection: "Color direction",
    typeScale: "Type scale",
    motionNotes: "Motion Notes",
    ideaBoardTitle: "Idea Board",
    ideaBoardHint: "Moodboard cues + wireframe skeleton",
    artDirectionAxes: "Art Direction Axes",
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
