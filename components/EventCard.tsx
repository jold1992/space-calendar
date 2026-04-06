"use client";

import { SpaceEvent } from "@/lib/types";
import { formatDate, getDaysUntil, isPast } from "@/lib/api";
import FavoriteButton from "./FavoriteButton";
import { useLanguage, formatString } from "@/lib/i18n";

interface EventCardProps {
  event: SpaceEvent;
  onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const { language, t } = useLanguage();
  const daysUntil = getDaysUntil(event.date);
  const isEventPast = isPast(event.date);

  const typeKey = event.type.name as keyof typeof t.events.type;
  const typeText = t.events.type[typeKey] || event.type.name;

  const typeColors: Record<string, string> = {
    "Spacewalk": "from-blue-500 to-cyan-500",
    "Docking": "from-purple-500 to-pink-500",
    "Undocking": "from-orange-500 to-red-500",
    "Launch": "from-green-500 to-emerald-500",
    "Landing": "from-yellow-500 to-orange-500",
    "Test": "from-indigo-500 to-purple-500",
    "Press Event": "from-pink-500 to-rose-500",
  };

  const getGradient = () => {
    for (const [type, gradient] of Object.entries(typeColors)) {
      if (event.type.name.includes(type)) return gradient;
    }
    return "from-space-purple to-space-cyan";
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-space-black/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] glow-border-cyan hover:shadow-xl hover:shadow-space-cyan/20 cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGradient()} opacity-30 flex items-center justify-center`}>
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />

        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <FavoriteButton
            item={{
              id: event.id,
              type: "event",
              name: event.name,
              date: event.date,
              image: event.image_url || undefined,
            }}
            size="sm"
          />
        </div>

        <div className="absolute top-3 left-3 px-3 py-1 bg-space-black/80 backdrop-blur-sm rounded-full text-xs font-medium text-space-cyan">
          {typeText}
        </div>

        {daysUntil >= 0 && daysUntil <= 7 && !isEventPast && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-space-purple/90 rounded-full text-xs font-semibold text-white">
            {daysUntil === 0 ? t.time.today : formatString(t.time.daysUntil, { days: daysUntil })}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-md font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-space-cyan transition-colors">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date, language === "es" ? "es-ES" : "en-US")}</span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="mt-3 text-xs text-text-secondary line-clamp-2">
            {event.description}
          </p>
        )}

        {event.agency && (
          <div className="mt-3 pt-3 border-t border-space-cyan/20">
            <span className="text-xs text-space-cyan">{event.agency.name}</span>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-space-cyan/20 flex items-center justify-between">
          <span className="text-xs text-space-cyan group-hover:text-white transition-colors">
            {t.details.viewDetails} →
          </span>
        </div>
      </div>
    </div>
  );
}
