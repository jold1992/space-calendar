"use client";

import { useEffect, useCallback } from "react";
import { Launch, SpaceEvent } from "@/lib/types";
import { formatDate } from "@/lib/api";
import FavoriteButton from "./FavoriteButton";
import { useLanguage } from "@/lib/i18n";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Launch | SpaceEvent | null;
  type: "launch" | "event";
}

export default function DetailModal({ isOpen, onClose, item, type }: DetailModalProps) {
  const { language, t } = useLanguage();

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !item) return null;

  const isLaunch = type === "launch";
  const launch = isLaunch ? (item as Launch) : null;
  const event = !isLaunch ? (item as SpaceEvent) : null;
  const locale = language === "es" ? "es-ES" : "en-US";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-space-black/95 backdrop-blur-xl rounded-2xl glow-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-space-black/50 hover:bg-space-purple/30 text-text-secondary hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLaunch && launch && (
          <>
            {launch.image?.image_url && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={launch.image.image_url}
                  alt={launch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                    launch.status.name === "Go for Launch"
                      ? "bg-green-500/20 text-green-400"
                      : launch.status.name.includes("TBC")
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {t.launches.status[launch.status.name as keyof typeof t.launches.status] || launch.status.name}
                  </span>
                  <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-orbitron)]">
                    {launch.name}
                  </h2>
                </div>
                <FavoriteButton
                  item={{
                    id: launch.id,
                    type: "launch",
                    name: launch.name,
                    date: launch.window_start,
                    image: launch.image?.image_url || undefined,
                  }}
                  size="lg"
                />
              </div>

              {launch.mission && (
                <div className="mb-6 p-4 bg-space-purple/10 rounded-xl border border-space-purple/20">
                  <h3 className="text-sm font-semibold text-space-purple mb-2">{t.details.mission}</h3>
                  <p className="text-lg font-medium text-text-primary mb-1">{launch.mission.name}</p>
                  <p className="text-sm text-text-secondary">{launch.mission.description}</p>
                  {launch.mission.orbit && (
                    <p className="text-xs text-space-cyan mt-2">{t.details.orbit}: {launch.mission.orbit.name}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-space-black/60 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">{t.details.dateTime}</p>
                  <p className="text-sm text-text-primary">{formatDate(launch.window_start, locale)}</p>
                </div>
                <div className="p-3 bg-space-black/60 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">{t.details.provider}</p>
                  <p className="text-sm text-text-primary">{launch.launch_service_provider.name}</p>
                </div>
                <div className="p-3 bg-space-black/60 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">{t.details.rocket}</p>
                  <p className="text-sm text-text-primary">{launch.rocket.configuration.full_name}</p>
                </div>
                <div className="p-3 bg-space-black/60 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">{t.details.location}</p>
                  <p className="text-sm text-text-primary">{launch.pad.location.name}</p>
                </div>
              </div>

              {launch.mission_patches && launch.mission_patches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-space-purple mb-3">{t.details.patches}</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {launch.mission_patches.map((patch) => (
                      <img
                        key={patch.id}
                        src={patch.image_url}
                        alt={patch.name}
                        className="w-16 h-16 object-contain rounded-lg bg-space-black/60"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!isLaunch && event && (
          <>
            {event.image_url && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-space-cyan/20 text-space-cyan">
                    {t.events.type[event.type.name as keyof typeof t.events.type] || event.type.name}
                  </span>
                  <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-orbitron)]">
                    {event.name}
                  </h2>
                </div>
                <FavoriteButton
                  item={{
                    id: event.id,
                    type: "event",
                    name: event.name,
                    date: event.date,
                    image: event.image_url || undefined,
                  }}
                  size="lg"
                />
              </div>

              <p className="text-text-secondary mb-6">{event.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-space-black/60 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">{t.details.dateTime}</p>
                  <p className="text-sm text-text-primary">{formatDate(event.date, locale)}</p>
                </div>
                {event.location && (
                  <div className="p-3 bg-space-black/60 rounded-lg">
                    <p className="text-xs text-text-secondary mb-1">{t.details.location}</p>
                    <p className="text-sm text-text-primary">{event.location}</p>
                  </div>
                )}
                {event.agency && (
                  <div className="p-3 bg-space-black/60 rounded-lg col-span-2">
                    <p className="text-xs text-text-secondary mb-1">{t.details.provider}</p>
                    <p className="text-sm text-text-primary">{event.agency.name}</p>
                  </div>
                )}
              </div>

              {event.video_url && (
                <a
                  href={event.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-space-cyan/20 hover:bg-space-cyan/30 text-space-cyan rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t.details.viewVideo}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
