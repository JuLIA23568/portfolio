const cacheName = 'v2';

//call install event
self.addEventListener('install', event => {
    console.log('SW: installed');




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

    event.respondWith(
        fetch(event.request)
            .then(res => {

                //make clone/copy of response
                const respClone = res.clone();
                //open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        //add response to cache
                        cache.put(event.request, respClone);
                    });
                return res;
            })
            .catch(err => caches.match(event.request).then(res => res))
    )


});
