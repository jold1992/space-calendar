"use client";

import { useState, useMemo } from "react";
import { Launch, SpaceEvent } from "@/lib/types";
import { useLanguage, formatString } from "@/lib/i18n";

interface CalendarProps {
  launches: Launch[];
  events: SpaceEvent[];
  onLaunchClick?: (launch: Launch) => void;
  onEventClick?: (event: SpaceEvent) => void;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  launches: Launch[];
  events: SpaceEvent[];
}

export default function Calendar({ launches, events, onLaunchClick, onEventClick }: CalendarProps) {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { year, month } = useMemo(() => {
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
    };
  }, [currentDate]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: CalendarDay[] = [];

    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        launches: [],
        events: [],
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toDateString();

      days.push({
        date,
        isCurrentMonth: true,
        launches: launches.filter((l) => new Date(l.window_start).toDateString() === dateStr),
        events: events.filter((e) => new Date(e.date).toDateString() === dateStr),
      });
    }

    const endPadding = 42 - days.length;
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        launches: [],
        events: [],
      });
    }

    return days;
  }, [year, month, launches, events]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const todayLaunches = launches.filter(
    (l) => new Date(l.window_start).toDateString() === new Date().toDateString()
  ).length;

  const todayEvents = events.filter(
    (e) => new Date(e.date).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="bg-space-black/40 backdrop-blur-sm rounded-2xl glow-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] gradient-text">
          {t.calendar.months[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg bg-space-purple/20 hover:bg-space-purple/40 text-space-purple transition-colors"
            title={t.calendar.prevMonth}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 rounded-lg bg-space-purple/20 hover:bg-space-purple/40 text-space-purple text-sm transition-colors"
          >
            {t.calendar.today}
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/40 text-space-cyan transition-colors"
            title={t.calendar.nextMonth}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {(todayLaunches > 0 || todayEvents > 0) && (
        <div className="mb-4 p-3 bg-gradient-to-r from-space-purple/20 to-space-cyan/20 rounded-lg border border-space-purple/30">
          <p className="text-sm text-text-primary">
            {formatString(t.calendar.todayInfo, { launches: todayLaunches, events: todayEvents })}
          </p>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 mb-2">
        {t.calendar.days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-text-secondary py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-[80px] p-1 rounded-lg transition-all duration-200
              ${day.isCurrentMonth ? "bg-space-black/60" : "bg-transparent opacity-40"}
              ${isToday(day.date) ? "ring-2 ring-space-cyan" : ""}
              ${(day.launches.length > 0 || day.events.length > 0) ? "hover:bg-space-purple/10 cursor-pointer" : ""}
            `}
          >
            <div className={`text-sm mb-1 ${isToday(day.date) ? "text-space-cyan font-bold" : day.isCurrentMonth ? "text-text-primary" : "text-text-secondary"}`}>
              {day.date.getDate()}
            </div>
            <div className="space-y-0.5">
              {day.launches.slice(0, 2).map((launch) => (
                <div
                  key={launch.id}
                  onClick={() => onLaunchClick?.(launch)}
                  className="text-[10px] px-1 py-0.5 bg-space-purple/30 rounded truncate text-space-purple flex items-center gap-0.5 cursor-pointer hover:bg-space-purple/50 transition-colors"
                  title={launch.name}
                >
                  <span>🚀</span>
                  <span className="truncate">{launch.name.split('|').pop()?.trim() || launch.name}</span>
                </div>
              ))}
              {day.events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="text-[10px] px-1 py-0.5 bg-space-cyan/30 rounded truncate text-space-cyan flex items-center gap-0.5 cursor-pointer hover:bg-space-cyan/50 transition-colors"
                  title={event.name}
                >
                  <span>📅</span>
                  <span className="truncate">{event.name}</span>
                </div>
              ))}
              {(day.launches.length > 2 || day.events.length > 2) && (
                <div className="text-[10px] text-text-secondary">
                  +{day.launches.length + day.events.length - 4}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-space-purple/30 rounded"></span>
          <span>{t.calendar.launches}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-space-cyan/30 rounded"></span>
          <span>{t.calendar.events}</span>
        </div>
      </div>
    </div>
  );
}
