const cacheName = 'v1';

const cacheAssets = [
    'dist/index.html',
    'dist/img/pexels-photo-847236.jpeg',
    'dist/css/main.css',
    'dist/img/3.jpg',
    'dist/js/main.js',

];


//call install event
self.addEventListener('install', event => {
    console.log('SW: installed');

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('SW:caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())

    )
});

//call activate event
self.addEventListener('activate', event =>{
    console.log('SW: activated');
//remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if(cache != cacheName){
                        console.log('SW: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// call Fetch Event
self.addEventListener('fetch', event =>{
    console.log('SW: fetching');
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
