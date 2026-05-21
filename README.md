# Bidcom — Challenge Frontend

Pequeño ecommerce construido sobre **Next.js 15 (App Router)** con **TypeScript**, **Tailwind v4**, **Framer Motion** y arquitectura **Clean Architecture**, consumiendo la API de [DummyJSON](https://dummyjson.com).

## Requisitos

- Node.js 20+
- npm 10+

## Scripts

```bash
npm install            # instala dependencias
npm run dev            # arranca en modo desarrollo (Turbopack)
npm run build          # build de producción
npm run start          # arranca el build de producción
npm run lint           # linter de Next
npm test               # corre tests unitarios e integración (Vitest)
npm run storybook      # Storybook en :6006
```

## Estructura

```
src/
├── app/                # App Router (presentation layer)
├── domain/             # Entidades y contratos puros (sin dependencias)
├── application/        # Use cases / orquestación
├── infrastructure/     # Implementaciones concretas (DummyJSON, etc.)
├── presentation/       # Design System (atoms / molecules / organisms)
└── lib/                # Utilidades transversales
```

## Rutas

- `/` — listado de productos (20 items).
- `/search?s=<termino>` — búsqueda; muestra empty state con 5 categorías si no hay resultados.
- `/product/[sku]` — detalle de producto.

## Decisiones rápidas

- **App Router + RSC**: fetching server-side por defecto, mejor TTFB y SEO.
- **Clean Architecture**: dominio y use cases desacoplados de Next/DummyJSON; la API es un detalle de infraestructura intercambiable.
- **Framer Motion**: micro-interacciones, page transitions y stagger en la grilla.
- **Tailwind v4**: theme definido en CSS, sin `tailwind.config.js`.
