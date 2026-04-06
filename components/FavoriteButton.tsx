"use client";

import { useState, useEffect } from "react";
import { Favorite } from "@/lib/types";
import { getFavorites, toggleFavorite } from "@/lib/storage";

interface FavoriteButtonProps {
  item: Favorite;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({ item, size = "md" }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFav(getFavorites().some((f) => f.id === item.id));
  }, [item.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFavorite = toggleFavorite(item);
    setIsFav(nowFavorite);
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (!mounted) {
    return (
      <button className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-space-black/50 backdrop-blur-sm`}>
        <span className={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isFav
          ? "bg-space-purple/30 text-space-purple"
          : "bg-space-black/50 text-text-secondary hover:text-space-purple"
      }`}
      style={{
        boxShadow: isFav ? "0 0 20px rgba(139, 92, 246, 0.5)" : "none",
      }}
      aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        className={iconSizes[size]}
        fill={isFav ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
