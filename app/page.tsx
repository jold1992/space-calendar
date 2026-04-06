"use client";

import { useState, useEffect, useMemo } from "react";
import StarField from "@/components/StarField";
import NavBar from "@/components/NavBar";
import Calendar from "@/components/Calendar";
import LaunchCard from "@/components/LaunchCard";
import EventCard from "@/components/EventCard";
import FilterBar, { FilterType } from "@/components/FilterBar";
import FavoritesList from "@/components/FavoritesList";
import DetailModal from "@/components/DetailModal";
import { fetchUpcomingLaunches, fetchUpcomingEvents } from "@/lib/api";
import { Launch, SpaceEvent } from "@/lib/types";
import { useLanguage, formatString } from "@/lib/i18n";

export default function Home() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllLaunches, setShowAllLaunches] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Launch | SpaceEvent | null>(null);
  const [selectedType, setSelectedType] = useState<"launch" | "event">("launch");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [launchesData, eventsData] = await Promise.all([
          fetchUpcomingLaunches(50),
          fetchUpcomingEvents(50),
        ]);
        setLaunches(launchesData);
        setEvents(eventsData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(t.errors.loadError);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [t.errors.loadError]);

  const filteredItems = useMemo(() => {
    const search = searchTerm.toLowerCase();

    let filteredLaunches = launches;
    let filteredEvents = events;

    if (search) {
      filteredLaunches = launches.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.mission?.name.toLowerCase().includes(search) ||
          l.rocket.configuration.name.toLowerCase().includes(search)
      );
      filteredEvents = events.filter(
        (e) =>
          e.name.toLowerCase().includes(search) ||
          e.description?.toLowerCase().includes(search)
      );
    }

    return { launches: filteredLaunches, events: filteredEvents };
  }, [launches, events, searchTerm]);

  const displayedLaunches = useMemo(() => {
    if (filter === "launches" || showAllLaunches) {
      return filteredItems.launches;
    }
    return filteredItems.launches.slice(0, 4);
  }, [filteredItems.launches, filter, showAllLaunches]);

  const displayedEvents = useMemo(() => {
    if (filter === "events" || showAllEvents) {
      return filteredItems.events;
    }
    return filteredItems.events.slice(0, 4);
  }, [filteredItems.events, filter, showAllEvents]);

  const handleOpenDetail = (item: Launch | SpaceEvent, type: "launch" | "event") => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative min-h-screen">
      <StarField />
      <NavBar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-orbitron)] mb-4">
            <span className="gradient-text">{t.hero.title}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
        </header>

        <section className="mb-12" id="calendario">
          <Calendar 
            launches={launches} 
            events={events} 
            onLaunchClick={(launch) => handleOpenDetail(launch, "launch")}
            onEventClick={(event) => handleOpenDetail(event, "event")}
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2" id="contenido">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] gradient-text">
                {filter === "all" && t.launches.title}
                {filter === "launches" && t.launches.titleLaunches}
                {filter === "events" && t.launches.titleEvents}
              </h2>
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.launches.loading}
                </div>
              )}
            </div>

            <FilterBar
              onFilterChange={(f) => { setFilter(f); setShowAllLaunches(false); setShowAllEvents(false); }}
              onSearchChange={setSearchTerm}
              searchTerm={searchTerm}
            />

            {isLoading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-72 bg-space-black/40 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-space-black/40 rounded-xl p-8">
                <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-space-purple/30 hover:bg-space-purple/50 text-white rounded-lg transition-colors"
                >
                  {t.errors.retry}
                </button>
              </div>
            ) : (
              <>
                {(filter === "all" || filter === "launches") && filteredItems.launches.length > 0 && (
                  <div id="lanzamientos" className="mb-8">
                    {filter === "all" && (
                      <h3 className="text-lg font-semibold text-space-purple mb-4 flex items-center gap-2">
                        <span>🚀</span> {t.launches.titleLaunches} ({filteredItems.launches.length})
                      </h3>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {displayedLaunches.map((launch) => (
                        <LaunchCard
                          key={launch.id}
                          launch={launch}
                          onClick={() => handleOpenDetail(launch, "launch")}
                        />
                      ))}
                    </div>
                    {filter === "all" && filteredItems.launches.length > 4 && (
                      <button
                        onClick={() => setShowAllLaunches(!showAllLaunches)}
                        className="mt-4 w-full py-3 bg-space-purple/20 hover:bg-space-purple/30 text-space-purple rounded-lg transition-colors border border-space-purple/30"
                      >
                        {showAllLaunches ? t.launches.viewLess : formatString(t.launches.viewMore, { count: filteredItems.launches.length - 4 })}
                      </button>
                    )}
                    {filter === "launches" && filteredItems.launches.length > 20 && (
                      <button
                        onClick={() => setShowAllLaunches(!showAllLaunches)}
                        className="mt-4 w-full py-3 bg-space-purple/20 hover:bg-space-purple/30 text-space-purple rounded-lg transition-colors border border-space-purple/30"
                      >
                        {showAllLaunches ? t.launches.viewLess : t.launches.viewMore}
                      </button>
                    )}
                  </div>
                )}

                {(filter === "all" || filter === "events") && filteredItems.events.length > 0 && (
                  <div id="eventos">
                    {filter === "all" && (
                      <h3 className="text-lg font-semibold text-space-cyan mb-4 flex items-center gap-2">
                        <span>📅</span> {t.launches.titleEvents} ({filteredItems.events.length})
                      </h3>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {displayedEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onClick={() => handleOpenDetail(event, "event")}
                        />
                      ))}
                    </div>
                    {filter === "all" && filteredItems.events.length > 4 && (
                      <button
                        onClick={() => setShowAllEvents(!showAllEvents)}
                        className="mt-4 w-full py-3 bg-space-cyan/20 hover:bg-space-cyan/30 text-space-cyan rounded-lg transition-colors border border-space-cyan/30"
                      >
                        {showAllEvents ? t.launches.viewLess : formatString(t.launches.viewMoreEvents, { count: filteredItems.events.length - 4 })}
                      </button>
                    )}
                    {filter === "events" && filteredItems.events.length > 20 && (
                      <button
                        onClick={() => setShowAllEvents(!showAllEvents)}
                        className="mt-4 w-full py-3 bg-space-cyan/20 hover:bg-space-cyan/30 text-space-cyan rounded-lg transition-colors border border-space-cyan/30"
                      >
                        {showAllEvents ? t.launches.viewLess : t.launches.viewMoreEvents}
                      </button>
                    )}
                  </div>
                )}

                {!isLoading && filteredItems.launches.length === 0 && filteredItems.events.length === 0 && (
                  <div className="text-center py-12">
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
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-text-secondary">{t.launches.noResults}</p>
                    <p className="text-xs text-text-secondary/70 mt-1">
                      {t.launches.tryAgain}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>

          <aside id="favoritos">
            <FavoritesList />
          </aside>
        </div>

        <footer className="mt-16 pt-8 border-t border-space-purple/20 text-center text-text-secondary text-sm">
          <p>
            {t.footer.poweredBy}{" "}
            <a
              href="https://thespacedevs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-space-purple hover:text-space-cyan transition-colors"
            >
              TheSpaceDevs
            </a>{" "}
            - {t.footer.api}
          </p>
          <p className="mt-2">
            Developed by{" "}
            <a
              href="https://github.com/jold1992"
              target="_blank"
              rel="noopener noreferrer"
              className="text-space-purple hover:text-space-cyan transition-colors"
            >
              John Lomas
            </a>
          </p>
          <p className="mt-2 text-xs text-text-secondary/50">
            Space Calendar © {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <DetailModal
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        item={selectedItem}
        type={selectedType}
      />
    </div>
  );
}
