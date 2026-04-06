import { Favorite } from "./types";

const STORAGE_KEY = "space-calendar-favorites";
const FAVORITES_EVENT = "favorites-changed";

export function getFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(favorite: Favorite): void {
  if (typeof window === "undefined") return;
  
  const favorites = getFavorites();
  const exists = favorites.some((f) => f.id === favorite.id);
  
  if (!exists) {
    favorites.push(favorite);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }
}

export function removeFavorite(id: string): void {
  if (typeof window === "undefined") return;
  
  const favorites = getFavorites();
  const filtered = favorites.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function isFavorite(id: string): boolean {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === id);
}

export function toggleFavorite(favorite: Favorite): boolean {
  if (isFavorite(favorite.id)) {
    removeFavorite(favorite.id);
    return false;
  } else {
    addFavorite(favorite);
    return true;
  }
}

export function subscribeToFavorites(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  
  window.addEventListener(FAVORITES_EVENT, callback);
  return () => window.removeEventListener(FAVORITES_EVENT, callback);
}
