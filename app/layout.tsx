import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Zap } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Tester",
  description: "Um projeto de portefólio: ferramenta de teste de APIs com Next.js e Hono.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">API Tester</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Projeto aberto em{" "}
            <a
              href="https://github.com/Chris4820/api-tester"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              GitHub
            </a>{" "}
            | {" "}
            <a
              href="https://chrismoreira.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Portefólio
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
