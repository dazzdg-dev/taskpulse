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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  // cleanup old caches so updates actually show
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
