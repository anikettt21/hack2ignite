import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AdvancementToast } from "./components/PolishLayer";

const pixelFont = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixel-var",
  subsets: ["latin"],
  display: "swap",
});

const jabrisFont = localFont({
  src: "./fonts/jabris.otf",
  variable: "--font-jabris-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hack2ignite — Build. Break. Ignite.",
  description:
    "hack2ignite is a hackathon where builders, breakers, and creators come together to forge something legendary. Register now.",
  openGraph: {
    title: "hack2ignite — Build. Break. Ignite.",
    description: "A hackathon for builders and creators.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 1280,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${jabrisFont.variable} h-full`}
    >
      <body className="min-h-full flex flex-col text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AdvancementToast />
      </body>
    </html>
  );
}
