self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("video-store").then(function(cache) {
      return cache.addAll([
        "/", // Es muy importante ya que las paginas tambien las solicitamos como / debemos capturar esta request
        "/UnPokemon/",
        "/UnPokemon/index.html",
        "/UnPokemon/indexx.js",
        "/UnPokemon/css/index.css",
        "/UnPokemon/js/index.js",
        "/UnPokemon/ico/poke.ico",
        "/UnPokemon/ico/poke.png"
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
