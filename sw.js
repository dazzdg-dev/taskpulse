const CACHE_NAME = 'taskpulse-cache-v1';
const URLS_TO_CACHE = [
  '.',
  'index.html',
  'icon-192.png',
  'icon-512.png',
  'manifest.json',
  'TaskPulse_Splash_Powered_By_DarylG.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
