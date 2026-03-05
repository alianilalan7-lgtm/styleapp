"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const isLocalhost =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (process.env.NODE_ENV !== "production" || isLocalhost) {
      // In development, stale SW/caches can serve old routes and produce false 404s.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch(() => undefined);
        });
      });
      if ("caches" in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => {
            caches.delete(key).catch(() => undefined);
          });
        });
      }
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => console.error("SW registration failed:", error));
  }, []);

  return null;
}
