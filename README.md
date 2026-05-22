# Bidcom — Challenge Frontend

Pequeño ecommerce construido sobre **Next.js 15 (App Router)** con **TypeScript**, **Tailwind v4**, **Framer Motion** y arquitectura **Clean Architecture**, consumiendo la API de [DummyJSON](https://dummyjson.com).

## Stack

- **Next.js 15.5** + **React 19** (App Router, React Server Components)
- **TypeScript 5** strict
- **Tailwind v4** (CSS-first config, sin `tailwind.config.js`)
- **Framer Motion 11** para animaciones
- **Vitest 2 + Testing Library + jsdom** para tests
- **Storybook 10** para el design system

## Requisitos

- Node.js 20+
- npm 10+

## Scripts

```bash
npm install            # instala dependencias
npm run dev            # arranca en modo desarrollo (Turbopack) → http://localhost:3000
npm run build          # build de producción
npm run start          # arranca el build de producción
npm run lint           # linter de Next
npm test               # corre los tests (Vitest)
npm run test:watch     # tests en watch mode
npm run storybook      # Storybook → http://localhost:6006
npm run build-storybook
```

## Estructura

```
src/
├── app/                          # App Router (presentation layer + composition root)
│   ├── layout.tsx                # Root layout con Header, Footer, fonts globales
│   ├── template.tsx              # Page transitions con framer-motion
│   ├── page.tsx                  # Home: listado de 20 productos
│   ├── search/page.tsx           # /search?s=<term> con empty state
│   └── product/[sku]/
│       ├── page.tsx              # Detalle por SKU (generateMetadata, notFound())
│       └── not-found.tsx         # 404 tematizado
├── domain/                       # Entidades y contratos puros — cero deps externas
│   ├── entities/                 # Product, Category
│   └── repositories/             # ProductRepository (interfaz)
├── application/                  # Use cases (funciones puras que reciben el repo)
│   ├── search-products.ts
│   ├── get-product-by-sku.ts
│   └── list-categories.ts
├── infrastructure/               # Implementaciones concretas
│   └── dummyjson/                # Client, DTOs, mappers, repository concreto
├── presentation/                 # Design System
│   └── components/
│       ├── atoms/                # Button, Input, Logo, Pill, Skeleton, SkipLink
│       ├── molecules/            # SearchBar, ProductCard
│       └── organisms/            # Header, Footer, ProductGrid, EmptyState, ProductDetail
└── lib/                          # Utilidades transversales
    ├── cn.ts                     # clsx + tailwind-merge
    ├── animations.ts             # Variants compartidos de framer-motion
    ├── format.ts                 # formatPrice (es-AR)
    └── container.ts              # Factory del repo (composition root)
```

## Rutas

| Ruta                     | Descripción                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `/`                      | Listado de 20 productos (server-side, ISR 60s).                                |
| `/search?s=<termino>`    | Búsqueda. Si no hay resultados, empty state con 5 categorías como links.       |
| `/product/<sku>`         | Detalle por SKU. `generateMetadata` dinámico; `notFound()` si no existe.       |

## Criterios del challenge

### Excluyentes ✅

- [x] TypeScript en todo el código.
- [x] Tests unitarios e integración (32 tests con Vitest + Testing Library).
- [x] Última versión de Next.js (15.5).
- [x] Última versión de Tailwind (v4).
- [x] Responsive (mobile-first, breakpoints 1/2/3/4 columnas).
- [x] Server-side oriented (RSC + ISR + dynamic server-rendering según ruta).
- [x] Buenas prácticas de componetización (atoms / molecules / organisms).

### Deseados ✅

- [x] SOLID: interfaces para los repos, dependencias hacia adentro, single responsibility en use cases.
- [x] Clean Architecture: `domain` / `application` / `infrastructure` / `presentation` con composition root en `lib/container.ts`.
- [x] Design System: tokens en CSS, atoms/molecules/organisms.
- [x] Storybook: configurado, stories para los componentes principales.
- [x] Mobile first / container.

## Decisiones clave

- **App Router + RSC**: la página y la grilla son server components; fetching server-side por defecto. Mejor TTFB y SEO. Las islas client son sólo lo que necesita JS (SearchBar, ProductCard hover, animaciones).
- **Repository pattern**: `ProductRepository` vive en `domain/` como interfaz. `DummyJSONProductRepository` la implementa en `infrastructure/`. Si DummyJSON desaparece, el dominio no se entera.
- **Caching diferenciado por endpoint**: listado → `revalidate: 60`, detalle → `300`, categorías → `1 día`. Cada uno usa el `next: { revalidate, tags }` de `fetch`.
- **Tailwind v4 CSS-first**: el theme se define con `@theme` en `globals.css`. Cero archivo `tailwind.config.js`. Genera utilities automáticamente a partir de las `--color-*`, `--radius-*`, `--shadow-*`, etc.
- **Framer Motion variants centralizados**: en `lib/animations.ts`. Cambiar la "personalidad" de toda la app es un solo archivo.
- **Look "neo-brutalismo light"**: borders `border-2 border-ink`, sombras planas (`shadow-pop` con offset Y sin blur), radii generosos, paleta vibrante (azul Bidcom + 6 acentos juguetones).

## Tests

```bash
npm test
```

Cobertura:

- Dominio: `finalPrice` con todos los edges de descuento.
- Mappers: `toProduct` (fallback de `brand` a `null`), `toCategory`.
- Use cases: trim de query, clamp del limit, short-circuit en SKU vacío, slice por limit.
- Componentes: `Button`, `Pill`, `ProductCard`, `SearchBar`, `EmptyState`.

`next/navigation` y `next/image` se mockean a nivel módulo. Repos siempre con `vi.fn()` — los tests no tocan red.

## Animaciones

Lo que hace la app sentirse "viva":

- Stagger entry en la grilla (fadeUp con 0.06s de delay entre cards).
- Hover spring en `ProductCard` (lift + tilt sutil).
- Stagger en el detalle de producto (entran brand → título → rating → precio → descripción → pills → CTAs).
- Page transition en cada navegación (fade + slide, 280ms, ease-out-expo).
- Discount badge "rebotando" al entrar en el detalle.
- `prefers-reduced-motion` colapsa todo a 0.001ms.

