export type TranslationKeys = {
  nav: {
    launches: string;
    events: string;
    favorites: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  calendar: {
    title: string;
    today: string;
    prevMonth: string;
    nextMonth: string;
    todayInfo: string;
    launches: string;
    events: string;
    months: string[];
    days: string[];
  };
  launches: {
    title: string;
    titleLaunches: string;
    titleEvents: string;
    loading: string;
    viewMore: string;
    viewMoreEvents: string;
    viewLess: string;
    noResults: string;
    tryAgain: string;
    status: Record<string, string>;
  };
  details: {
    mission: string;
    orbit: string;
    dateTime: string;
    provider: string;
    rocket: string;
    location: string;
    patches: string;
    viewVideo: string;
    viewDetails: string;
    close: string;
  };
  events: {
    type: Record<string, string>;
  };
  favorites: {
    title: string;
    empty: string;
    emptyHint: string;
    remove: string;
  };
  filters: {
    all: string;
    search: string;
  };
  time: {
    today: string;
    daysUntil: string;
  };
  footer: {
    poweredBy: string;
    api: string;
  };
  errors: {
    loadError: string;
    retry: string;
  };
  language: {
    es: string;
    en: string;
  };
};

export const translations: Record<string, TranslationKeys> = {
  es: {
    nav: {
      launches: "Lanzamientos",
      events: "Eventos",
      favorites: "Favoritos",
    },
    hero: {
      title: "Calendario Espacial",
      subtitle: "Mantente al día con los próximos lanzamientos de cohetes, misiones espaciales y eventos de agencias como NASA, SpaceX, ESA y más.",
    },
    calendar: {
      title: "{month} {year}",
      today: "Hoy",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      todayInfo: "Hoy hay {launches} lanzamiento(s) y {events} evento(s)",
      launches: "Lanzamientos",
      events: "Eventos",
      months: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ],
      days: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    },
    launches: {
      title: "Lanzamientos & Eventos",
      titleLaunches: "Próximos Lanzamientos",
      titleEvents: "Próximos Eventos",
      loading: "Cargando...",
      viewMore: "Ver más lanzamientos ({count} más)",
      viewMoreEvents: "Ver más eventos ({count} más)",
      viewLess: "Ver menos",
      noResults: "No se encontraron resultados",
      tryAgain: "Intenta con otros términos de búsqueda",
      status: {
        "Go for Launch": "Listo para lanzar",
        "TBC": "Por confirmar",
        "TBD": "Por definir",
        "Success": "Exitoso",
        "Failure": "Fallido",
        "Partial Failure": "Falla parcial",
      },
    },
    details: {
      mission: "MISIÓN",
      orbit: "Órbita",
      dateTime: "Fecha y Hora",
      provider: "Proveedor",
      rocket: "Cohete",
      location: "Ubicación",
      patches: "INSIGNIAS",
      viewVideo: "Ver Video",
      viewDetails: "Ver detalles",
      close: "Cerrar",
    },
    events: {
      type: {
        "Spacewalk": "Caminata espacial",
        "Docking": "Acoplamiento",
        "Undocking": "Desacoplamiento",
        "Launch": "Lanzamiento",
        "Landing": "Aterrizaje",
        "Test": "Prueba",
        "Press Event": "Evento de prensa",
      },
    },
    favorites: {
      title: "Mis Favoritos",
      empty: "Aún no tienes favoritos",
      emptyHint: "Haz clic en el corazón de cualquier lanzamiento o evento para guardarlo",
      remove: "Eliminar de favoritos",
    },
    filters: {
      all: "Todo",
      search: "Buscar por nombre...",
    },
    time: {
      today: "HOY",
      daysUntil: "En {days} días",
    },
    footer: {
      poweredBy: "Datos proporcionados por",
      api: "Launch Library 2 API",
    },
    errors: {
      loadError: "Error al cargar los datos. Intenta de nuevo más tarde.",
      retry: "Reintentar",
    },
    language: {
      es: "Español",
      en: "English",
    },
  },
  en: {
    nav: {
      launches: "Launches",
      events: "Events",
      favorites: "Favorites",
    },
    hero: {
      title: "Space Calendar",
      subtitle: "Stay up to date with upcoming rocket launches, space missions and events from agencies like NASA, SpaceX, ESA and more.",
    },
    calendar: {
      title: "{month} {year}",
      today: "Today",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      todayInfo: "Today there are {launches} launch(es) and {events} event(s)",
      launches: "Launches",
      events: "Events",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    launches: {
      title: "Launches & Events",
      titleLaunches: "Upcoming Launches",
      titleEvents: "Upcoming Events",
      loading: "Loading...",
      viewMore: "View more launches ({count} more)",
      viewMoreEvents: "View more events ({count} more)",
      viewLess: "View less",
      noResults: "No results found",
      tryAgain: "Try different search terms",
      status: {
        "Go for Launch": "Go for Launch",
        "TBC": "To Be Confirmed",
        "TBD": "To Be Defined",
        "Success": "Success",
        "Failure": "Failure",
        "Partial Failure": "Partial Failure",
      },
    },
    details: {
      mission: "MISSION",
      orbit: "Orbit",
      dateTime: "Date and Time",
      provider: "Provider",
      rocket: "Rocket",
      location: "Location",
      patches: "PATCHES",
      viewVideo: "Watch Video",
      viewDetails: "View details",
      close: "Close",
    },
    events: {
      type: {
        "Spacewalk": "Spacewalk",
        "Docking": "Docking",
        "Undocking": "Undocking",
        "Launch": "Launch",
        "Landing": "Landing",
        "Test": "Test",
        "Press Event": "Press Event",
      },
    },
    favorites: {
      title: "My Favorites",
      empty: "You don't have any favorites yet",
      emptyHint: "Click the heart on any launch or event to save it",
      remove: "Remove from favorites",
    },
    filters: {
      all: "All",
      search: "Search by name...",
    },
    time: {
      today: "TODAY",
      daysUntil: "In {days} days",
    },
    footer: {
      poweredBy: "Data provided by",
      api: "Launch Library 2 API",
    },
    errors: {
      loadError: "Error loading data. Try again later.",
      retry: "Retry",
    },
    language: {
      es: "Español",
      en: "English",
    },
  },
};

export type Language = "es" | "en";
