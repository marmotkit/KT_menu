const CACHE_NAME = 'shortcuts-v1';
const ASSETS = [
    '/KT_menu/',
    '/KT_menu/index.html',
    '/KT_menu/css/style.css',
    '/KT_menu/js/app.js',
    '/KT_menu/manifest.json',
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