import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ServiceWorkerRegister } from "@/components/sw-register";

export const metadata: Metadata = {
  title: "Style Engine PWA",
  description: "Generate distinctive website design directions fast.",
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/icon-192.svg",
    icon: ["/icon-192.svg", "/icon-512.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#132038",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
