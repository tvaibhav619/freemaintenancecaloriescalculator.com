import { ui, defaultLang, showDefaultLang, languages, type SupportedLanguage } from "./ui";

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in languages) {
    return lang as SupportedLanguage;
  }
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  const localizedUI = ui[lang] || ui[defaultLang];
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (localizedUI as Record<string, string>)[key] || ui[defaultLang][key] || key;
  };
}

export function useTranslatedPath(lang: SupportedLanguage) {
  return function translatePath(path: string, targetLang: SupportedLanguage = lang): string {
    // Clean path of leading slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    
    // Remove existing language prefix if present
    const segments = cleanPath.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] in languages) {
      segments.shift();
    }
    const pathWithoutLang = "/" + segments.join("/") + (segments.length > 0 ? "/" : "");

    if (!showDefaultLang && targetLang === defaultLang) {
      return pathWithoutLang;
    }
    return `/${targetLang}${pathWithoutLang === "/" ? "/" : pathWithoutLang}`;
  };
}
