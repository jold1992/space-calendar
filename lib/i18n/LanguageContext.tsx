"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { translations, Language, TranslationKeys } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  mounted: boolean;
}

const defaultContext: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: translations.es,
  mounted: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

const LANGUAGE_KEY = "space-calendar-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem(LANGUAGE_KEY) as Language | null;
  return saved === "es" || saved === "en" ? saved : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (saved && (saved === "es" || saved === "en") && saved !== language) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  const t = translations[language];

  const value = useMemo(
    () => ({ language, setLanguage, t, mounted: true }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

export function formatString(str: string, values: Record<string, string | number>): string {
  let result = str;
  Object.entries(values).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
}
