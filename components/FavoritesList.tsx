"use client";

import { useState, useEffect } from "react";
import { Favorite } from "@/lib/types";
import { getFavorites, removeFavorite, subscribeToFavorites } from "@/lib/storage";
import { formatDate } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function FavoritesList() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorites(getFavorites());

    const unsubscribe = subscribeToFavorites(() => {
      setFavorites(getFavorites());
    });

    return unsubscribe;
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
  };

  if (!mounted) {
    return (
      <div className="bg-space-black/40 backdrop-blur-sm rounded-2xl glow-border p-6">
        <h2 className="text-xl font-bold font-[family-name:var(--font-orbitron)] gradient-text mb-4">
          {t.favorites.title}
        </h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-space-purple/10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-space-black/40 backdrop-blur-sm rounded-2xl glow-border p-6">
        <h2 className="text-xl font-bold font-[family-name:var(--font-orbitron)] gradient-text mb-4">
          {t.favorites.title}
        </h2>
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-text-secondary/50 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-text-secondary">{t.favorites.empty}</p>
          <p className="text-xs text-text-secondary/70 mt-1">
            {t.favorites.emptyHint}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-space-black/40 backdrop-blur-sm rounded-2xl glow-border p-6">
      <h2 className="text-xl font-bold font-[family-name:var(--font-orbitron)] gradient-text mb-4">
        {t.favorites.title} ({favorites.length})
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="flex items-center gap-3 p-3 bg-space-black/60 rounded-lg border border-space-purple/20 hover:border-space-purple/40 transition-colors"
          >
            {fav.image && (
              <img
                src={fav.image}
                alt={fav.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            {!fav.image && (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-space-purple/30 to-space-cyan/30 flex items-center justify-center">
                <span className="text-lg">{fav.type === "launch" ? "🚀" : "📅"}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {fav.name}
              </p>
              <p className="text-xs text-text-secondary">
                {formatDate(fav.date, "es-ES")}
              </p>
            </div>
            <button
              onClick={() => handleRemove(fav.id)}
              className="p-2 text-text-secondary hover:text-red-400 transition-colors"
              aria-label={t.favorites.remove}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
