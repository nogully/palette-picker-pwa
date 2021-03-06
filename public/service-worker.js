this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/js/scripts.js',
        '/css/styles.css',
        '/wood.jpg',
        '/lib/jquery-3.2.1.js', 
        '/palette.svg',
        '/index.html'
      ])
    }).catch(error => console.log(error))
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

this.addEventListener('activate', event => {
  let cacheWhiteList = ['assets-v1'];
  console.log(caches.keys())
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keylist.map(key => {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// let pendingProjects = [];
// let pendingPalettes = [];

// this.addEventListener('message', event => {
//   if (event.data.type === 'add-project') {
//     pendingProjects.push(event.data.project);
//     self.registration.sync.register('addProject');
//   } 
//   if (event.data.type === 'add-palette') {
//     pendingPalettes.push(event.data.palette);
//     self.registration.sync.register('addPalette');
//   }
// });

// this.addEventListener('sync', event => {
//   if (event.tag === 'addProject') {
//     event.waitUntil(postPendingProjects()
//       .then(responses => {
//         self.clients.matchAll().then( clients => {
//           clients[0].postMessage({type: 'projects-synced'})
//         })
//         self.registration.showNotification('New projects synced');
//       })
//       .catch(error => console.error(error))
//     )
//   }

//   if (event.tag === 'addPalette') {
//     event.waitUntil(postPendingPalettes()
//       .then(responses => {
//         self.clients.matchAll().then( clients => {
//           clients[0].postMessage({type: 'palettes-synced'})
//         })
//         self.registration.showNotification('New palettes synced');
//       })
//       .catch(error => console.error(error))
//     )
//   }
// });

// const postPendingProjects = () => {
//   let projectPromises = pendingProjects.map(project => {
//     return fetch('/api/v1/projects', {
//       method: 'POST',
//       body: JSON.stringify(project), 
//       headers: { 'Content-Type': 'application/json' }
//     })
//   })
//   return Promise.all(projectPromises);
// };

// const postPendingPalettes = () => {
//   let palettePromises = pendingPalettes.map(palette => {
//     return fetch('/api/v1/palette', {
//       method: 'POST',
//       body: JSON.stringify(palette), 
//       headers: { 'Content-Type': 'application/json' }
//     })
//   })
//   return Promise.all(palettePromises);
// };