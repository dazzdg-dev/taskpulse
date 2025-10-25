// bump CACHE_NAME whenever you deploy so browsers grab fresh files
const CACHE_NAME = 'taskpulse-cache-v2';

const URLS_TO_CACHE = [
  '.',
  'index.html',
  'icon-192.png',
  'icon-512.png',
  'manifest.json',
  'TaskPulse_Splash_Powered_By_DarylG.png'
];

// Install: cache all core app files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Activate: delete old caches so updates actually show
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    })
  );
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
