"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export type FilterType = "all" | "launches" | "events";

interface FilterBarProps {
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (search: string) => void;
  searchTerm: string;
}

export default function FilterBar({ onFilterChange, onSearchChange, searchTerm }: FilterBarProps) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div className="flex gap-2">
        <button
          onClick={() => handleFilterClick("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeFilter === "all"
              ? "bg-gradient-to-r from-space-purple to-space-cyan text-white shadow-lg"
              : "bg-space-black/40 text-text-secondary hover:text-text-primary border border-space-purple/20"
          }`}
        >
          {t.filters.all}
        </button>
        <button
          onClick={() => handleFilterClick("launches")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeFilter === "launches"
              ? "bg-space-purple text-white shadow-lg"
              : "bg-space-black/40 text-text-secondary hover:text-text-primary border border-space-purple/20"
          }`}
        >
          <span>🚀</span>
          {t.nav.launches}
        </button>
        <button
          onClick={() => handleFilterClick("events")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeFilter === "events"
              ? "bg-space-cyan text-white shadow-lg"
              : "bg-space-black/40 text-text-secondary hover:text-text-primary border border-space-cyan/20"
          }`}
        >
          <span>📅</span>
          {t.nav.events}
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={t.filters.search}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-space-black/40 border border-space-purple/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-space-purple/50 focus:border-space-purple transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
