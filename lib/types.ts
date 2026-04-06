export interface LaunchImage {
  id: number;
  name: string;
  image_url: string;
  thumbnail_url: string;
  credit: string | null;
}

export interface Launch {
  id: string;
  url: string;
  name: string;
  window_start: string;
  window_end: string;
  netwindow_start: string;
  netwindow_end: string;
  launch_service_provider: {
    id: number;
    url: string;
    name: string;
    type: string;
  };
  rocket: {
    id: string;
    configuration: {
      id: number;
      url: string;
      name: string;
      family: string;
      full_name: string;
      manufacturer: {
        id: number;
        url: string;
        name: string;
        type: string;
      } | null;
    };
  };
  mission: {
    id: number;
    name: string;
    description: string;
    type: string;
    orbit: {
      id: number;
      name: string;
      abbrev: string;
    } | null;
  } | null;
  pad: {
    id: number;
    url: string;
    agency_id: number | null;
    name: string;
    info_url: string | null;
    wiki_url: string | null;
    location: {
      id: number;
      url: string;
      name: string;
      country_code: string;
    };
  };
  image: LaunchImage | null;
  infographic: string | null;
  status: {
    id: number;
    name: string;
  };
  chance: number | null;
  holdreason: string | null;
  failreason: string | null;
  hashtag: string | null;
  webcast_live: boolean;
  ifa: string | null;
  mission_patches: Array<{
    id: number;
    name: string;
    priority: number;
    image_url: string;
  }>;
  changed: string;
}

export interface SpaceEvent {
  id: string;
  url: string;
  name: string;
  description: string;
  type: {
    id: number;
    name: string;
  };
  location: string;
  news_date: string;
  date: string;
  launches: string[];
  expeditions: string[];
  agency: {
    id: number;
    url: string;
    name: string;
    type: string;
  } | null;
  image_url: string | null;
  video_url: string | null;
  change_history: string;
}

export interface LaunchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}

export interface EventResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpaceEvent[];
}

export type ContentItem = {
  type: "launch" | "event";
  data: Launch | SpaceEvent;
};

export interface Favorite {
  id: string;
  type: "launch" | "event";
  name: string;
  date: string;
  image?: string;
}
