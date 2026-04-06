import { Launch, SpaceEvent, LaunchResponse, EventResponse } from "./types";

const BASE_URL = "https://ll.thespacedevs.com/2.3.0";
const CACHE_DURATION = 30 * 60 * 1000;

interface CacheData<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const parsed: CacheData<T> = JSON.parse(cached);
    const now = Date.now();
    
    if (now - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    
    return parsed.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch {
    // Ignore cache errors
  }
}

export async function fetchUpcomingLaunches(
  limit: number = 20,
  offset: number = 0
): Promise<Launch[]> {
  const cacheKey = `launches_${limit}_${offset}`;
  const cached = getCache<Launch[]>(cacheKey);
  
  if (cached) {
    return cached;
  }

  const response = await fetch(
    `${BASE_URL}/launches/upcoming/?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching launches: ${response.status}`);
  }

  const data: LaunchResponse = await response.json();
  setCache(cacheKey, data.results);
  return data.results;
}

export async function fetchUpcomingEvents(
  limit: number = 20,
  offset: number = 0
): Promise<SpaceEvent[]> {
  const cacheKey = `events_${limit}_${offset}`;
  const cached = getCache<SpaceEvent[]>(cacheKey);
  
  if (cached) {
    return cached;
  }

  const response = await fetch(
    `${BASE_URL}/events/upcoming/?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching events: ${response.status}`);
  }

  const data: EventResponse = await response.json();
  setCache(cacheKey, data.results);
  return data.results;
}

export async function fetchLaunchById(id: string): Promise<Launch> {
  const cacheKey = `launch_${id}`;
  const cached = getCache<Launch>(cacheKey);
  
  if (cached) {
    return cached;
  }

  const response = await fetch(`${BASE_URL}/launches/${id}/`, {
    headers: {
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching launch details");
  }

  const data: Launch = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function fetchEventById(id: string): Promise<SpaceEvent> {
  const cacheKey = `event_${id}`;
  const cached = getCache<SpaceEvent>(cacheKey);
  
  if (cached) {
    return cached;
  }

  const response = await fetch(`${BASE_URL}/events/${id}/`, {
    headers: {
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching event details");
  }

  const data: SpaceEvent = await response.json();
  setCache(cacheKey, data);
  return data;
}

export function clearCache(): void {
  if (typeof window === "undefined") return;
  
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("launches_") || key.startsWith("events_") || key.startsWith("launch_") || key.startsWith("event_"))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

export function formatDate(dateString: string, locale: string = "es-ES"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(dateString: string, locale: string = "es-ES"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  });
}

export function getDaysUntil(dateString: string): number {
  const target = new Date(dateString);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

export function groupByDate<T extends { date: string }>(
  items: T[]
): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const date = new Date(item.date).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
