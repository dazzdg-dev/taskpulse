self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

// Simple pass-through fetch (no offline cache yet)
self.addEventListener('fetch', event => {
  // You can add caching here later if you want
});
