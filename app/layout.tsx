import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_STORAGE_KEY } from "@/context/ThemeContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Executa antes da pintura: aplica data-theme em <html> lendo localStorage
// (com try/catch) e caindo para prefers-color-scheme. Evita flash de tema.
const themeInitScript = `
(function(){
  try {
    var t = null;
    try { t = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>
        <ThemeProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="main-wrapper" id="main-content">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
