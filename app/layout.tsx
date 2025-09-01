import "../styles/globals.css";
import type { Metadata } from "next";
import ClientProviders from "./providers";

export const metadata: Metadata = {
  title: "PathCoin",
  description: "Run, collect tokens, claim crypto",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {process.env.NEXT_PUBLIC_DEMO_WATERMARK === "1" && (
  <div className="pointer-events-none fixed inset-x-0 top-2 z-[9999] flex justify-center">
    <span className="px-3 py-1 rounded-lg glass border border-white/10 text-white/70 text-xs">
      Demo • © {new Date().getFullYear()} Dumitrița — Not for redistribution
    </span>
  </div>
)}

        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
