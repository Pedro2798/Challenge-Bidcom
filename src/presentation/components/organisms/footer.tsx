import Link from "next/link";
import { Logo } from "@/presentation/components/atoms";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <Logo animated={false} />
          <p className="max-w-sm text-sm text-ink-soft">
            Tu tienda online con onda. Encontrá productos cuidadosamente seleccionados, al mejor precio.
          </p>
        </div>

        <FooterColumn
          title="Empresa"
          links={[
            { label: "Sobre nosotros", href: "#" },
            { label: "Contacto", href: "#" },
            { label: "Trabajá con nosotros", href: "#" },
          ]}
        />

        <FooterColumn
          title="Ayuda"
          links={[
            { label: "Centro de ayuda", href: "#" },
            { label: "Devoluciones", href: "#" },
            { label: "Envíos", href: "#" },
          ]}
        />
      </div>

      <div className="border-t-2 border-ink bg-cream-soft">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} Bidcom — Challenge frontend.
          </p>
          <DecorativeMap />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecorativeMap() {
  return (
    <div
      aria-hidden="true"
      className="relative h-14 w-40 overflow-hidden rounded-lg border-2 border-ink"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #5de4c7 0%, #b4f833 35%, #ffd93d 70%, #ff7a59 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 160 56"
        fill="none"
        stroke="#0b0b1f"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M0 18 L40 22 L80 12 L120 26 L160 18" />
        <path d="M0 38 L60 30 L100 42 L160 36" />
        <path d="M20 0 L24 56" />
        <path d="M110 0 L116 56" />
      </svg>
      <span className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-brand text-paper">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
          <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      </span>
    </div>
  );
}
