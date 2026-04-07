import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
