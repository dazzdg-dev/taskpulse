
const CACHE = 'taskpulse-v5-splash';
const ASSETS = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./splash-orange.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    try {
      return cached || await fetch(event.request);
    } catch (e) {
      return cached || await caches.match('./index.html');
    }
  })());
});
