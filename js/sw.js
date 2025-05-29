// Service Worker para Portfolio
const CACHE_NAME = 'portfolio-cache-v1.3';
const RESOURCES_TO_CACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/components.css',
  '/css/formal-theme.css',
  '/css/formal-theme-fixes.css',
  '/css/effects.css',
  '/js/main.js',
  '/js/config.js',
  '/js/utils.js',
  '/js/theme.js',
  '/js/language.js',
  '/js/matrix-background.js',
  '/js/terminal.js',
  '/js/navigation.js',
  '/js/ui.js',
  '/js/init-effects.js',
  '/js/components.js',
  '/js/contact-form.js',
  '/js/analytics.js',
  '/js/emergency-init.js',
  '/js/matrix-glitch.js',
  '/js/formal-particles.js',
  '/js/error-handler.js',
  '/img/profile.jpg',
  '/img/favicon.ico',
  // Iconos PWA
  '/img/icon-72x72.png',
  '/img/icon-96x96.png',
  '/img/icon-128x128.png',
  '/img/icon-144x144.png',
  '/img/icon-152x152.png',
  '/img/icon-192x192.png',
  '/img/icon-384x384.png',
  '/img/icon-512x512.png',
  // Fuentes y recursos adicionales
  '/cv/juan_pablo_rosas_cv.pdf'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(RESOURCES_TO_CACHE);
      })
      .catch(err => console.error('Error en caché:', err))
      .then(() => self.skipWaiting()) // Forzar activación inmediata
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Tomar el control de todos los clientes
  );
});

// Estrategia de caché: Cache-first para recursos estáticos, network-first para otros
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Comprobar si es una solicitud de navegación o recurso estático
  const isNavigationRequest = event.request.mode === 'navigate';
  const isStaticAsset = 
    /\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|pdf)$/.test(url.pathname);
  
  if (isStaticAsset) {
    // Para recursos estáticos: Caché primero, red como respaldo
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Actualizamos la caché en segundo plano
            fetch(event.request)
              .then(response => {
                if (response && response.status === 200) {
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, response));
                }
              })
              .catch(() => {});
              
            return cachedResponse;
          }
          
          // Si no está en caché, ir a la red
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200) {
                return response;
              }
              
              // Clonar la respuesta para almacenarla en caché
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            });
        })
    );
  } else {
    // Para solicitudes de navegación y API: Red primero, caché como respaldo
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clonar la respuesta para almacenarla en caché
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch(() => {
          // Si falla la red, intentamos desde caché
          return caches.match(event.request);
        })
    );
  }
});