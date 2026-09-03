import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
};

// Fontes: Source Serif 4 (títulos + hero), Archivo (corpo + interface),
// JetBrains Mono (só código e diagramas).
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-face",
});
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-face",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sourceSerif.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>
        <ErrorBoundary>
          <header>
            <Navbar />
          </header>
          <main className="main-wrapper" id="main-content">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
