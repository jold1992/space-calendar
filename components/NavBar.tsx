"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Language } from "@/lib/i18n/translations";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-space-purple/20 bg-space-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-space-purple to-space-cyan glow-effect flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-orbitron)] gradient-text">
              Space Calendar
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#lanzamientos"
              className="text-text-secondary hover:text-space-cyan transition-colors"
            >
              {t.nav.launches}
            </a>
            <a
              href="#eventos"
              className="text-text-secondary hover:text-space-cyan transition-colors"
            >
              {t.nav.events}
            </a>
            <a
              href="#favoritos"
              className="text-text-secondary hover:text-space-cyan transition-colors"
            >
              {t.nav.favorites}
            </a>

            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-purple/20 hover:bg-space-purple/40 text-space-purple transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {language.toUpperCase()}
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-space-black rounded-lg shadow-xl border border-space-purple/30 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("es")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-space-purple/20 transition-colors block ${
                      language === "es" ? "text-space-purple font-medium" : "text-text-secondary"
                    }`}
                  >
                    {t.language.es}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-space-purple/20 transition-colors block ${
                      language === "en" ? "text-space-purple font-medium" : "text-text-secondary"
                    }`}
                  >
                    {t.language.en}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 rounded-lg bg-space-purple/20 text-space-purple text-sm"
            >
              {language.toUpperCase()}
            </button>
            <button
              className="p-2 text-text-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {isLangMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange("es")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                  language === "es" ? "bg-space-purple text-white" : "bg-space-purple/20 text-text-secondary"
                }`}
              >
                {t.language.es}
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                  language === "en" ? "bg-space-purple text-white" : "bg-space-purple/20 text-text-secondary"
                }`}
              >
                {t.language.en}
              </button>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              <a href="#lanzamientos" className="text-text-secondary hover:text-space-cyan">
                {t.nav.launches}
              </a>
              <a href="#eventos" className="text-text-secondary hover:text-space-cyan">
                {t.nav.events}
              </a>
              <a href="#favoritos" className="text-text-secondary hover:text-space-cyan">
                {t.nav.favorites}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
