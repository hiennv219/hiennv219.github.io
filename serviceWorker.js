// Cache names

var dataCacheName = 'TODOData-v1.1.5'

var cacheName = 'todoPWA-1.6'

// Application shell files to be cached

var filesToCache = [

       '/',
       '/index.html',

       '/public/css/uikit.min.css',
       '/public/css/uikit.almost-flat.min.css',
       '/public/css/components/form-password.almost-flat.min.css',
       '/public/css/components/search.almost-flat.min.css',
       '/public/css/style.css',

       '/public/js/uikit.min.js',
       '/public/js/components/form-password.min.js',
       '/public/js/components/search.min.js',

       '/scripts/app.js',

       '/public/images/vote.png',
       '/public/images/votex25.png',
       '/public/images/emoji_love.png',
       '/public/images/emoji_lovex25.png',
       '/public/images/emoji_smile.png',
       '/public/images/emoji_smilex25.png',
       '/public/images/emoji_angry.png',       
       '/public/images/emoji_angryx25.png'
]


self.addEventListener('install', function (e) {

      console.log('[ServiceWorker] Install')

      e.waitUntil(

             caches.open(cacheName).then(function (cache) {

                     console.log('[ServiceWorker] Caching app shell')

                     return cache.addAll(filesToCache)

              })

      )

})

self.addEventListener('activate', function (e) {

      console.log('[ServiceWorker] Activate')

      e.waitUntil(

              caches.keys().then(function (keyList) {

                       return Promise.all(keyList.map(function (key) {

                               if (key !== cacheName && key !== dataCacheName) {

                                    console.log('[ServiceWorker] Removing old cache', key)

                                    return caches.delete(key)

                               }

                        }))

              })

      )

      return self.clients.claim()

})

self.addEventListener('fetch', function (e) {

      console.log('[ServiceWorker] Fetch', e.request.url)

      e.respondWith(

             caches.match(e.request).then(function (response) {

                     return response || fetch(e.request)

             })
       )
})