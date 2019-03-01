const CACHE_NAME = 'Hotel Azor App',
    urlsToCache = [
        '/',
        './',
        './?utm=homescreen',
        './index.php',
        './index.php?utm=homescreen',
        './css/app.css',
        './js/app.js',
        './sw.js',
        './gallery.php',
        'https://fonts.googleapis.com/css?family=Poppins:700|Roboto|Open+Sans',
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'http://code.jquery.com/mobile/git/jquery.mobile-git.css',
        'js/jquery.mobile.datepicker.css',
        'js/jquery.mobile.datepicker.theme.css',
        'ss/slick-theme.css',
        'css/slick.css',
        'http://code.jquery.com/jquery-1.9.1.js',
        'js/external/jquery-ui/datepicker.js',
        'js/jquery.mobile.datepicker.js',
        'https://use.fontawesome.com/releases/v5.0.10/js/all.js'
    ]


self.addEventListener('install', e => {
    console.log('Event: SW Instaled')
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Files uploaded successfully')
          return cache.addAll(urlsToCache)
          .then( () => self.skipWaiting() )
          //skipWaiting forza al SW a activarse
        })
        .catch(err => console.log('Failed sigUp Cache', err) )
    )
  })
  
  self.addEventListener('activate', e => {
    console.log('Event: SW Activate')
    const cacheWhitelist = [CACHE_NAME]
  
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if ( cacheWhitelist.indexOf(cacheName) === -1 )
              return caches.delete(cacheName)
          })
        )
      })
      .then(() => {
        console.log('Cache uploaded')
        // Le indica al SW activar el cache actual
        return self.clients.claim()
      })
    )
  })
  
  self.addEventListener('fetch', e => {
    console.log('Event: SW Recovered')
  
    e.respondWith(
      //Miramos si la petición coincide con algún elemento del cache
      caches.match(e.request)
        .then(res => {
          console.log('Recovered cache')
          if ( res ) {
            //Si coincide lo retornamos del cache
            return res
          }
          //Sino, lo solicitamos a la red
          return fetch(e.request)
        })
      )
  })
  
self.addEventListener('push', e =>{
    console.log('Event :  Push')

    let title = 'Push Notificaciton Demo',
      options = {
        body:'Click go to application',
        icon:'./img/logo.png',
        vibrate: [100,50,100],
        data:{ id:1 },
        actions: [
          { 'action': 'Yes', 'title': 'i Like It :)', icon: './img/logo.png' },
          { 'action': 'No', 'title': 'I dont like it :(', icon: './img/logo.png' }
        ]
      }

      e.waitUntil( self.registration.showNotification(title, options) )
  })

self.addEventListener('notificationclick', e =>{
  console.log(e)

  if(e.action === 'Yes'){
    console.log('I love this app')
    clients.openWindow('https://wubook.net/wbkd/wbk/?lcode=1519249642')
  } else if( e.action === 'No'){
    console.log('I dont like this app')
  }

  e.notification.close()
})


