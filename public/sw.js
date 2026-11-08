// HubCart Movie service worker — conservative caching:
// cache-first ONLY for static build assets and images; pages and
// everything else always go to the network, so content stays fresh.
const CACHE = 'hcm-static-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    /\.(?:png|jpe?g|webp|svg|ico|woff2?)$/.test(url.pathname) ||
    url.hostname === 'picsum.photos' ||
    url.hostname.endsWith('picsum.photos');

  if (!isStatic) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(request);
      if (hit) return hit;
      const res = await fetch(request);
      if (res && (res.ok || res.type === 'opaque')) {
        cache.put(request, res.clone());
      }
      return res;
    })
  );
});
