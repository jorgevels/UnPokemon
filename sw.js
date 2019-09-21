self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("video-store").then(function(cache) {
      return cache.addAll([
        "/UnPokemon/",
        "/UnPokemon/index.html",
        "/UnPokemon/index.js",
        "/UnPokemon/css/index.css",
        "/UnPokemon/js/index.js"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
