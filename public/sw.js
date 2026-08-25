// Empty SW — keeps registration from 404'ing before real Workbox build.
// Replace with next-pwa / workbox generated sw.js for offline + caching (spec #55–56).

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
