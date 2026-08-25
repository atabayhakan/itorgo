"use client";

import { useEffect, useState } from "react";

/**
 * PWA install prompt + service worker registration stub.
 * TODO: generate real SW with workbox / next-pwa, add offline fallback.
 */
export function PWAInstaller() {
  const [deferred, setDeferred] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    // SW registration — no-op until /sw.js exists
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || !deferred) return null;

  return (
    <div className="fixed bottom-[84px] left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-lifted">
      <button
        onClick={() => {
          (deferred as unknown as { prompt: () => void }).prompt();
          setDeferred(null);
        }}
      >
        📲 Установить ITOrgo
      </button>
    </div>
  );
}
