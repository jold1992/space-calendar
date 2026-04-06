"use client";

import { Launch } from "@/lib/types";
import { formatDate, getDaysUntil, isPast } from "@/lib/api";
import FavoriteButton from "./FavoriteButton";
import { useLanguage, formatString } from "@/lib/i18n";

interface LaunchCardProps {
  launch: Launch;
  onClick?: () => void;
}

export default function LaunchCard({ launch, onClick }: LaunchCardProps) {
  const { language, t } = useLanguage();
  const daysUntil = getDaysUntil(launch.window_start);
  const isLaunchPast = isPast(launch.window_start);
  const imageUrl = launch.image?.image_url;

  const statusKey = launch.status.name as keyof typeof t.launches.status;
  const statusText = t.launches.status[statusKey] || launch.status.name;

  return (
    <div
      onClick={onClick}
      className="group relative bg-space-black/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] glow-border hover:shadow-xl hover:shadow-space-purple/20 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={launch.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-space-purple/20 to-space-cyan/20 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-space-purple/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />

        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <FavoriteButton
            item={{
              id: launch.id,
              type: "launch",
              name: launch.name,
              date: launch.window_start,
              image: imageUrl || undefined,
            }}
            size="sm"
          />
        </div>

        {daysUntil >= 0 && daysUntil <= 7 && !isLaunchPast && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-space-cyan/90 rounded-full text-xs font-semibold text-white">
            {daysUntil === 0 ? t.time.today : formatString(t.time.daysUntil, { days: daysUntil })}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium ${isLaunchPast ? "text-gray-500" : "text-green-400"}`}>
            {statusText}
          </span>
          <span className="text-xs text-text-secondary">
            {launch.rocket.configuration.manufacturer?.name || "N/A"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-1 line-clamp-1 group-hover:text-space-cyan transition-colors">
          {launch.name}
        </h3>

        {launch.mission && (
          <p className="text-sm text-space-cyan mb-3 truncate">
            {launch.mission.name}
          </p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(launch.window_start, language === "es" ? "es-ES" : "en-US")}</span>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{launch.pad.location.name}</span>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate">{launch.launch_service_provider.name}</span>
          </div>
        </div>

        {launch.mission?.description && (
          <p className="mt-3 text-xs text-text-secondary line-clamp-2">
            {launch.mission.description}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-space-purple/20 flex items-center justify-between">
          <span className="text-xs text-space-purple group-hover:text-space-cyan transition-colors">
            {t.details.viewDetails} →
          </span>
        </div>
      </div>
    </div>
  );
}
