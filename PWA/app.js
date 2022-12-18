// PWA()
// PWA('https://www.google-analytics.com/analytics.js')
// PWA('https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y')
  /**------------------------------**/

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./pwa-examples/js13kpwa/sw.js');
  }
  self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
  });

  /**------------------------------**/
  const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  '/pwa-examples/js13kpwa/',
  '/pwa-examples/js13kpwa/index.html',
  '/pwa-examples/js13kpwa/app.js',
  '/pwa-examples/js13kpwa/style.css',
  '/pwa-examples/js13kpwa/fonts/graduate.eot',
  '/pwa-examples/js13kpwa/fonts/graduate.ttf',
  '/pwa-examples/js13kpwa/fonts/graduate.woff',
  '/pwa-examples/js13kpwa/favicon.ico',
  '/pwa-examples/js13kpwa/img/js13kgames.png',
  '/pwa-examples/js13kpwa/img/bg.png',
  '/pwa-examples/js13kpwa/icons/icon-32.png',
  '/pwa-examples/js13kpwa/icons/icon-64.png',
  '/pwa-examples/js13kpwa/icons/icon-96.png',
  '/pwa-examples/js13kpwa/icons/icon-128.png',
  '/pwa-examples/js13kpwa/icons/icon-168.png',
  '/pwa-examples/js13kpwa/icons/icon-192.png',
  '/pwa-examples/js13kpwa/icons/icon-256.png',
  '/pwa-examples/js13kpwa/icons/icon-512.png'
];
  /**------------------------------**/
  
  const gamesImages = [];
  for (let i = 0; i < games.length; i++) {
    gamesImages.push(`data/img/${games[i].slug}.jpg`);
  }
  const contentToCache = appShellFiles.concat(gamesImages);
  


  /**------------------------------**/

  self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });
  

  /**------------------------------**/

  self.addEventListener('fetch', (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
  });
  

  /**------------------------------**/

  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
  
  /**------------------------------**/

  const cacheName = 'js13kPWA-v1';


  /**------------------------------**/

  contentToCache.push('/pwa-examples/js13kpwa/icons/icon-32.png');

  // ...
  
  self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })());
  });
  
  /**------------------------------**/
  self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key === cacheName) { return; }
        return caches.delete(key);
      }));
    }));
  });
  

  /**------------------------------**/

  /**------------------------------**/


  /**------------------------------**/



  /**------------------------------**/
