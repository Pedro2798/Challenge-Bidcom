import Link from "next/link";
import { Button } from "@/presentation/components/atoms";

export default function ProductNotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-20 text-center lg:py-32">
      <div className="rounded-full border-2 border-ink bg-accent-pink px-4 py-1 font-display text-xs font-bold uppercase tracking-widest text-ink shadow-pop-sm">
        404
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
        No encontramos ese producto
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        El SKU que buscás no existe o ya no está disponible. Pero tenemos muchas otras cosas para mostrarte.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button size="lg">Ver el catálogo</Button>
        </Link>
      </div>
    </section>
  );
}
