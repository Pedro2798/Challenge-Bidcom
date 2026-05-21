import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Header } from "@/presentation/components/organisms/header";
import { Footer } from "@/presentation/components/organisms/footer";
import { SkipLink } from "@/presentation/components/atoms";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bidcom",
    template: "%s · Bidcom",
  },
  description: "Bidcom — encontrá lo que buscás, con onda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
