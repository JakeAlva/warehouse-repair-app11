
const CACHE = 'rrs-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/hammerhead_logo.png',
  './assets/depth_info.png',
  './assets/width_info.png',
  './assets/hole_punches.png',
  './assets/frame_styles.png'
];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(resp=>{
      // Runtime cache
      const respClone = resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request, respClone));
      return resp;
    }).catch(()=> caches.match('./index.html')))
  );
});
