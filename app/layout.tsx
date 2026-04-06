import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Space Calendar",
  description: "Space launch calendar, events and missions. Stay updated with upcoming rocket launches and space events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
