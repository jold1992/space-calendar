# Space Calendar

Una aplicación web que muestra los próximos lanzamientos espaciales y eventos astronómicos en un calendario interactivo.

## Características

- **Calendario Interactivo**: Visualiza lanzamientos y eventos en un calendario
- **Lanzamientos Espaciales**: Información actualizada de próximos lanzamientos desde TheSpaceDevs API
- **Eventos Astronómicos**: Seguimiento de eventos como eclipses, lluvias de meteoros, etc.
- **Favoritos**: Guarda tus lanzamientos y eventos favoritos localmente
- **Multiidioma**: Soporte para inglés y español
- **Diseño Espacial**: Interfaz con temática espacial con animaciones de estrellas

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- SWR para gestión de estado
- TheSpaceDevs API

## Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

### Configuración

1. Habilitar GitHub Pages:
   - Ve a **Settings > Pages** en tu repositorio
   - En **Source**, selecciona **GitHub Actions**

2. El workflow se ejecutará automáticamente al hacer push a la rama `main`

### Despliegue Manual

```bash
npm run build
```

Esto generará la carpeta `out/` con los archivos estáticos para GitHub Pages.

## Desarrollo Local

```bash
npm run dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Créditos

- Datos proporcionados por [TheSpaceDevs](https://thespacedevs.com)
- Desarrollado por [John Lomas](https://github.com/jold1992)
