import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#fcfcfb",
};

// Uma única família tipográfica — Newsreader (serifa de texto).
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-face",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={newsreader.variable}>
      <body>
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
