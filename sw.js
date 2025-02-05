const CACHE_NAME = 'shortcuts-v2';
const ASSETS = [
    '/KT_menu/',
    '/KT_menu/index.html',
    '/KT_menu/css/style.css',
    '/KT_menu/js/app.js',
    '/KT_menu/manifest.json',
    '/KT_menu/images/icon-192x192.png',
    '/KT_menu/images/icon-512x512.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 清理舊的快取
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            })
        ))
    );
}); 