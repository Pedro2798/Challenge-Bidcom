import type { Category } from "@/domain/entities/category";
import { Pill, pillToneFor } from "@/presentation/components/atoms";

const EMPTY_STATE_LEAD =
  "No se encontró ningún producto. Te recomendamos buscar estas categorías";

export interface EmptyStateProps {
  categories: Category[];
  query?: string;
}

export function EmptyState({ categories, query }: EmptyStateProps) {
  return (
    <section
      aria-live="polite"
      className="relative overflow-hidden rounded-3xl border-2 border-ink bg-paper p-8 text-center shadow-pop sm:p-12"
    >
      <div className="mx-auto inline-flex items-center justify-center rounded-full border-2 border-ink bg-accent-yellow px-4 py-1 font-display text-xs font-bold uppercase tracking-widest text-ink shadow-pop-sm">
        Sin resultados
      </div>

      <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {query ? (
          <>
            No encontramos nada para{" "}
            <span className="bg-accent-pink px-1">&quot;{query}&quot;</span>
          </>
        ) : (
          "No encontramos productos"
        )}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-base text-ink-soft sm:text-lg">
        {EMPTY_STATE_LEAD}:
      </p>

      <ul
        data-testid="empty-state-categories"
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {categories.map((category, index) => (
          <li key={category.slug}>
            <Pill
              tone={pillToneFor(index)}
              href={`/search?s=${encodeURIComponent(category.slug)}`}
            >
              {category.name}
            </Pill>
          </li>
        ))}
      </ul>
    </section>
  );
}
